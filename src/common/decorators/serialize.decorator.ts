// NestJS
import { UseInterceptors } from '@nestjs/common';

// Interceptors
import { SerializeInterceptor } from '@interceptors/serialize.interceptor';

// Types
import type { ClassConstructor } from 'class-transformer';

/**
 * Decorator to serialize the response data using class-transformer
 * @param dto - DTO class
 * @returns Serialized data
 */
export function Serialize(dto: ClassConstructor<unknown>): MethodDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
