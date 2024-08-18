import { Injectable, Logger } from '@nestjs/common';

import { GamesService } from '@repositories/sql/games/games.service';
import { SearchService } from '@repositories/sql/games/search.service';
import { GameStorageService } from '@services/dropbox/game-storage.service';

import { Game } from '@repositories/sql/games/game.entity';

import type { File } from '@nest-lab/fastify-multer';
interface CreateData {
  name: string;
  category: string;
  description: string;
  releaseDate: Date;
  featured: boolean;
  publishers: number[];
  developers: number[];
  thumbnailEntries: {
    mainImage: File;
    backgroundImage: File;
    menuImg: File;
    horizontalHeaderImage: File;
    verticalHeaderImage: File;
    smallHeaderImage: File;
    searchImage: File;
    tabImage: File;
  };
  imageEntries: {
    image: File;
    order: number;
    featured?: boolean;
  }[];
  videoEntries: {
    video: File;
    poster: File;
    order: number;
  }[];
  pricing: {
    free: boolean;
    basePrice?: number;
  };
  tags: number[];
  features: number[];
  languages: {
    name: string;
    interface: boolean;
    fullAudio: boolean;
    subtitles: boolean;
  }[];
  platforms: {
    win: boolean;
    mac: boolean;
  };
  systemRequirements: {
    req64?: boolean;
    mini: {
      os?: string;
      cpu?: string;
      ram?: string;
      gpu?: string;
      dx?: string;
      network?: string;
      storage?: string;
      additionalNotes?: string;
      soundCard?: string;
      vrSupport?: string;
    };
    recommended: {
      os?: string;
      cpu?: string;
      ram?: string;
      gpu?: string;
      dx?: string;
      network?: string;
      storage?: string;
      additionalNotes?: string;
      soundCard?: string;
      vrSupport?: string;
    };
  };
  link: string;
  about: string;
  mature: boolean;
  matureDescription?: string;
  legal?: string;
}

@Injectable()
export class GameService {
  constructor(
    private readonly logger: Logger,
    private readonly gamesService: GamesService,
    private readonly searchService: SearchService,
    private readonly storageService: GameStorageService,
  ) {}

  /**
   * Create a new game
   * @param data An object containing the game data
   * @returns
   */
  public async createGame(data: CreateData): Promise<{ message: string }> {
    this.logger.log(`Creating game`);

    const thumbnailEntries = {
      mainImage: (
        await this.storageService.uploadFile(data.thumbnailEntries.mainImage, data.name, `thumbnails/mainImage`)
      ).sharedLink,
      backgroundImage: (
        await this.storageService.uploadFile(
          data.thumbnailEntries.backgroundImage,
          data.name,
          `thumbnails/backgroundImage`,
        )
      ).sharedLink,
      menuImg: (await this.storageService.uploadFile(data.thumbnailEntries.menuImg, data.name, `thumbnails/menuImg`))
        .sharedLink,
      horizontalHeaderImage: (
        await this.storageService.uploadFile(
          data.thumbnailEntries.horizontalHeaderImage,
          data.name,
          `thumbnails/horizontalHeaderImage`,
        )
      ).sharedLink,
      verticalHeaderImage: (
        await this.storageService.uploadFile(
          data.thumbnailEntries.verticalHeaderImage,
          data.name,
          `thumbnails/verticalHeaderImage`,
        )
      ).sharedLink,
      smallHeaderImage: (
        await this.storageService.uploadFile(
          data.thumbnailEntries.smallHeaderImage,
          data.name,
          `thumbnails/smallHeaderImage`,
        )
      ).sharedLink,
      searchImage: (
        await this.storageService.uploadFile(data.thumbnailEntries.searchImage, data.name, `thumbnails/searchImage`)
      ).sharedLink,
      tabImage: (await this.storageService.uploadFile(data.thumbnailEntries.tabImage, data.name, `thumbnails/tabImage`))
        .sharedLink,
    };

    const imageEntries = await Promise.all(
      data.imageEntries.map(async (imageEntry) => ({
        ...imageEntry,
        link: (await this.storageService.uploadFile(imageEntry.image, data.name, `images/${imageEntry.order}`))
          .sharedLink,
      })),
    );

    const videoEntries = await Promise.all(
      data.videoEntries.map(async (videoEntry) => ({
        ...videoEntry,
        link: (await this.storageService.uploadFile(videoEntry.video, data.name, `videos/${videoEntry.order}`))
          .sharedLink,
        posterLink: (
          await this.storageService.uploadFile(videoEntry.poster, data.name, `videos/${videoEntry.order}-poster`)
        ).sharedLink,
      })),
    );

    const gameData = {
      name: data.name,
      category: data.category,
      description: data.description,
      releaseDate: data.releaseDate,
      featured: data.featured,
      publishers: data.publishers,
      developers: data.developers,
      thumbnailEntries,
      imageEntries,
      videoEntries,
      pricing: data.pricing,
      tags: data.tags,
      gamesFeatures: data.features,
      languages: data.languages,
      platformEntries: data.platforms,
      link: data.link,
      about: data.about,
      mature: data.mature,
      matureDescription: data.matureDescription,
      systemRequirements: data.systemRequirements,
      legal: data.legal,
    };

    await this.gamesService.create(gameData);

    return { message: 'Game created successfully' };
  }

  /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name of the game
   * @returns An array of games
   */
  public async getByPartialName(partialName: string): Promise<Game[]> {
    this.logger.log(`Finding games by partial name`);
    const games = await this.searchService.getByPartialName(partialName);

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
    pagination: { offset: string; limit: string },
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

    const games = await this.searchService.getByParameters(data, {
      offset: Number(pagination.offset),
      limit: Number(pagination.limit),
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

    const games = await this.searchService.getByParameters({ featured: true }, { limit: Number(limit), offset: 0 });

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

    const games = await this.searchService.getByUserTags(tags.map((tag) => Number(tag)), Number(limit));

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
    const game = await this.gamesService.getById(Number(id));
    return game;
  }

  /**
   * Get games with offers
   * @returns An array of games
   */
  public async getByOffers(): Promise<Game[]> {
    this.logger.log(`Finding games with offers`);
    const games = await this.searchService.getByParameters(
      { offers: true, sort: 'relevance' },
      { limit: 24, offset: 0 },
    );
    return games;
  }

  /**
   * Get games with new releases
   * @returns An array of games
   */
  public async getByNewest(): Promise<Game[]> {
    this.logger.log(`Finding games with newest`);
    const games = await this.searchService.getByParameters({ sort: 'releaseDate' }, { limit: 10, offset: 0 });
    return games;
  }

  /**
   * Get games with top sales
   * @returns An array of games
   */
  public async getByTopSales(): Promise<Game[]> {
    this.logger.log(`Finding games with top sales`);
    const games = await this.searchService.getByParameters({ sort: 'totalSales' }, { limit: 10, offset: 0 });
    return games;
  }

  /**
   * Get games with specials
   * @returns An array of games
   */
  public async getBySpecials(): Promise<Game[]> {
    this.logger.log(`Finding games with specials`);
    const games = await this.searchService.getByParameters(
      { featured: true, sort: 'relevance' },
      { limit: 10, offset: 0 },
    );
    return games;
  }
}
