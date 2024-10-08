// Class-validator
import { IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeveloperDto {
  @ApiProperty({ example: 'Developer Name', description: 'Name of the developer', required: false })
  @IsString({ message: 'Name must be a string' })
  readonly name?: string;

  @ApiProperty({ example: 'https://example.com', description: 'Website of the developer', required: false })
  @IsString({ message: 'Website must be a string' })
  readonly website?: string;
}
