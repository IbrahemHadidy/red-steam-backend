// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Services
import { ReviewsService } from '@/modules/repositories/sql/reviews/reviews.service';
import { GamesService } from '@repositories/sql/games/games.service';
import { SearchService } from '@repositories/sql/games/search.service';

// Types
import type { Game } from '@repositories/sql/games/game.entity';
import type { Review } from '@repositories/sql/reviews/review.entity';

@Injectable()
export class DataService {
  constructor(
    private readonly logger: Logger,
    private readonly game: GamesService,
    private readonly search: SearchService,
    private readonly review: ReviewsService,
  ) {}

  /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name of the game
   * @returns An array of games
   */
  public async getByPartialName(partialName: string): Promise<Game[]> {
    this.logger.log(`Finding games by partial name`);

    // Find games by partial name
    const games = await this.search.getByPartialName(partialName);
    this.logger.log(`Found ${games.length} games`);

    // Return games
    return games;
  }

  /**
   * Get games by parameters
   * @param searchData An object containing the search data
   * @param pagination An object containing the pagination data
   * @returns An array of games
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
    pagination: { offset: number; limit: number },
  ): Promise<Game[]> {
    this.logger.log(`Finding games by criteria`);

    // Prepare search data
    const data = {
      sort: searchData.sort,
      partialName: searchData.partialName,
      maxPrice: searchData.maxPrice && searchData.maxPrice,
      tags: searchData.tags && searchData.tags.length > 0 && searchData.tags.map((tag) => tag),
      excludeTags:
        searchData.excludeTags && searchData.excludeTags.length > 0 && searchData.excludeTags.map((tag) => tag),
      paid: searchData.paid !== undefined ? searchData.paid : undefined,
      offers: searchData.offers !== undefined ? searchData.offers : undefined,
      platforms: searchData.platforms && searchData.platforms.length > 0 && searchData.platforms,
      publishers:
        searchData.publishers &&
        searchData.publishers.length > 0 &&
        searchData.publishers.map((publisher) => publisher),
      developers:
        searchData.developers &&
        searchData.developers.length > 0 &&
        searchData.developers.map((developer) => developer),
      features: searchData.features && searchData.features.length > 0 && searchData.features.map((feature) => feature),
      languages:
        searchData.languages && searchData.languages.length > 0 && searchData.languages.map((language) => language),
      featured: searchData.featured !== undefined ? searchData.featured : undefined,
      excludeMature: searchData.excludeMature !== undefined ? searchData.excludeMature : undefined,
      excludedGames:
        searchData.excludedGames && searchData.excludedGames.length > 0 && searchData.excludedGames.map((game) => game),
      upcomingMode: searchData.upcomingMode,
    };

    // Find games by parameters
    const games = await this.search.getByParameters(data, {
      offset: pagination.offset,
      limit: pagination.limit,
    });
    this.logger.log(`Found ${games.length} games`);

    // Return found games
    return games;
  }

  /**
   * Get featured games
   * @param limit The maximum number of games to return
   * @returns An array of featured games
   */
  public async getFeaturedGames(excludedGames: number[], limit: number): Promise<Game[]> {
    this.logger.log(`Finding featured games`);

    // Find featured games
    const games = await this.search.getByParameters(
      { featured: true, excludedGames: excludedGames.length > 0 ? excludedGames : undefined },
      { limit: limit, offset: 0 },
    );
    this.logger.log(`Found ${games.length} featured games`);

    // Return featured games
    return games;
  }

  /**
   * Get games by tags
   * @param tags An array of tag IDs
   * @param limit The maximum number of games to return
   * @returns An array of games
   */
  public async getByUserTags(tags?: number[], excludedGames?: number[], limit?: number): Promise<Game[]> {
    this.logger.log(`Finding games by tags`);

    // Find games by tags
    const games = await this.search.getByUserTags(tags, excludedGames.length > 0 ? excludedGames : undefined, limit);
    this.logger.log(`Found ${games.length} games`);

    // Return user games
    return games;
  }

  /**
   * Get game by ID
   * @param id The ID of the game
   * @returns The game
   */
  public async getById(id: number): Promise<Game> {
    this.logger.log(`Finding game with ID: ${id}`);

    // Find game by ID
    const game = await this.game.getById(id);

    // Return game
    return game;
  }

  /**
   * Get games by IDs
   * @param ids The IDs of the games
   * @returns An array of games
   */
  public async getByIds(ids?: number[]): Promise<Game[]> {
    this.logger.log(`Finding games with IDs: ${ids}`);

    // Find games by IDs
    const games = await this.game.getByIds(ids ? ids.map((id) => id) : []);

    // Return games
    return games;
  }

  /**
   * Get games with offers
   * @returns An array of games
   */
  public async getByOffers(excludedGames: number[]): Promise<Game[]> {
    this.logger.log(`Finding games with offers`);

    // Find games with offers
    const games = await this.search.getByParameters(
      { offers: true, excludedGames: excludedGames.length > 0 ? excludedGames : undefined, sort: 'relevance' },
      { limit: 24, offset: 0 },
    );

    // Return games
    return games;
  }

  /**
   * Get games with new releases
   * @returns An array of games
   */
  public async getByNewest(excludedGames: number[]): Promise<Game[]> {
    this.logger.log(`Finding games with newest`);

    // Find games with new releases
    const games = await this.search.getByParameters(
      {
        upcomingMode: 'exclude',
        excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
        sort: 'releaseDate',
      },
      { limit: 10, offset: 0 },
    );

    // Return games
    return games;
  }

  /**
   * Get games with top sales
   * @returns An array of games
   */
  public async getByTopSales(excludedGames: number[]): Promise<Game[]> {
    this.logger.log(`Finding games with top sales`);

    // Find games with top sales
    const games = await this.search.getByParameters(
      { sort: 'totalSales', excludedGames: excludedGames.length > 0 ? excludedGames : undefined },
      { limit: 10, offset: 0 },
    );

    // Return games
    return games;
  }

  /**
   * Get games with specials
   * @returns An array of games
   */
  public async getBySpecials(excludedGames: number[]): Promise<Game[]> {
    this.logger.log(`Finding games with specials`);

    // Find games with specials
    const games = await this.search.getByParameters(
      { featured: true, excludedGames: excludedGames.length > 0 ? excludedGames : undefined, sort: 'relevance' },
      { limit: 10, offset: 0 },
    );

    // Return games
    return games;
  }

  /**
   * Get upcoming games
   * @returns An array of games
   */
  public async getByUpcoming(excludedGames: number[]): Promise<Game[]> {
    this.logger.log(`Finding games with upcoming`);

    // Find games with upcoming
    const games = await this.search.getByParameters(
      {
        upcomingMode: 'onlyUpcoming',
        excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
        sort: 'releaseDate',
      },
      { limit: 10, offset: 0 },
    );

    // Return games
    return games;
  }

  /**
   * Get reviews by game ID
   * @param id The ID of the game
   * @param pagination An object containing the pagination data
   * @returns An array of reviews
   */
  public async getGameReviews(
    id: number,
    filter: 'positive' | 'negative' | 'all',
    sort: 'newest' | 'oldest',
    pagination: { offset: number; limit: number },
  ): Promise<Review[]> {
    this.logger.log(`Finding reviews for game with ID: ${id}`);

    // Find reviews by game ID
    const reviews = await this.review.getByGameId(Number(id), filter, sort, pagination);

    // Return reviews
    return reviews;
  }
}
