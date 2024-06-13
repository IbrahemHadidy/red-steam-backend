import { Injectable } from '@nestjs/common';
import { InvalidFileTypeException } from '@exceptions/invalid-file-type.exception';
import type { File } from '@nest-lab/fastify-multer';

@Injectable()
export class MockDriveService {
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png'];
  private readonly logger = { log: jest.fn() };

  public async uploadAvatar(avatar: File): Promise<{ data: { id: string } }> {
    // Validate file type
    if (!this.allowedMimeTypes.includes(avatar.mimetype)) {
      throw new InvalidFileTypeException('Invalid file type. Only JPEG and PNG images allowed.');
    }

    // Simulate file upload and return a mock response
    const mockFileId = `mockFileId-${Date.now()}`;
    this.logger.log(`Avatar ${mockFileId} uploaded successfully`);

    return {
      data: { id: mockFileId },
    };
  }

  public async deleteAvatar(fileId: string): Promise<void> {
    // Simulate file deletion
    this.logger.log(`Avatar ${fileId} deleted successfully`);
  }
}
