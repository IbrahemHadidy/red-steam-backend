// Class-validator
import { IsOptional, IsString } from 'class-validator';

export class PublisherQueryDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Website must be a string' })
  @IsOptional()
  website?: string;
}
