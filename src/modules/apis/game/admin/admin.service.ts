// NodeJS path
import path from 'path';

// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Services
import { GamesService } from '@repositories/sql/games/games.service';
import { GameStorageService } from '@services/dropbox/game-storage.service';

// Types
import type { File } from '@nest-lab/fastify-multer';
import type { ImageEntry, ThumbnailsEntry, VideoEntry } from '@repositories/sql/games/game.entity';
import type { CreateData } from './admin.types';

@Injectable()
export class AdminService {
  constructor(
    private readonly logger: Logger,
    private readonly game: GamesService,
    private readonly storage: GameStorageService,
  ) {}

  /**
   * Upload a file sequentially
   * @param file The file to upload
   * @param name The name of the file
   * @param filePath The path of the file
   * @returns The shared link of the file
   */
  private async uploadFileSequentially(file: File, name: string, filePath: string): Promise<string> {
    const result = await this.storage.uploadFile(file, name, filePath);
    return result.sharedLink;
  }

  /**
   * Create a new game
   * @param data An object containing the game data
   * @returns
   */
  public async createGame(data: CreateData): Promise<{ message: string }> {
    this.logger.log(`Creating game`);

    // Upload thumbnail images sequentially
    const thumbnailEntries: ThumbnailsEntry = {
      mainImage: await this.uploadFileSequentially(
        data.thumbnailEntries.mainImage,
        data.name,
        `thumbnails/mainImage${path.extname(data.thumbnailEntries.mainImage.originalname)}`,
      ),
      backgroundImage: await this.uploadFileSequentially(
        data.thumbnailEntries.backgroundImage,
        data.name,
        `thumbnails/backgroundImage${path.extname(data.thumbnailEntries.backgroundImage.originalname)}`,
      ),
      menuImg: await this.uploadFileSequentially(
        data.thumbnailEntries.menuImg,
        data.name,
        `thumbnails/menuImg${path.extname(data.thumbnailEntries.menuImg.originalname)}`,
      ),
      horizontalHeaderImage: await this.uploadFileSequentially(
        data.thumbnailEntries.horizontalHeaderImage,
        data.name,
        `thumbnails/horizontalHeaderImage${path.extname(data.thumbnailEntries.horizontalHeaderImage.originalname)}`,
      ),
      verticalHeaderImage: await this.uploadFileSequentially(
        data.thumbnailEntries.verticalHeaderImage,
        data.name,
        `thumbnails/verticalHeaderImage${path.extname(data.thumbnailEntries.verticalHeaderImage.originalname)}`,
      ),
      smallHeaderImage: await this.uploadFileSequentially(
        data.thumbnailEntries.smallHeaderImage,
        data.name,
        `thumbnails/smallHeaderImage${path.extname(data.thumbnailEntries.smallHeaderImage.originalname)}`,
      ),
      searchImage: await this.uploadFileSequentially(
        data.thumbnailEntries.searchImage,
        data.name,
        `thumbnails/searchImage${path.extname(data.thumbnailEntries.searchImage.originalname)}`,
      ),
      tabImage: await this.uploadFileSequentially(
        data.thumbnailEntries.tabImage,
        data.name,
        `thumbnails/tabImage${path.extname(data.thumbnailEntries.tabImage.originalname)}`,
      ),
    };

    // Upload image entries sequentially
    const imageEntries: ImageEntry[] = [];
    for (const imageEntry of data.imageEntries) {
      const link = await this.uploadFileSequentially(
        imageEntry.image,
        data.name,
        `images/${imageEntry.order}${path.extname(imageEntry.image.originalname)}`,
      );
      imageEntries.push({
        featured: imageEntry.featured,
        order: imageEntry.order,
        link,
      });
    }

    // Upload video entries sequentially
    const videoEntries: VideoEntry[] = [];
    for (const videoEntry of data.videoEntries) {
      const link = await this.uploadFileSequentially(
        videoEntry.video,
        data.name,
        `videos/${videoEntry.order}${path.extname(videoEntry.video.originalname)}`,
      );
      const posterLink = await this.uploadFileSequentially(
        videoEntry.poster,
        data.name,
        `videos/${videoEntry.order}-poster${path.extname(videoEntry.poster.originalname)}`,
      );
      videoEntries.push({
        order: videoEntry.order,
        link,
        posterLink,
      });
    }

    // Construct game data
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
      gamesFeatures: data.gamesFeatures,
      languages: data.languages,
      platformEntries: data.platformEntries,
      link: data.link,
      about: data.about,
      mature: data.mature,
      matureDescription: data.matureDescription,
      systemRequirements: data.systemRequirements,
      legal: data.legal,
    };

    // Create game
    await this.game.create(gameData);

    // Return success message
    return { message: 'Game created successfully' };
  }

  /**
   * Delete game by ID
   * @param id The ID of the game
   * @returns A message indicating the success of the operation
   */
  public async delete(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting game with ID: ${id}`);

    // Get game data
    const game = await this.game.getById(id);

    // Delete game files
    await this.storage.deleteDirectory(game.name);

    // Delete game
    await this.game.remove(id);

    // Return success message
    return { message: 'Game deleted successfully' };
  }
}
