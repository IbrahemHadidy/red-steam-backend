// Class-validator
import { IsDate, IsOptional, IsString } from 'class-validator';

// Class-transformer
import { Type } from 'class-transformer';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  @ApiProperty({ example: 10, description: 'discount price', required: false })
  @IsOptional()
  @IsString({ message: 'discount price must be a string' })
  readonly discountPrice?: string;

  @ApiProperty({ example: '2022-01-01', description: 'discount start date', required: false })
  @IsOptional()
  @IsDate({ message: 'discount start date must be a date' })
  @Type(() => Date)
  readonly discountStartDate?: Date;

  @ApiProperty({ example: '2022-01-01', description: 'discount end date', required: false })
  @IsOptional()
  @IsDate({ message: 'discount end date must be a date' })
  @Type(() => Date)
  readonly discountEndDate?: Date;

  @ApiProperty({ example: 'SPECIAL PROMOTION', description: 'offer type', required: false })
  @IsOptional()
  @IsString({ message: 'offer type must be a string' })
  readonly offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
}
