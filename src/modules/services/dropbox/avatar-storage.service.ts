// NestJS
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Exceptions
import { InvalidFileException } from '@exceptions/invalid-file.exception';

// Services
import { DropboxService } from '@services/dropbox/dropbox.service';

// Types
import type { File } from '@nest-lab/fastify-multer';
import type { Dropbox } from 'dropbox';
interface UploadResponse extends Dropbox {
  sharedLink: string;
}

@Injectable()
export class AvatarStorageService {
  private readonly avatarFolderPath: string;

  constructor(
    private readonly dbx: DropboxService,
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {
    // Read avatar folder path from environment variable
    this.avatarFolderPath = this.config.get<string>('DROPBOX_AVATAR_FOLDER_PATH');
  }

  /**
   * Uploads an avatar to Dropbox
   * @param avatar - The avatar file to upload
   * @returns The upload response data
   * @throws `InvalidFileException` - If the file type is not allowed
   * @throws `InternalServerErrorException` - If there was an error uploading the avatar
   */
  public async uploadAvatar(avatar: File): Promise<Partial<UploadResponse>> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Validate file type (adapt based on your requirements)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!this.dbx.isValidMimeType(avatar.mimetype, allowedMimeTypes)) {
      throw new InvalidFileException('Invalid file type. Only JPEG and PNG images allowed.');
    }

    // Validate file isn't empty
    if (avatar.size === 0) {
      throw new InvalidFileException('File is empty');
    }

    // Validate file size (adapt based on your requirements)
    if (avatar.size > 5 * 1024 * 1024) {
      throw new InvalidFileException('File is too large. Maximum size allowed is 5MB.');
    }

    // Prepare the file to be uploaded
    const fileName = `avatar-${Date.now()}-${avatar.originalname}`;
    const uploadPath = `${this.avatarFolderPath}/${fileName}`;

    // Upload the file to Dropbox
    const uploadResponse = await this.dbx.dropboxClient.filesUpload({
      path: uploadPath,
      contents: avatar.buffer,
      mode: { '.tag': 'add' },
    });

    // Create a shared link for the uploaded file
    const sharedLinkResponse = await this.dbx.dropboxClient.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.result.path_display,
    });

    // Log the success message
    this.logger.log(`Avatar ${uploadResponse.result.id} uploaded successfully`);

    // Return the upload response data
    return {
      ...uploadResponse.result,
      sharedLink: sharedLinkResponse.result.url.replace('dl=0', 'raw=1'),
    };
  }

  /**
   * Deletes an avatar from Dropbox
   * @param filePath - The path of the avatar file to delete
   * @returns A promise that resolves when the avatar is deleted
   */
  public async deleteAvatar(filePath: string): Promise<void> {
    // Ensure valid access token
    await this.dbx.ensureValidAccessToken();

    // Log the deletion message
    this.logger.log(`Deleting avatar file: ${filePath}`);

    // Delete the avatar file from Dropbox
    await this.dbx.dropboxClient.filesDeleteV2({ path: filePath });

    // Log the success message
    this.logger.log(`Avatar ${filePath} deleted successfully`);
  }
}
