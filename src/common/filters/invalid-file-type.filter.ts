import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { InvalidFileException } from '@exceptions/invalid-file.exception';

@Catch(InvalidFileException)
export class InvalidFileTypeFilter implements ExceptionFilter {
  catch(exception: InvalidFileException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(HttpStatus.BAD_REQUEST).send({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
