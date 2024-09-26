// NestJS
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Exceptions
import { InvalidFileException } from '@exceptions/invalid-file.exception';

// Services
import { DropboxService } from '@services/dropbox/dropbox.service';

// Types
import type { File } from '@nest-lab/fastify-multer';
import type { files } from 'dropbox';
interface UploadResponse extends files.FileMetadata {
  sharedLink: string;
}
interface RenameResponse extends files.RelocationResult {
  sharedLink: string;
}

@Injectable()
export class GameStorageService {
  private readonly gameFolderPath: string;

  constructor(
    private readonly dbx: DropboxService,
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {
    // Read game folder path from environment variable
    this.gameFolderPath = this.config.get<string>('DROPBOX_GAME_FOLDER_PATH');
  }

  /**
   * Uploads a media file to Dropbox
   * @param file - The media file to upload
   * @param gameName - The name of the game
   * @param fileName - The name of the file
   * @param overwrite - Whether to overwrite the existing file
   * @returns The upload response data
   * @throws `BadRequestException` - If the input parameters are invalid
   * @throws `InvalidFileException` - If the file type is not allowed
   * @throws `InternalServerErrorException` - If there was an error uploading the media file
   */
  public async uploadFile(
    file: File,
    gameName: string,
    fileName: string,
    allowedMimeTypes: string[],
    overwrite = false,
  ): Promise<Partial<UploadResponse>> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Validate input parameters
    if (!gameName || !fileName) {
      throw new BadRequestException('Invalid parameters: gameName and fileName are required');
    }

    // Validate file type (adapt based on your requirements)
    if (!this.dbx.isValidMimeType(file.mimetype, allowedMimeTypes)) {
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

    // Log the upload message
    this.logger.log(`File ${file.originalname} uploaded to ${this.gameFolderPath}/${gameName}`);

    // Prepare the file to be uploaded
    const uploadPath = `${this.gameFolderPath}/${gameName}/${fileName}`;

    // Upload the file to Dropbox
    const uploadResponse = await this.dbx.dropboxClient.filesUpload({
      path: uploadPath,
      contents: file.buffer,
      mode: { '.tag': overwrite ? 'overwrite' : 'add' },
    });

    // Create a shared link for the uploaded file
    const sharedLinkResponse = await this.getSharedLink(uploadResponse.result.path_display);

    // Log the success message
    this.logger.log(`File ${uploadResponse.result.id} uploaded successfully`);

    // Return the upload response data
    return {
      ...uploadResponse.result,
      sharedLink: sharedLinkResponse,
    };
  }

  /**
   * Renames a game directory in Dropbox
   * @param oldName - The name of the game to rename
   * @param newName - The new name of the game
   * @throws `BadRequestException` - If the input parameters are invalid
   */
  public async renameDirectory(gameName: string, oldName: string, newName: string): Promise<void> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Validate input parameters
    if (!gameName || !oldName || !newName) {
      throw new BadRequestException('Invalid parameters: gameName, oldName, and newName are required.');
    }

    // Construct the path of the directory to rename
    const oldPath = `${this.gameFolderPath}/${gameName}`;
    const newPath = `${this.gameFolderPath}/${newName}`;

    // Log the renaming message
    this.logger.log(`Renaming game: ${oldPath} to ${newPath}`);

    // Rename the directory in Dropbox
    await this.dbx.dropboxClient.filesMoveV2({ from_path: oldPath, to_path: newPath });

    // Log the success message
    this.logger.log(`Game directory ${oldPath} renamed successfully to ${newPath}`);
  }

  /**
   * Renames a file in Dropbox
   * @param gameName - The name of the game
   * @param oldName - The name of the file to rename
   * @param newName - The new name of the file
   */
  public async renameFile(gameName: string, oldName: string, newName: string): Promise<Partial<RenameResponse>> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Validate input parameters
    if (!gameName || !oldName || !newName) {
      throw new BadRequestException('Invalid parameters: gameName, oldName, and newName are required.');
    }

    // Construct the path of the file to rename
    const oldPath = `${this.gameFolderPath}/${gameName}/${oldName}`;
    const newPath = `${this.gameFolderPath}/${gameName}/${newName}`;

    // Log the renaming message
    this.logger.log(`Renaming file: ${oldPath} to ${newPath}`);

    // Rename the file in Dropbox
    const remameResponse = await this.dbx.dropboxClient.filesMoveV2({ from_path: oldPath, to_path: newPath });

    // Log the success message
    this.logger.log(`File ${oldPath} renamed to ${newPath} successfully`);

    // Create a shared link for the uploaded file
    const sharedLinkResponse = await this.getSharedLink(remameResponse.result.metadata.path_display);

    return {
      ...remameResponse.result.metadata,
      sharedLink: sharedLinkResponse,
    };
  }

  /**
   * Deletes a directory from Dropbox
   * @param gameName - The name of the game to delete
   * @returns A promise that resolves when the directory is deleted
   * @throws `BadRequestException` - If the input parameters are invalid
   */
  public async deleteGame(gameName: string): Promise<void> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Validate input parameters
    if (!gameName) {
      throw new BadRequestException('Invalid parameters: gameName is required');
    }

    // Construct the path of the directory to delete
    const directoryPath = `${this.gameFolderPath}/${gameName}`;

    // Log the deletion message
    this.logger.log(`Deleting directory: ${directoryPath}`);

    // Delete the directory from Dropbox
    await this.dbx.dropboxClient.filesDeleteV2({ path: directoryPath });

    // Log the success message
    this.logger.log(`Directory ${directoryPath} deleted successfully`);
  }

  /**
   * Deletes a file from Game Storage
   * @param gameName - The name of the game
   * @param filePath - The path of the file to delete
   * @returns A promise that resolves when the file is deleted
   * @throws `BadRequestException` - If the input parameters are invalid
   */
  public async deleteFile(gameName: string, filePath: string): Promise<void> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Validate input parameters
    if (!gameName || !filePath) {
      throw new BadRequestException('Invalid parameters: gameName and filePath are required');
    }

    // Log the deletion message
    this.logger.log(`Deleting file: ${filePath}`);

    // Construct the path of the file to delete
    const filePathToDelete = `${this.gameFolderPath}/${gameName}/${filePath}`;

    // Delete the file from Dropbox
    await this.dbx.dropboxClient.filesDeleteV2({ path: filePathToDelete });

    // Log the success message
    this.logger.log(`File ${filePath} deleted successfully`);
  }

  /**
   * Creates a shared link for a file in Dropbox
   * @param path - The path of the file
   * @returns A promise that resolves with the shared link
   */
  private async getSharedLink(path: string): Promise<string> {
    let sharedLinkResponse: string;

    // Try to list existing shared links
    const existingLinks = await this.dbx.dropboxClient.sharingListSharedLinks({ path });

    if (existingLinks.result.links.length > 0) {
      // If a shared link exists, use the first one
      sharedLinkResponse = existingLinks.result.links[0].url;
    } else {
      // If no shared link exists, create a new one
      sharedLinkResponse = (await this.dbx.dropboxClient.sharingCreateSharedLinkWithSettings({ path })).result.url;
    }

    // Return the shared link with the raw=1 query parameter
    return sharedLinkResponse.replace('dl=0', 'raw=1');
  }
}
