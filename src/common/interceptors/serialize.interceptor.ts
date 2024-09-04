// NestJS
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

// Class-transformer
import { ClassConstructor, plainToClass } from 'class-transformer';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interceptor to serialize the response data using class-transformer
 * @param dto - DTO class
 * @returns Serialized data
 */
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: { accessToken?: string; refreshToken?: string } = {}) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        // const request = ctx.getRequest();

        const transformedData = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });

        // Check if Fastify's reply object is used and send the response
        if (response && typeof response.send === 'function') {
          if (data.accessToken) {
            response.header('authorization', data.accessToken);
          }
          if (data.refreshToken) {
            response.header('x-refresh-token', data.refreshToken);
          }
          response.send(transformedData);
        }

        return transformedData;
      }),
    );
  }
}
