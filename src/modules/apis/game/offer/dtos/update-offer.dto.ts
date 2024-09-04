// Class-validator
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  @ApiProperty({ example: 10, description: 'discount price', required: false })
  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: 'discount price must be a number' })
  discountPrice?: number;

  @ApiProperty({ example: '2022-01-01', description: 'discount start date', required: false })
  @IsOptional()
  @IsDate({ message: 'discount start date must be a date' })
  discountStartDate?: Date;

  @ApiProperty({ example: '2022-01-01', description: 'discount end date', required: false })
  @IsOptional()
  @IsDate({ message: 'discount end date must be a date' })
  discountEndDate?: Date;

  @ApiProperty({ example: 'SPECIAL PROMOTION', description: 'offer type', required: false })
  @IsOptional()
  @IsString({ message: 'offer type must be a string' })
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
}
