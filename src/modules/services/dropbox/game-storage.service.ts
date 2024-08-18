import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dropbox } from 'dropbox';
import { InvalidFileException } from '@exceptions/invalid-file.exception';
import { DropboxService } from '@services/dropbox/dropbox.service';
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';

import type { File } from '@nest-lab/fastify-multer';
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
    // Validate file type (adapt based on your requirements)
    const allowedMimeTypes = ['image/*', 'video/*'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new InvalidFileException('Invalid file type. Only JPEG and PNG images allowed.');
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
   * Deletes a media file from Dropbox
   * @param {string} filePath - The path of the media file to delete
   * @returns {Promise<void>} A promise that resolves when the media file is deleted
   */
  public async deleteFile(filePath: string): Promise<void> {
    this.logger.error(`Deleting media file: ${filePath}`);
    await this.dropbox.filesDeleteV2({ path: filePath });

    // Log the success message
    this.logger.log(`Media file ${filePath} deleted successfully`);
  }
}
