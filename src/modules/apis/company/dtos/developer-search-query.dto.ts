// Class-validator
import { IsOptional, IsString } from 'class-validator';

export class DeveloperQueryDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'Website must be a string' })
  @IsOptional()
  readonly website?: string;
}
