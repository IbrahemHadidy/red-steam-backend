// NestJS
import { Injectable } from '@nestjs/common';

// Class-transformer
import { plainToClass } from 'class-transformer';

// RxJS
import { map } from 'rxjs/operators';

// Types
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { ClassConstructor } from 'class-transformer';
import type { Observable } from 'rxjs';

/**
 * Interceptor to serialize the response data using a specified DTO class.
 * @param dto - DTO class
 * @returns Serialized data
 */
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  // The DTO class that will be used to transform the response data.
  constructor(private readonly dto: ClassConstructor<unknown>) {}

  // The intercept method is called for every request handled by the route where this interceptor is applied.
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        // Transform the plain data into an instance of the DTO class, excluding any extraneous values.
        const transformedData = plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });

        // Return the transformed data to continue the response process.
        return transformedData;
      }),
    );
  }
}
