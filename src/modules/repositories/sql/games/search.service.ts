import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  Not,
  Repository,
} from 'typeorm';
import { Game } from '@repositories/sql/games/game.entity';

@Injectable()
export class SearchService {
  private readonly relations: FindOptionsRelations<Game> = {};

  constructor(
    private readonly logger: Logger,
    @InjectRepository(Game, 'sql')
    private readonly gameRepository: Repository<Game>,
  ) {
    this.relations = {
      developers: true,
      publishers: true,
      tags: true,
      pricing: true,
      reviews: true,
      gamesFeatures: true,
      languages: true,
    };
  }

  /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name
   * @returns An array of games
   * @throws NotFoundException if no games are found
   */
  public async getByPartialName(partialName: string): Promise<Game[]> {
    this.logger.log(`Finding games with partial name: ${partialName}`);

    const games = await this.gameRepository.find({
      where: { name: Like(`%${partialName}%`) },
      take: 10,
      relations: { pricing: true, tags: true },
    });

    if (!games.length) throw new NotFoundException('No games found');

    return games;
  }

  /**
   * Get games by parameters
   * @param searchData An object containing the parameters (partialName, price, tags, offers, platforms, sortBy, publishers, developers, features, featured)
   * @param pagination An object containing the pagination offset and limit
   * @returns An array of games
   * @throws NotFoundException if no games are found
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
    } = searchData;

    const { offset, limit } = pagination;

    this.logger.log(`Finding games with parameters: ${JSON.stringify(searchData)}`);

    let platformEntries: { mac: boolean; win: boolean };
    if (platforms) {
      platformEntries = {
        ...(platforms.includes('win') ? { win: true } : { win: false }),
        ...(platforms.includes('mac') ? { mac: true } : { mac: false }),
      };
    }

    const where: FindOptionsWhere<Game> = {
      ...(partialName ? { name: Like(`%${partialName}%`) } : {}),
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
    };

    let sorting: FindOptionsOrder<Game> = {};
    switch (sort) {
      case 'name':
        sorting = { name: { direction: 'ASC' } };
        break;
      case 'totalSales':
        sorting = { totalSales: { direction: 'DESC' } };
        break;
      case 'lowestPrice':
        sorting = { pricing: { price: { direction: 'ASC' } } };
        break;
      case 'highestPrice':
        sorting = { pricing: { price: { direction: 'DESC' } } };
        break;
      case 'releaseDate':
        sorting = { releaseDate: { direction: 'DESC' } };
        break;
      case 'reviews':
        sorting = { averageRating: { direction: 'DESC' } };
        break;
      case 'relevance':
        sorting = { reviewsCount: { direction: 'DESC' } };
        break;
      default:
        sorting = { reviewsCount: { direction: 'DESC' } };
        break;
    }

    const games = await this.gameRepository.find({
      where,
      relations: this.relations,
      order: sorting,
      skip: offset,
      take: limit,
    });

    if (!games.length) {
      throw new NotFoundException('No games found with the given parameters.');
    }

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
    // Log the retrieval of games
    this.logger.log(`Retrieving games with tags ids ${tags} from the database`);

    // Fetch all games with their tags
    const games = await this.gameRepository.find({
      relations: ['tags'],
    });

    // Create a map to count tag occurrences in each game
    const gameTagCounts: { [key: number]: number } = {};

    games.forEach((game) => {
      const tagCount = game.tags.filter((tag) => tags.includes(tag.id)).length;
      gameTagCounts[game.id] = tagCount;
    });

    // Sort games by the number of matching tags
    const sortedGames = games
      .filter((game) => gameTagCounts[game.id] > 0) // Filter out games with 0 matching tags
      .sort((a, b) => gameTagCounts[b.id] - gameTagCounts[a.id]) // Sort by tag count in descending order
      .slice(0, limit); // Limit the number of results

    if (sortedGames.length === 0) {
      throw new NotFoundException(`Games with tags ${tags} not found`);
    }

    return sortedGames;
  }
}
