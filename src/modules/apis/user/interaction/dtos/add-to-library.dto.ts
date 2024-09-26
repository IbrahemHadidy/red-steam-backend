// Class-validator
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class AddToLibraryDto {
  @ApiProperty({ description: 'Games to add to library', example: ['enter games ids here'], required: true })
  @IsNotEmpty({ message: 'itemsIds is required' })
  @IsArray({ message: 'itemIds must be an array' })
  @IsNumber({}, { each: true, message: 'itemIds must be an array of numbers' })
  readonly itemsIds: number[];
}
