import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeCountryDto {
  @ApiProperty({ description: 'new country', example: 'PS', required: true, minLength: 2, maxLength: 2 })
  @IsNotEmpty({ message: 'newCountry is required' })
  @IsString({ message: 'New country must be a string' })
  newCountry: string;
}
