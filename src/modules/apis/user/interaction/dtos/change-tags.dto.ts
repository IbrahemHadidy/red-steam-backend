import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeTagsDto {
  @ApiProperty({ description: 'Tags to be added to the user', example: ['enter tags ids here'], required: true })
  @IsNotEmpty({ message: 'Tags are required' })
  @IsArray({ message: 'Tags must be an array of numbers' })
  @IsNumber({}, { each: true, message: 'Tags must be an array of numbers' })
  tags: number[];
}