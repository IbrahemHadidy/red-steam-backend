import { Injectable, Logger } from '@nestjs/common';

import { GamesService } from '@repositories/sql/games/games.service';
import { GameStorageService } from '@services/dropbox/game-storage.service';

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
export class AdminService {
  constructor(
    private readonly logger: Logger,
    private readonly game: GamesService,
    private readonly storage: GameStorageService,
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
        await this.storage.uploadFile(data.thumbnailEntries.mainImage, data.name, `thumbnails/mainImage`)
      ).sharedLink,
      backgroundImage: (
        await this.storage.uploadFile(
          data.thumbnailEntries.backgroundImage,
          data.name,
          `thumbnails/backgroundImage`,
        )
      ).sharedLink,
      menuImg: (await this.storage.uploadFile(data.thumbnailEntries.menuImg, data.name, `thumbnails/menuImg`))
        .sharedLink,
      horizontalHeaderImage: (
        await this.storage.uploadFile(
          data.thumbnailEntries.horizontalHeaderImage,
          data.name,
          `thumbnails/horizontalHeaderImage`,
        )
      ).sharedLink,
      verticalHeaderImage: (
        await this.storage.uploadFile(
          data.thumbnailEntries.verticalHeaderImage,
          data.name,
          `thumbnails/verticalHeaderImage`,
        )
      ).sharedLink,
      smallHeaderImage: (
        await this.storage.uploadFile(
          data.thumbnailEntries.smallHeaderImage,
          data.name,
          `thumbnails/smallHeaderImage`,
        )
      ).sharedLink,
      searchImage: (
        await this.storage.uploadFile(data.thumbnailEntries.searchImage, data.name, `thumbnails/searchImage`)
      ).sharedLink,
      tabImage: (await this.storage.uploadFile(data.thumbnailEntries.tabImage, data.name, `thumbnails/tabImage`))
        .sharedLink,
    };

    const imageEntries = await Promise.all(
      data.imageEntries.map(async (imageEntry) => ({
        ...imageEntry,
        link: (await this.storage.uploadFile(imageEntry.image, data.name, `images/${imageEntry.order}`))
          .sharedLink,
      })),
    );

    const videoEntries = await Promise.all(
      data.videoEntries.map(async (videoEntry) => ({
        ...videoEntry,
        link: (await this.storage.uploadFile(videoEntry.video, data.name, `videos/${videoEntry.order}`))
          .sharedLink,
        posterLink: (
          await this.storage.uploadFile(videoEntry.poster, data.name, `videos/${videoEntry.order}-poster`)
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

    await this.game.create(gameData);

    return { message: 'Game created successfully' };
  }

  /**
   * Delete game by ID
   * @param id The ID of the game
   * @returns A message indicating the success of the operation
   */
  public async delete(id: string): Promise<{ message: string }> {
    this.logger.log(`Deleting game with ID: ${id}`);
    await this.game.remove(Number(id));

    return { message: 'Game deleted successfully' };
  }
}
