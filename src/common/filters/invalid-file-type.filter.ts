import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { InvalidFileTypeException } from '@exceptions/invalid-file-type.exception';

@Catch(InvalidFileTypeException)
export class InvalidFileTypeFilter implements ExceptionFilter {
  catch(exception: InvalidFileTypeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(HttpStatus.BAD_REQUEST).send({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
