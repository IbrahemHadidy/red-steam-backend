import fs from 'fs';
import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DropboxModule } from '@services/dropbox/dropbox.module';
import { AvatarStorageService } from '@services/dropbox/avatar-storage.service';

import { InvalidFileException } from '@exceptions/invalid-file.exception';

// Types
import type { File } from '@nest-lab/fastify-multer';

describe('AvatarStorageService', () => {
  let avatarStorageService: AvatarStorageService;
  let logger: Logger;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
            `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
            `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
            'src/common/configs/environments/.env',
          ],
        }),
        DropboxModule,
      ],
      providers: [AvatarStorageService, Logger, ConfigService],
    }).compile();

    avatarStorageService = module.get<AvatarStorageService>(AvatarStorageService);
    logger = module.get<Logger>(Logger);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    cleanupTestFiles();
  });

  afterAll(() => {
    cleanupTestFiles();
  });

  function cleanupTestFiles() {
    const testFilesDir = path.resolve(__dirname);
    const filesToDelete = ['test.png', 'test.gif'];

    filesToDelete.forEach((fileName) => {
      const filePath = path.join(testFilesDir, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  describe('uploadAvatar', () => {
    it('should upload avatar successfully', async () => {
      const filePath = path.resolve(__dirname, 'test.png');
      const fileContent = Buffer.from([1, 2, 3]);

      // Create a test file if it doesn't exist
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
      }

      const file: File = {
        fieldname: 'avatar',
        originalname: 'avatar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: fileContent.length,
        buffer: fileContent,
        path: filePath,
      };

      const result = await avatarStorageService.uploadAvatar(file);

      // Assertions
      expect(result.sharedLink).toBeDefined();
    });

    it('should throw an error if the file type is not allowed', async () => {
      const filePath = path.resolve(__dirname, 'test.gif');
      const fileContent = Buffer.from('test');

      // Create a test file
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
      }

      const file: File = {
        fieldname: 'avatar',
        originalname: 'avatar.gif',
        encoding: '7bit',
        mimetype: 'image/gif',
        size: fileContent.length,
        buffer: fileContent,
        path: filePath,
      };

      // Assertions
      await expect(avatarStorageService.uploadAvatar(file)).rejects.toThrow(InvalidFileException);
    });
  });

  describe('deleteAvatar', () => {
    it('should delete avatar successfully', async () => {
      // Mock the logger
      const loggerSpy = jest.spyOn(logger, 'log');

      const filePath = path.resolve(__dirname, 'test.png');
      const fileContent = Buffer.from([1, 2, 3]);

      // Create a test file
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
      }

      const file: File = {
        fieldname: 'avatar',
        originalname: 'avatar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: fileContent.length,
        buffer: fileContent,
        path: filePath,
      };

      const result = await avatarStorageService.uploadAvatar(file);
      const avatarId = result.sharedLink.split('/avatar-')[1].split('?')[0];

      await avatarStorageService.deleteAvatar(avatarId);

      // Assertions
      expect(loggerSpy).toHaveBeenCalledWith(`Avatar ${avatarId} deleted successfully`);
    });
  });
});