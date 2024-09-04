// NestJS
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for invalid file.
 */
export class InvalidFileException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
