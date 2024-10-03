// NestJS
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { And, ILike, In, Not, Repository } from 'typeorm';

// Entities
import { Game } from '@repositories/sql/games/game.entity';

// Types
import { Game as GameType } from '@repositories/sql/games/game.entity';

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
   * @throws `NotFoundException` if no games are found
   */
  public async getByPartialName(partialName: string): Promise<GameType[]> {
    this.logger.log(`Finding games with partial name: ${partialName}`);

    // Find games with the given partial name
    const games = await this.gameRepository.find({
      where: { name: ILike(`%${partialName}%`) },
      take: 10,
      relations: { pricing: true, tags: true },
      // TODO: Add cache
      // cache: {
      //   id: `${partialName}-games`,
      //   milliseconds: 30 * 1000, // 30 seconds
      // },
    });

    // Return the games
    return games;
  }

  /**
   * Get games by parameters
   * @param searchData An object containing the parameters (partialName, price, tags, offers, platforms, sortBy, publishers, developers, features, featured)
   * @param pagination An object containing the pagination offset and limit
   * @returns An array of games or empty array if no games are found
   */
  public async getByParameters(
    searchData: {
      sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews' | 'totalSales';
      partialName?: string;
      maxPrice?: string;
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
  ): Promise<GameType[]> {
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

    // Create include subqueries template
    const createIncludeSubQuery = (
      entity: 'tag' | 'developer' | 'publisher' | 'feature' | 'language',
      values: number[],
    ) => {
      return this.gameRepository
        .createQueryBuilder('subGame')
        .leftJoin(`subGame.${entity}s`, `${entity}`)
        .select('subGame.id')
        .where(`${entity}.id IN (:...${entity}s)`, { [`${entity}s`]: values })
        .groupBy('subGame.id')
        .having(`COUNT(${entity}.id) = :${entity}sCount`, { [`${entity}sCount`]: values.length });
    };

    // Create exclude subqueries template
    const createExcludeSubQuery = (
      entity: 'tag' | 'developer' | 'publisher' | 'feature' | 'language',
      values: number[],
    ) => {
      return this.gameRepository
        .createQueryBuilder('subGame')
        .leftJoin(`subGame.${entity}s`, `${entity}`)
        .select('subGame.id')
        .where(`${entity}.id IN (:...exclude${entity}s)`, { [`exclude${entity}s`]: values })
        .groupBy('subGame.id')
        .having(`COUNT(${entity}.id) > 0`);
    };

    // Create a query builder with the necessary joins
    const query = this.gameRepository
      .createQueryBuilder('game')
      .leftJoinAndSelect('game.tags', 'tag')
      .leftJoinAndSelect('game.pricing', 'pricing');

    // Apply name filter
    if (partialName) {
      query.andWhere('game.name ILIKE :partialName', { partialName: `%${partialName}%` });
    }

    // Apply paid filter
    if (offers) {
      query.andWhere('pricing.discount = true');
    }

    // Apply price filter
    if (maxPrice) {
      query.andWhere('(pricing.basePrice <= :maxPrice OR pricing.discountPrice <= :maxPrice)', { maxPrice });
    }

    // Apply tags filter
    if (tags) {
      // Create a subquery to find games that have all the tags
      const tagsSubQuery = createIncludeSubQuery('tag', tags);

      // Add the subquery and parameters to the main query
      query.andWhere(`game.id IN (${tagsSubQuery.getQuery()})`);
      query.setParameters(tagsSubQuery.getParameters());
    }

    // Apply excludeTags filter
    if (excludeTags) {
      // Create a subquery to exclude games that have any of the excluded tags
      const excludeTagsSubQuery = createExcludeSubQuery('tag', excludeTags); // Exclude games with any of the excluded tags

      // Add the excludeTags subquery to the main query
      query.andWhere(`game.id NOT IN (${excludeTagsSubQuery.getQuery()})`);
      query.setParameters(excludeTagsSubQuery.getParameters());
    }

    // Apply paid filter
    if (paid) {
      query.andWhere('pricing.free = false');
    }

    // Apply platforms filter
    if (platforms) {
      if (platforms.includes('win')) {
        query.andWhere('game.platformEntries @> :platformsWin', { platformsWin: JSON.stringify({ win: true }) });
      }
      if (platforms.includes('mac')) {
        query.andWhere('game.platformEntries @> :platformsMac', { platformsMac: JSON.stringify({ mac: true }) });
      }
    }

    // Apply publishers filter
    if (publishers) {
      // Add the publisher relationship
      query.leftJoinAndSelect('game.publishers', 'publisher');

      // Create a subquerys to find games that have all the publishers
      const publishersSubQuery = createIncludeSubQuery('publisher', publishers);

      // Add the subquery and parameters to the main query
      query.andWhere(`game.id IN (${publishersSubQuery.getQuery()})`);
      query.setParameters(publishersSubQuery.getParameters());
    }

    // Apply developers filter
    if (developers) {
      // Add the developers relationship
      query.leftJoinAndSelect('game.developers', 'developer');

      // Create a subquery to find games that have all the developers
      const developersSubQuery = createIncludeSubQuery('developer', developers);

      // Add the subquery and parameters to the main query
      query.andWhere(`game.id IN (${developersSubQuery.getQuery()})`);
      query.setParameters(developersSubQuery.getParameters());
    }

    // Apply features filter
    if (features) {
      // Add the features relationship
      query.leftJoinAndSelect('game.features', 'feature');

      // Create a subquery to find games that have all the features
      const featuresSubQuery = createIncludeSubQuery('feature', features);

      // Add the subquery and parameters to the main query
      query.andWhere(`game.id IN (${featuresSubQuery.getQuery()})`);
      query.setParameters(featuresSubQuery.getParameters());
    }

    // Apply languages filter
    if (languages) {
      // Add the languages relationship
      query.leftJoinAndSelect('game.languages', 'language');

      // Create a subquery to find games that have all the languages
      const languagesSubQuery = createIncludeSubQuery('language', languages);

      // Add the subquery and parameters to the main query
      query.andWhere(`game.id IN (${languagesSubQuery.getQuery()})`);
      query.setParameters(languagesSubQuery.getParameters());
    }

    // Apply featured filter
    if (featured) {
      query.andWhere('game.featured = true');
    }

    // Apply exclude mature filter
    if (excludeMature) {
      query.andWhere('game.mature = false');
    }

    // Apply excluded games filter
    if (excludedGames) {
      query.andWhere('game.id NOT IN (:...excludedGames)', { excludedGames });
    }

    // Apply upcoming filter
    if (upcomingMode === 'onlyUpcoming') {
      query.andWhere('game.releaseDate > :now', { now: new Date() });
    } else if (upcomingMode === 'exclude') {
      query.andWhere('game.releaseDate <= :now', { now: new Date() });
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'name':
          query.orderBy('game.name', 'ASC');
          break;
        case 'totalSales':
          query.orderBy('game.totalSales', 'DESC');
          break;
        case 'lowestPrice':
          query.orderBy('pricing.price', 'ASC');
          break;
        case 'highestPrice':
          query.orderBy('pricing.price', 'DESC');
          break;
        case 'releaseDate':
          query.orderBy('game.releaseDate', 'DESC');
          break;
        case 'reviews':
          query.orderBy('game.averageRating', 'DESC');
          break;
        case 'relevance':
        default:
          query.orderBy('game.reviewsCount', 'DESC');
          break;
      }
    }

    // Apply pagination
    query.skip(offset).take(limit);

    // Set cache for 30 seconds
    query.cache(`games-${JSON.stringify(searchData)}`, 30 * 1000);

    // Retrieve games with the given parameters
    const games = await query.getMany();

    // Return the games
    return games;
  }

  /**
   * Retrieves games sorted by the number of matching tags.
   * @param tags - The IDs of the tags to retrieve.
   * @param limit - The maximum number of games to retrieve.
   * @return A Promise that resolves to an array of game entities.
   */
  public async getByUserTags(tags: number[], excludedGames?: number[], limit: number = 12): Promise<GameType[]> {
    this.logger.log(`Retrieving games with tag ids ${tags} from the database`);

    // Check if tags array is empty to avoid unnecessary queries
    if (tags.length === 0) {
      throw new NotFoundException(`No tags provided`);
    }

    // Fetch games that have at least one of the specified tags and count the occurrences of tags
    const rawGames: Game[] = await this.gameRepository
      .createQueryBuilder('game')
      .leftJoin('game.tags', 'tag')
      .where('tag.tag_id IN (:...tags)', { tags })
      .groupBy('game.game_id')
      .addSelect('COUNT(tag.tag_id) as tagCount')
      .orderBy('tagCount', 'DESC')
      .limit(limit)
      .getMany();

    // If no games are found, return an empty array
    if (rawGames.length === 0) return [];

    // Extract the game IDs from raw results
    const gameIds = rawGames.map((game) => game.id);

    // Fetch the full Game entities with tags
    const foundGames = await this.gameRepository.find({
      where: excludedGames ? { id: And(In(gameIds), Not(In(excludedGames))) } : { id: In(gameIds) },
      relations: { tags: true },
      // TODO: Add cache
      // cache: {
      //   id: `games-${JSON.stringify(gameIds)}`,
      //   milliseconds: 30 * 1000, // 30 seconds
      // },
    });

    // Return the sorted games
    return foundGames;
  }
}
