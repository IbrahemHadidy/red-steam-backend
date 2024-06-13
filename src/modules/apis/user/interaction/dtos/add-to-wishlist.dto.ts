import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToWishlistDto {
  @ApiProperty({ description: 'Games to add to wishlist', example: ['enter games ids here'], required: true })
  @IsNotEmpty({ message: 'itemsIds is required' })
  @IsArray({ message: 'itemIds must be an array' })
  @IsNumber({}, { each: true, message: 'itemsIds must be an array of numbers' })
  itemsIds: number[];
}
