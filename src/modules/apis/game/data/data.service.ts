import { Injectable, Logger } from '@nestjs/common';

import { GamesService } from '@repositories/sql/games/games.service';
import { SearchService } from '@repositories/sql/games/search.service';

import { Game } from '@repositories/sql/games/game.entity';

@Injectable()
export class DataService {
  constructor(
    private readonly logger: Logger,
    private readonly game: GamesService,
    private readonly search: SearchService,
  ) {}

  /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name of the game
   * @returns An array of games
   */
  public async getByPartialName(partialName: string): Promise<Game[]> {
    this.logger.log(`Finding games by partial name`);
    const games = await this.search.getByPartialName(partialName);

    this.logger.log(`Found ${games.length} games`);
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
      sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews';
      partialName?: string;
      maxPrice?: string;
      tags?: string[];
      excludeTags?: string[];
      paid?: boolean;
      offers?: boolean;
      platforms?: ('win' | 'mac')[];
      publishers?: string[];
      developers?: string[];
      features?: string[];
      languages?: string[];
      featured?: boolean;
      excludeMature?: boolean;
    },
    pagination: { offset: number; limit: number },
  ): Promise<Game[]> {
    this.logger.log(`Finding games by criteria`);

    const data = {
      sort: searchData.sort,
      partialName: searchData.partialName,
      maxPrice: Number(searchData.maxPrice),
      tags: searchData.tags.map((tag) => Number(tag)),
      excludeTags: searchData.excludeTags.map((tag) => Number(tag)),
      paid: searchData.paid,
      offers: searchData.offers,
      platforms: searchData.platforms,
      publishers: searchData.publishers.map((publisher) => Number(publisher)),
      developers: searchData.developers.map((developer) => Number(developer)),
      features: searchData.features.map((feature) => Number(feature)),
      languages: searchData.languages.map((language) => Number(language)),
      featured: searchData.featured,
      excludeMature: searchData.excludeMature,
    };

    const games = await this.search.getByParameters(data, {
      offset: pagination.offset,
      limit: pagination.limit,
    });

    this.logger.log(`Found ${games.length} games`);
    return games;
  }

  /**
   * Get featured games
   * @param limit The maximum number of games to return
   * @returns An array of featured games
   */
  public async getFeaturedGames(limit: string): Promise<Game[]> {
    this.logger.log(`Finding featured games`);

    const games = await this.search.getByParameters({ featured: true }, { limit: Number(limit), offset: 0 });

    this.logger.log(`Found ${games.length} featured games`);
    return games;
  }

  /**
   * Get games by tags
   * @param tags An array of tag IDs
   * @param limit The maximum number of games to return
   * @returns An array of games
   */
  public async getByUserTags(tags: string[], limit: string): Promise<Game[]> {
    this.logger.log(`Finding games by tags`);

    const games = await this.search.getByUserTags(
      tags.map((tag) => Number(tag)),
      Number(limit),
    );

    this.logger.log(`Found ${games.length} games`);
    return games;
  }

  /**
   * Get game by ID
   * @param id The ID of the game
   * @returns The game
   */
  public async getById(id: string): Promise<Game> {
    this.logger.log(`Finding game with ID: ${id}`);
    const game = await this.game.getById(Number(id));
    return game;
  }

  /**
   * Get games with offers
   * @returns An array of games
   */
  public async getByOffers(): Promise<Game[]> {
    this.logger.log(`Finding games with offers`);
    const games = await this.search.getByParameters({ offers: true, sort: 'relevance' }, { limit: 24, offset: 0 });
    return games;
  }

  /**
   * Get games with new releases
   * @returns An array of games
   */
  public async getByNewest(): Promise<Game[]> {
    this.logger.log(`Finding games with newest`);
    const games = await this.search.getByParameters({ sort: 'releaseDate' }, { limit: 10, offset: 0 });
    return games;
  }

  /**
   * Get games with top sales
   * @returns An array of games
   */
  public async getByTopSales(): Promise<Game[]> {
    this.logger.log(`Finding games with top sales`);
    const games = await this.search.getByParameters({ sort: 'totalSales' }, { limit: 10, offset: 0 });
    return games;
  }

  /**
   * Get games with specials
   * @returns An array of games
   */
  public async getBySpecials(): Promise<Game[]> {
    this.logger.log(`Finding games with specials`);
    const games = await this.search.getByParameters({ featured: true, sort: 'relevance' }, { limit: 10, offset: 0 });
    return games;
  }
}
