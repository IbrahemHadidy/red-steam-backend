// Class-validator
import { IsArray, IsNumber, IsOptional } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class RemoveFromLibraryDto {
  @ApiProperty({
    description: 'Optional array of item IDs, if not provided all items will be removed',
    example: ['enter items ids here'],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'itemsIds must be an array' })
  @IsNumber({}, { each: true, message: 'itemIds must be an array of numbers' })
  readonly itemsIds?: number[];
}
