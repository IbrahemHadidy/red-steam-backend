// Class-validator
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ description: 'Games to add to cart', example: ['enter items ids here'], required: true })
  @IsNotEmpty({ message: 'itemsIds is required' })
  @IsArray({ message: 'itemsIds must be an array' })
  @IsNumber({}, { each: true, message: 'itemIds must be an array of numbers' })
  readonly itemsIds: number[];
}
