import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewGameDto {
  @ApiProperty({ description: 'Game ID', example: 'enter game id number here', required: true })
  @IsNotEmpty({ message: 'gameId is required' })
  @IsNumber({}, { message: 'Game ID must be a number' })
  gameId: number;

  @ApiProperty({ description: 'Positive or Negative', example: true, required: true })
  @IsNotEmpty({ message: 'positive is required' })
  @IsBoolean({ message: 'Positive must be a boolean' })
  positive: boolean;

  @ApiProperty({ description: 'Review Content', example: 'enter review content here', required: true })
  @IsNotEmpty({ message: 'content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;
}