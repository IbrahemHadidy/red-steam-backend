import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from '@interceptors/serialize.interceptor';

/**
 * Decorator to serialize the response data using class-transformer
 * @param dto - DTO class
 * @returns Serialized data
 */
export function Serialize(dto: ClassConstructor<any>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
