// NodeJS path
import path from 'path';

// NestJS
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// Services
import { GamesService } from '@repositories/sql/games/games.service';
import { GameStorageService } from '@services/dropbox/game-storage.service';

// Types
import type { File } from '@nest-lab/fastify-multer';
import type { ImageEntry, ThumbnailsEntry, VideoEntry } from '@repositories/sql/games/game.entity';
import type { CreateData, UpdateData } from './admin.types';

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
   * @returns A success message
   */
  public async createGame(data: CreateData): Promise<{ message: string; id: number }> {
    this.logger.log(`Creating game`);

    try {
      // Upload thumbnail images sequentially
      const thumbnailEntries: ThumbnailsEntry = {
        mainImage: await this.uploadFile(
          data.thumbnailEntries.mainImage,
          data.name,
          `thumbnails/mainImage${path.extname(data.thumbnailEntries.mainImage.originalname)}`,
          ['image/jpeg'],
        ),
        backgroundImage: await this.uploadFile(
          data.thumbnailEntries.backgroundImage,
          data.name,
          `thumbnails/backgroundImage${path.extname(data.thumbnailEntries.backgroundImage.originalname)}`,
          ['image/jpeg'],
        ),
        menuImg: await this.uploadFile(
          data.thumbnailEntries.menuImg,
          data.name,
          `thumbnails/menuImg${path.extname(data.thumbnailEntries.menuImg.originalname)}`,
          ['image/jpeg'],
        ),
        horizontalHeaderImage: await this.uploadFile(
          data.thumbnailEntries.horizontalHeaderImage,
          data.name,
          `thumbnails/horizontalHeaderImage${path.extname(data.thumbnailEntries.horizontalHeaderImage.originalname)}`,
          ['image/jpeg'],
        ),
        verticalHeaderImage: await this.uploadFile(
          data.thumbnailEntries.verticalHeaderImage,
          data.name,
          `thumbnails/verticalHeaderImage${path.extname(data.thumbnailEntries.verticalHeaderImage.originalname)}`,
          ['image/jpeg'],
        ),
        smallHeaderImage: await this.uploadFile(
          data.thumbnailEntries.smallHeaderImage,
          data.name,
          `thumbnails/smallHeaderImage${path.extname(data.thumbnailEntries.smallHeaderImage.originalname)}`,
          ['image/jpeg'],
        ),
        searchImage: await this.uploadFile(
          data.thumbnailEntries.searchImage,
          data.name,
          `thumbnails/searchImage${path.extname(data.thumbnailEntries.searchImage.originalname)}`,
          ['image/jpeg'],
        ),
        tabImage: await this.uploadFile(
          data.thumbnailEntries.tabImage,
          data.name,
          `thumbnails/tabImage${path.extname(data.thumbnailEntries.tabImage.originalname)}`,
          ['image/jpeg'],
        ),
      };

      // Upload image entries sequentially
      const imageEntries: ImageEntry[] = [];
      for (const imageEntry of data.imageEntries) {
        const link = await this.uploadFile(
          imageEntry.image,
          data.name,
          `images/${imageEntry.order}${path.extname(imageEntry.image.originalname)}`,
          ['image/jpeg'],
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
        const link = await this.uploadFile(
          videoEntry.video,
          data.name,
          `videos/${videoEntry.order}${path.extname(videoEntry.video.originalname)}`,
          ['video/webm'],
        );
        const posterLink = await this.uploadFile(
          videoEntry.poster,
          data.name,
          `videos/${videoEntry.order}-poster${path.extname(videoEntry.poster.originalname)}`,
          ['image/jpeg'],
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
        features: data.features,
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
      const { id } = await this.game.create(gameData);

      // Return success message
      return { message: 'Game created successfully', id };
    } catch (e: unknown) {
      if (e instanceof Error) {
        this.logger.error(`Failed to create game: ${e.message}`, e.stack);
      }

      try {
        await this.storage.deleteGame(data.name);
        this.logger.log(`Game ${data.name} deleted from storage after failed creation.`);
      } catch (deleteError: unknown) {
        if (deleteError instanceof Error) {
          this.logger.error(`Failed to delete game after creation error: ${deleteError.message}`, deleteError.stack);
        }
      }

      throw new InternalServerErrorException('Failed to create game');
    }
  }

  /**
   * Update game by ID
   * @param data An object containing the updated game data and the ID of the game to update
   * @returns A message indicating the success of the operation
   */
  public async updateGame(data: UpdateData): Promise<{ message: string }> {
    this.logger.log(`Updating game with ID: ${data.id}`);
    this.logger.verbose(
      `Updating game with data: ${JSON.stringify({
        ...data,
        addedVideos: data.addedVideos.map((v) => v.order),
        addedScreenshots: data.addedScreenshots.map((s) => s.order),
      })}`,
    );

    // Get storage name
    const { storageName } = await this.game.getById(data.id);

    // Change the updated thumbnails
    const changedThumbnails: ThumbnailsEntry = {
      mainImage: data.changedThumbnails.mainImage
        ? await this.uploadFile(
            data.changedThumbnails.mainImage,
            storageName,
            `thumbnails/mainImage${path.extname(data.changedThumbnails.mainImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      backgroundImage: data.changedThumbnails.backgroundImage
        ? await this.uploadFile(
            data.changedThumbnails.backgroundImage,
            storageName,
            `thumbnails/backgroundImage${path.extname(data.changedThumbnails.backgroundImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      menuImg: data.changedThumbnails.menuImg
        ? await this.uploadFile(
            data.changedThumbnails.menuImg,
            storageName,
            `thumbnails/menuImg${path.extname(data.changedThumbnails.menuImg.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      horizontalHeaderImage: data.changedThumbnails.horizontalHeaderImage
        ? await this.uploadFile(
            data.changedThumbnails.horizontalHeaderImage,
            storageName,
            `thumbnails/horizontalHeaderImage${path.extname(data.changedThumbnails.horizontalHeaderImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      verticalHeaderImage: data.changedThumbnails.verticalHeaderImage
        ? await this.uploadFile(
            data.changedThumbnails.verticalHeaderImage,
            storageName,
            `thumbnails/verticalHeaderImage${path.extname(data.changedThumbnails.verticalHeaderImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      smallHeaderImage: data.changedThumbnails.smallHeaderImage
        ? await this.uploadFile(
            data.changedThumbnails.smallHeaderImage,
            storageName,
            `thumbnails/smallHeaderImage${path.extname(data.changedThumbnails.smallHeaderImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      searchImage: data.changedThumbnails.searchImage
        ? await this.uploadFile(
            data.changedThumbnails.searchImage,
            storageName,
            `thumbnails/searchImage${path.extname(data.changedThumbnails.searchImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
      tabImage: data.changedThumbnails.tabImage
        ? await this.uploadFile(
            data.changedThumbnails.tabImage,
            storageName,
            `thumbnails/tabImage${path.extname(data.changedThumbnails.tabImage.originalname)}`,
            ['image/jpeg'],
            true,
          )
        : undefined,
    };

    // Delete the deleted screenshots from storage
    if (data.deletedScreenshots) {
      for (const screenshot of data.deletedScreenshots) {
        await this.deleteFile(storageName, `screenshots/${screenshot.toString()}.jpg`);
      }
    }

    // Delete the deleted videos from storage
    if (data.deletedVideos) {
      for (const video of data.deletedVideos) {
        await this.deleteFile(storageName, `videos/${video.toString()}.webm`);
        await this.deleteFile(storageName, `videos/${video.toString()}-poster.jpg`);
      }
    }

    // Rename the changed screenshots to their new orders
    const renamedScreenshots: { oldOrder: number; newOrder: number; link: string }[] = [];
    if (data.changedScreenshots) {
      for (const entry of data.changedScreenshots) {
        const screenshot = await this.renameFile(
          storageName,
          `screenshots/${entry.oldOrder}.jpg`,
          `screenshots/${entry.newOrder}.jpg`,
        );
        renamedScreenshots.push({
          oldOrder: entry.oldOrder,
          newOrder: entry.newOrder,
          link: screenshot,
        });
      }
    }

    // Rename the changed videos to their new orders
    const renamedVideos: { oldOrder: number; newOrder: number; videoLink: string; posterLink: string }[] = [];
    if (data.changedVideos) {
      for (const entry of data.changedVideos) {
        const video = await this.renameFile(
          storageName,
          `videos/${entry.oldOrder}.webm`,
          `videos/${entry.newOrder}.webm`,
        );
        const poster = await this.renameFile(
          storageName,
          `videos/${entry.oldOrder}-poster.jpg`,
          `videos/${entry.newOrder}-poster.jpg`,
        );
        renamedVideos.push({
          oldOrder: entry.oldOrder,
          newOrder: entry.newOrder,
          videoLink: video,
          posterLink: poster,
        });
      }
    }

    // Add the new screenshots to storage
    const newScreenshots: ImageEntry[] = [];
    if (data.addedScreenshots) {
      for (const entry of data.addedScreenshots) {
        const screenshot = await this.storage.uploadFile(
          entry.image,
          storageName,
          `screenshots/${entry.image.originalname}`,
          ['image/jpeg'],
        );
        newScreenshots.push({
          featured: entry.featured,
          order: entry.order,
          link: screenshot.sharedLink,
        });
      }
    }

    // Add the new videos to storage
    const newVideos: VideoEntry[] = [];
    if (data.addedVideos) {
      for (const entry of data.addedVideos) {
        const video = await this.storage.uploadFile(
          entry.video,
          storageName,
          `videos/${entry.order}${path.extname(entry.video.originalname)}`,
          ['video/webm'],
        );
        const poster = await this.storage.uploadFile(
          entry.poster,
          storageName,
          `videos/${entry.order}-poster${path.extname(entry.poster.originalname)}`,
          ['image/jpeg'],
        );
        newVideos.push({
          order: entry.order,
          link: video.sharedLink,
          posterLink: poster.sharedLink,
        });
      }
    }

    const gameData = {
      name: data.name,
      category: data.category,
      description: data.description,
      releaseDate: data.releaseDate,
      publishers: data.publishers,
      developers: data.developers,
      changedThumbnails,
      deletedScreenshots: data.deletedScreenshots,
      deletedVideos: data.deletedVideos,
      renamedScreenshots,
      renamedVideos,
      addedScreenshots: newScreenshots,
      addedVideos: newVideos,
      featuredOrders: data.featuredOrders,
      tags: data.tags,
      pricing: data.pricing,
      features: data.features,
      languages: data.languages,
      featured: data.featured,
      platformEntries: data.platformEntries,
      link: data.link,
      about: data.about,
      mature: data.mature,
      matureDescription: data.matureDescription,
      systemRequirements: data.systemRequirements,
      legal: data.legal,
    };

    // Create game
    await this.game.update(data.id, gameData);

    // Return success message
    return { message: 'Game updated successfully' };
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
    await this.storage.deleteGame(game.name);

    // Delete game
    await this.game.remove(id);

    // Return success message
    return { message: 'Game deleted successfully' };
  }

  /**
   * Upload a file to the storage
   * @param file The file to upload
   * @param name The name of the file
   * @param filePath The path of the file
   * @returns The shared link of the file
   */
  private async uploadFile(
    file: File,
    name: string,
    filePath: string,
    allowedMimeTypes: string[],
    overwrite?: boolean,
  ): Promise<string> {
    const result = await this.storage.uploadFile(file, name, filePath, allowedMimeTypes, overwrite);
    return result.sharedLink;
  }

  /**
   * Rename a file in the storage
   * @param file The file to rename
   * @param name The new name of the file
   * @param filePath The path of the file
   * @returns The shared link of the file
   */
  private async renameFile(gameName: string, oldName: string, newName: string): Promise<string> {
    const result = await this.storage.renameFile(gameName, oldName, newName);
    return result.sharedLink;
  }

  /**
   * Delete a file from the storage
   * @param file The file to delete
   * @param name The name of the file
   * @param filePath The path of the file
   */
  private async deleteFile(gameName: string, filePath: string): Promise<void> {
    await this.storage.deleteFile(gameName, filePath);
  }
}
