import fs from 'fs';
import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DriveModule } from '@services/google-drive/google-drive.module';
import { DriveService } from '@services/google-drive/google-drive.service';
import { InvalidFileTypeException } from '@exceptions/invalid-file-type.exception';

import type { File } from '@nest-lab/fastify-multer';

describe('DriveService', () => {
  let driveService: DriveService;
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
        DriveModule,
      ],
      providers: [DriveService, Logger, ConfigService],
    }).compile();

    driveService = module.get<DriveService>(DriveService);
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

      const result = await driveService.uploadAvatar(file);
      
      // Assertions
      expect(result.data.id).toBeDefined();
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
      await expect(driveService.uploadAvatar(file)).rejects.toThrow(InvalidFileTypeException);
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

      const result = await driveService.uploadAvatar(file);
      const avatarId = result.data.id;

      await driveService.deleteAvatar(avatarId);

      // Assertions
      expect(loggerSpy).toHaveBeenCalledWith(`Avatar ${avatarId} deleted successfully`);
    });
  });
});