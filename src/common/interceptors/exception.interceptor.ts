// NestJS
import { HttpException, Injectable, Logger } from '@nestjs/common';

// RxJS
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Types
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { Observable } from 'rxjs';

/**
 * Interceptor to handle common HTTP exceptions and customize error responses.
 * @returns Customized error response
 */
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  public intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        let statusCode = 500;
        let message = 'Internal server error';

        if (error instanceof HttpException) {
          statusCode = error.getStatus(); // Get the HTTP status code from the error
          const errorMessage = error.getResponse()['message'] || error.message; // Get the error message from the response, fallback to error.message if not available

          if (Array.isArray(errorMessage)) {
            // If the message is an array, join its elements into a single string
            message = errorMessage.join(', ');
          } else {
            message = errorMessage;
          }
        } else {
          console.error(error); // Log the error to console
        }

        // Customize the response as needed
        const response = {
          statusCode,
          message,
        };

        // Log error details
        this.logger.error(error.message);
        console.error(error.stack);

        // Send the response to the client
        return throwError(() => response);
      }),
    );
  }
}
