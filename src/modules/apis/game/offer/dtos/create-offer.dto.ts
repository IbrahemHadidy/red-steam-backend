// Class-validator
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ example: 1, description: 'offer id', required: true })
  @IsNotEmpty({ message: 'offer id is required' })
  @IsNumber({ allowNaN: false }, { message: 'offer id must be a number' })
  gameId: number;

  @ApiProperty({ example: 10, description: 'discount price', required: true })
  @IsNotEmpty({ message: 'discount price is required' })
  @IsNumber({ allowNaN: false }, { message: 'discount price must be a number' })
  discountPrice: number;

  @ApiProperty({ example: '2022-01-01', description: 'discount start date', required: true })
  @IsNotEmpty({ message: 'discount start date is required' })
  @IsDate({ message: 'discount start date must be a date' })
  discountStartDate: Date;

  @ApiProperty({ example: '2022-01-01', description: 'discount end date', required: true })
  @IsNotEmpty({ message: 'discount end date is required' })
  @IsDate({ message: 'discount end date must be a date' })
  discountEndDate: Date;

  @ApiProperty({ example: 'SPECIAL PROMOTION', description: 'offer type', required: true })
  @IsNotEmpty({ message: 'offer type is required' })
  @IsString({ message: 'offer type must be a string' })
  offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
}
