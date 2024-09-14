// NestJS
import { Catch, HttpStatus } from '@nestjs/common';

// Exceptions
import { InvalidFileException } from '@exceptions/invalid-file.exception';

// Types
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

@Catch(InvalidFileException)
export class InvalidFileTypeFilter implements ExceptionFilter {
  public catch(exception: InvalidFileException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(HttpStatus.BAD_REQUEST).send({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
