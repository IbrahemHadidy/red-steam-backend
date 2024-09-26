// Class-validator
import { IsOptional, IsString } from 'class-validator';

export class LanguageQueryDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  readonly name?: string;
}
