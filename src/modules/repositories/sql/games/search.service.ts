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
   * @returns {Promise<Game[]>} An array of games
   * @throws {NotFoundException} Throws a NotFoundException if no games are found
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
    if (!games || games.length === 0) throw new NotFoundException('No games found with the given parameters.');

    // Return the games
    return games;
  }

  /**
   * Retrieves games sorted by the number of matching tags.
   * @param {number[]} tags - The IDs of the tags to retrieve.
   * @param {number} limit - The maximum number of games to retrieve.
   * @return {Promise<Game[]>} A Promise that resolves to an array of game entities.
   * @throws {NotFoundException} Throws a NotFoundException if the game with the specified ID is not found.
   */
  public async getByUserTags(tags: number[], limit: number = 12): Promise<Game[]> {
    this.logger.log(`Retrieving games with tags ids ${tags} from the database`);

    // Fetch all games with their tags
    const games = await this.gameRepository.find({
      relations: { tags: true },
    });

    // Create a map to count tag occurrences in each game
    const gameTagCounts: { [key: number]: number } = {};

    // Count the number of matching tags in each game
    games.forEach((game) => {
      const tagCount = game.tags.filter((tag) => tags.includes(tag.id)).length;
      gameTagCounts[game.id] = tagCount;
    });

    // Sort games by the number of matching tags
    const sortedGames = games
      .filter((game) => gameTagCounts[game.id] > 0) // Filter out games with 0 matching tags
      .sort((a, b) => gameTagCounts[b.id] - gameTagCounts[a.id]) // Sort by tag count in descending order
      .slice(0, limit); // Limit the number of results

    // Throw a NotFoundException if no games are found
    if (sortedGames.length === 0) throw new NotFoundException(`Games with tags ${tags} not found`);

    // Return the sorted games
    return sortedGames;
  }
}
