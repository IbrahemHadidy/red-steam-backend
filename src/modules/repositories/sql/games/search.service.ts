import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '@repositories/sql/games/game.entity';
import {
  FindOperator,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  Not,
  Repository,
} from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Game, 'sql')
    private readonly gameRepository: Repository<Game>,
  ) {}

  /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name
   * @returns An array of games
   * @throws NotFoundException if no games are found
   */
  public async getByPartialName(partialName: string): Promise<Game[]> {
    this.logger.log(`Finding games with partial name: ${partialName}`);

    // Find games with the given partial name
    const games = await this.gameRepository.find({
      where: { name: ILike(`%${partialName}%`) },
      take: 10,
      relations: { pricing: true, tags: true },
    });

    // Throw a NotFoundException if no games are found
    if (!games.length) throw new NotFoundException('No games found');

    // Return the games
    return games;
  }

  /**
   * Get games by parameters
   * @param searchData An object containing the parameters (partialName, price, tags, offers, platforms, sortBy, publishers, developers, features, featured)
   * @param pagination An object containing the pagination offset and limit
   * @returns {Promise<Game[]>} An array of games or empty array if no games are found
   */
  public async getByParameters(
    searchData: {
      sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews' | 'totalSales';
      partialName?: string;
      maxPrice?: number;
      tags?: number[];
      excludeTags?: number[];
      paid?: boolean;
      offers?: boolean;
      platforms?: ('win' | 'mac')[];
      publishers?: number[];
      developers?: number[];
      features?: number[];
      languages?: number[];
      featured?: boolean;
      excludeMature?: boolean;
      excludedGames?: number[];
      upcomingMode?: 'onlyUpcoming' | 'exclude';
    },
    pagination: { offset: number; limit: number } = { offset: 0, limit: 20 },
  ): Promise<Game[]> {
    const {
      sort,
      partialName,
      maxPrice,
      tags,
      excludeTags,
      paid,
      offers,
      platforms,
      publishers,
      developers,
      features,
      languages,
      featured,
      excludeMature,
      excludedGames,
      upcomingMode,
    } = searchData;

    const { offset, limit } = pagination;

    this.logger.log(`Finding games with parameters: ${JSON.stringify(searchData)}`);

    // Prepare relations option
    const relations: FindOptionsRelations<Game> = {
      developers: developers && developers.length > 0,
      publishers: publishers && publishers.length > 0,
      tags: true,
      pricing: true,
      reviews: false,
      gamesFeatures: features && features.length > 0,
      languages: languages && languages.length > 0,
    };

    // Prepare platforms option for the where clause
    let platformEntries: { mac: boolean; win: boolean };
    if (platforms) {
      platformEntries = {
        mac: platforms.includes('mac'),
        win: platforms.includes('win'),
      };
    }

    // Prepare upcoming option for the where clause
    let upcommingOption: FindOperator<Date>;
    if (upcomingMode === 'onlyUpcoming') {
      upcommingOption = MoreThan(new Date());
    } else if (upcomingMode === 'exclude') {
      upcommingOption = LessThan(new Date());
    } else {
      upcommingOption = undefined;
    }

    // Prepare where clause
    const where: FindOptionsWhere<Game> = {
      ...(partialName ? { name: ILike(`%${partialName}%`) } : {}),
      ...(offers ? { pricing: { discount: true } } : {}),
      ...(maxPrice ? { pricing: { basePrice: LessThanOrEqual(maxPrice), discount: false } } : {}),
      ...(maxPrice ? { pricing: { discountPrice: LessThanOrEqual(maxPrice), discount: true } } : {}),
      ...(tags ? { tags: { id: In(tags) } } : {}),
      ...(excludeTags ? { tags: { id: Not(In(excludeTags)) } } : {}),
      ...(paid ? { pricing: { free: false } } : {}),
      ...(platforms ? { platformEntries } : {}),
      ...(publishers ? { publishers: { id: In(publishers) } } : {}),
      ...(developers ? { developers: { id: In(developers) } } : {}),
      ...(features ? { gamesFeatures: { id: In(features) } } : {}),
      ...(languages ? { languages: { id: In(languages) } } : {}),
      ...(featured ? { featured } : {}),
      ...(excludeMature ? { mature: false } : {}),
      ...(excludedGames ? { id: Not(In(excludedGames)) } : {}),
      ...(upcomingMode ? { releaseDate: upcommingOption } : {}),
    };

    // Prepare sorting option
    const sorting: FindOptionsOrder<Game> = {
      name: sort === 'name' ? { direction: 'ASC' } : undefined,
      totalSales: sort === 'totalSales' ? { direction: 'DESC' } : undefined,
      pricing:
        sort === 'lowestPrice'
          ? { price: { direction: 'ASC' } }
          : sort === 'highestPrice'
            ? { price: { direction: 'DESC' } }
            : undefined,
      releaseDate: sort === 'releaseDate' ? { direction: 'DESC' } : undefined,
      averageRating: sort === 'reviews' ? { direction: 'DESC' } : undefined,
      reviewsCount: sort === 'relevance' || !sort ? { direction: 'DESC' } : undefined,
    };

    // Retrieve games with the given parameters
    const games = await this.gameRepository.find({
      where,
      relations,
      order: sorting,
      skip: offset,
      take: limit,
    });

    // Throw a NotFoundException if no games are found
    if (!games || games.length === 0) return [];

    // Return the games
    return games;
  }

  /**
   * Retrieves games sorted by the number of matching tags.
   * @param {number[]} tags - The IDs of the tags to retrieve.
   * @param {number} limit - The maximum number of games to retrieve.
   * @return {Promise<Game[]>} A Promise that resolves to an array of game entities.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   */
  public async getByUserTags(tags: number[], limit: number = 12): Promise<Game[]> {
    this.logger.log(`Retrieving games with tag ids ${tags} from the database`);

    // Check if tags array is empty to avoid unnecessary queries
    if (tags.length === 0) {
      throw new NotFoundException(`No tags provided`);
    }

    // Fetch games that have at least one of the specified tags and count the occurrences of tags
    const rawGames: Game[] = await this.gameRepository
      .createQueryBuilder('game')
      .leftJoin('game.tags', 'tag')
      .where('tag.id IN (:...tags)', { tags })
      .groupBy('game.id')
      .addSelect('COUNT(tag.id) as tagCount')
      .orderBy('tagCount', 'DESC')
      .limit(limit)
      .getMany();

    // If no games are found, throw a NotFoundException
    if (rawGames.length === 0) {
      throw new NotFoundException(`Games with tags ${tags} not found`);
    }

    // Extract the game IDs from raw results
    const gameIds = rawGames.map((game) => game.id);

    // Fetch the full Game entities with tags
    const foundGames = await this.gameRepository.find({
      where: { id: In(gameIds) },
      relations: { tags: true },
    });

    // Return the sorted games
    return foundGames;
  }
}
