// Class-validator
import { IsOptional, IsString } from 'class-validator';

export class OfferQueryDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  readonly name?: string;
}
