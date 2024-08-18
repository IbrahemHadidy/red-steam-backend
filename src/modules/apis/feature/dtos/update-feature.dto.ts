import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeatureDto {
  @ApiProperty({ example: 'Feature Name', description: 'Feature of the Tag', required: false })
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @ApiProperty({ example: 'Feature icon', description: 'Icon of the Feature', required: false })
  @IsString({ message: 'Icon must be a string' })
  icon?: string;
}
