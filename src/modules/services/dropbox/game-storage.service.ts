// NestJS
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Exceptions
import { InvalidFileException } from '@exceptions/invalid-file.exception';

// Services
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';
import { DropboxService } from '@services/dropbox/dropbox.service';

// Types
import type { File } from '@nest-lab/fastify-multer';
import type { Dropbox } from 'dropbox';
interface UploadResponse extends Dropbox {
  sharedLink: string;
}

@Injectable()
export class GameStorageService extends DropboxService {
  private readonly gameFolderPath: string;

  constructor(config: ConfigService, logger: Logger, tokensService: DropboxTokensService) {
    super(config, logger, tokensService);
    // Read game folder path from environment variable
    this.gameFolderPath = this.config.get<string>('DROPBOX_GAME_FOLDER_PATH');
  }

  /**
   * Uploads a media file to Dropbox
   * @param {File} file - The media file to upload
   * @returns {Promise<Partial<UploadResponse>>} The upload response data
   * @throws {InvalidFileTypeException} - If the file type is not allowed
   * @throws {InternalServerErrorException} - If there was an error uploading the media file
   */
  public async uploadFile(file: File, gameName: string, fileName: string): Promise<Partial<UploadResponse>> {
    // Ensure valid access token
    await this.ensureValidAccessToken();

    // Validate file type (adapt based on your requirements)
    const allowedMimeTypes = ['image/*', 'video/*'];
    if (!this.isValidMimeType(file.mimetype, allowedMimeTypes)) {
      throw new InvalidFileException('Invalid file type.');
    }

    // Validate file isn't empty
    if (file.size === 0) {
      throw new InvalidFileException('File is empty');
    }

    // Validate video file size (adapt based on your requirements)
    const MAXIMUM_SIZE = 150; // MBs
    if (file.size > MAXIMUM_SIZE * 1024 * 1024) {
      throw new InvalidFileException(`File is too large. Maximum size allowed is ${MAXIMUM_SIZE}MB`);
    }

    // Prepare the file to be uploaded
    const uploadPath = `${this.gameFolderPath}/${gameName}/${fileName}`;

    // Upload the file to Dropbox
    const uploadResponse = await this.dropbox.filesUpload({
      path: uploadPath,
      contents: file.buffer,
      mode: { '.tag': 'add' },
    });

    // Create a shared link for the uploaded file
    const sharedLinkResponse = await this.dropbox.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.result.path_display,
    });

    // Log the success message
    this.logger.log(`File ${uploadResponse.result.id} uploaded successfully`);

    // Return the upload response data
    return {
      ...uploadResponse.result,
      sharedLink: sharedLinkResponse.result.url.replace('dl=0', 'raw=1'),
    };
  }

  /**
   * Deletes a directory from Dropbox
   * @param {string} gameName - The name of the game to delete
   * @returns {Promise<void>} A promise that resolves when the directory is deleted
   */
  public async deleteDirectory(gameName: string): Promise<void> {
    // Ensure valid access token
    await this.ensureValidAccessToken();

    // Construct the path of the directory to delete
    const directoryPath = `${this.gameFolderPath}/${gameName}`;

    // Log the deletion message
    this.logger.log(`Deleting directory: ${directoryPath}`);

    // Delete the directory from Dropbox
    await this.dropbox.filesDeleteV2({ path: directoryPath });

    // Log the success message
    this.logger.log(`Directory ${directoryPath} deleted successfully`);
  }
}
