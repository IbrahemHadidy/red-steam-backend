// Class-validator
import { IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
  @IsString({ message: 'Userame must be a string' })
  @IsOptional()
  username?: string;
}
