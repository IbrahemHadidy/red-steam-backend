// NestJS
import { UseInterceptors } from '@nestjs/common';

// Class-transformer
import { ClassConstructor } from 'class-transformer';

// Interceptors
import { SerializeInterceptor } from '@interceptors/serialize.interceptor';

/**
 * Decorator to serialize the response data using class-transformer
 * @param dto - DTO class
 * @returns Serialized data
 */
export function Serialize(dto: ClassConstructor<unknown>): MethodDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
