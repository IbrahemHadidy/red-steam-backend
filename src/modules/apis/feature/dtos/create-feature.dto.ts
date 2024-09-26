// Class-validator
import { IsNotEmpty, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({ example: 'Feature Name', description: 'Feature of the Tag', required: true })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @ApiProperty({ example: 'Feature icon', description: 'Icon of the Feature', required: true })
  @IsString({ message: 'Icon must be a string' })
  readonly icon: string;
}
