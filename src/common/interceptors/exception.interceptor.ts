import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  public intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        let statusCode = 500;
        let message = 'Internal server error';
        let userMessage = 'An unexpected error occurred';

        if (error instanceof HttpException) {
          statusCode = error.getStatus();
          const errorMessage = error.getResponse()['message'] || error.message;

          if (Array.isArray(errorMessage)) {
            message = errorMessage.join(', ');
          } else {
            message = errorMessage;
          }

          userMessage = process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        const response = {
          statusCode,
          message: userMessage,
          timestamp: new Date().toISOString(),
          path: _context.switchToHttp().getRequest().url,
          method: _context.switchToHttp().getRequest().method,
        };

        this.logger.error(`Status: ${statusCode} | Message: ${message} | Path: ${_context.switchToHttp().getRequest().url}`, error.stack);

        return throwError(() => response);
      }),
    );
  }
}
