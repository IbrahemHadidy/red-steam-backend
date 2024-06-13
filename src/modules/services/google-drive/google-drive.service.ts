import fs from 'fs';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvalidFileTypeException } from '@exceptions/invalid-file-type.exception';
import { google } from 'googleapis';

import type { File } from '@nest-lab/fastify-multer';
import type { drive_v3 } from 'googleapis';
import type { ExternalAccountClientOptions, GoogleAuth } from 'google-auth-library';
import type { GaxiosPromise } from 'gaxios/build/src';
import type { JSONClient } from 'google-auth-library/build/src/auth/googleauth';

@Injectable()
export class DriveService {
  private readonly keyFilePath: string;
  private readonly driveKey: ExternalAccountClientOptions;
  private readonly authClient: GoogleAuth<JSONClient>;
  private readonly drive: drive_v3.Drive;
  private readonly avatarFolderId: string;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {
    // Read credentials and initialize Google Drive API client
    this.keyFilePath = 'src/common/credentials/service-account-key.json';
    this.driveKey = JSON.parse(fs.readFileSync(this.keyFilePath).toString());
    this.authClient = new google.auth.GoogleAuth({
      credentials: this.driveKey,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth: this.authClient });

    // Read avatar folder ID from environment variable
    this.avatarFolderId = this.config.get<string>('DRIVE_AVATAR_FOLDER_ID');
  }

  /**
   * Uploads an avatar to Google Drive
   * @param {File} avatar - The avatar file to upload
   * @returns {GaxiosPromise<drive_v3.Schema$File>} The uploaded avatar metadata
   * @throws {InvalidFileTypeException} - If the file type is not allowed
   * @throws {InternalServerErrorException} - If there was an error uploading the avatar
   */
  public async uploadAvatar(avatar: File): GaxiosPromise<drive_v3.Schema$File> {
    // Validate file type (adapt based on your requirements)
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!allowedMimeTypes.includes(avatar.mimetype)) {
      throw new InvalidFileTypeException('Invalid file type. Only JPEG and PNG images allowed.');
    }

    // Validate file isn't empty
    if (avatar.size === 0) {
      throw new InvalidFileTypeException('File is empty');
    }

    // Validate file size (adapt based on your requirements)
    if (avatar.size > 5 * 1024 * 1024) {
      throw new InvalidFileTypeException('File is too large. Maximum size allowed is 5MB.');
    }

    // Prepare metadata for the file to be uploaded
    const fileMetadata = {
      name: `avatar-${Date.now()}`,
      mimeType: avatar.mimetype,
      parents: [this.avatarFolderId],
    };
    
    // Prepare the file to be uploaded
    const tempFolder = 'temp/';
    const tempFilePath = `${tempFolder}/${avatar.originalname}`;
    fs.writeFileSync(tempFilePath, avatar.buffer);
    const body = fs.createReadStream(tempFilePath);

    // Upload the file to Google Drive
    const uploadResponse = await this.drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType: avatar.mimetype,
        body,
      },
      fields: 'id',
    });

    // Add read permission for anyone to access the uploaded avatar
    const permissionResponse = await this.drive.permissions.create({
      fileId: uploadResponse.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    if (!permissionResponse.data) {
      throw new InternalServerErrorException('Failed to add read permission for the uploaded avatar');
    }

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    // Log the success message
    this.logger.log(`Avatar ${uploadResponse.data.id} uploaded successfully`);

    // Return the upload response data
    return uploadResponse;
  }

  /**
   * Deletes an avatar from Google Drive
   * @param {string} fileId - The ID of the avatar file to delete
   * @returns {Promise<void>} A promise that resolves when the avatar is deleted
   */
  public async deleteAvatar(fileId: string): Promise<void> {
    await this.drive.files.delete({
      fileId,
    });

    // Log the success message
    this.logger.log(`Avatar ${fileId} deleted successfully`);
  }
}
