import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFileTypeException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
