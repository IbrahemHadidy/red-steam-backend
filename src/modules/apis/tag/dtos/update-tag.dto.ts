import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTagDto {
  @ApiProperty({ example: 'Tag Name', description: 'Name of the Tag', required: true })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;
}
