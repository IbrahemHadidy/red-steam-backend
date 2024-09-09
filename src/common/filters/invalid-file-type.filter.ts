// NestJS
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

// Fastify
import { FastifyReply } from 'fastify';

// Exceptions
import { InvalidFileException } from '@exceptions/invalid-file.exception';

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
