// Class-validator
import { IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePublisherDto {
  @ApiProperty({ example: 'Publisher Name', description: 'Name of the publisher', required: false })
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty({ example: 'https://example.com', description: 'Website of the publisher', required: false })
  @IsString({ message: 'Website must be a string' })
  website?: string;
}
