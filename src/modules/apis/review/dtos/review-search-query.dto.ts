// Class-validator
import { IsOptional, IsString } from 'class-validator';

export class ReviewQueryDto {
  @IsString({ message: 'Username must be a string' })
  @IsOptional()
  readonly username?: string;

  @IsString({ message: 'Game name must be a string' })
  @IsOptional()
  readonly gameName?: string;

  @IsString({ message: 'Content must be a string' })
  @IsOptional()
  readonly content?: string;
}
