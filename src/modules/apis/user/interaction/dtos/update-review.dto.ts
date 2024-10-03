// Class-validator
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty({ description: 'Review ID', example: 'enter review id number here', required: true })
  @IsNotEmpty({ message: 'reviewId is required' })
  @IsNumber({}, { message: 'Review ID must be a number' })
  readonly reviewId: number;

  @ApiProperty({ description: 'Positive or Negative', example: true, required: true })
  @IsNotEmpty({ message: 'positive is required' })
  @IsBoolean({ message: 'Positive must be a boolean' })
  readonly positive: boolean;

  @ApiProperty({ description: 'Review Content', example: 'enter review content here', required: true })
  @IsNotEmpty({ message: 'content is required' })
  @IsString({ message: 'Content must be a string' })
  readonly content: string;
}
