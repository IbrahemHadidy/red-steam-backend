import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeveloperDto {
  @ApiProperty({ example: 'Developer Name', description: 'Name of the developer', required: true })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'https://example.com', description: 'Website of the developer', required: true })
  @IsString({ message: 'Website must be a string' })
  @IsNotEmpty({ message: 'Website is required' })
  website: string;
}