import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ description: 'The unique identifier for the user, can be either username or email.', example: 'enter email here', required: true })
  @IsNotEmpty({ message: 'Identifier cannot be empty.' })
  @IsString({ message: 'Identifier must be a string.' })
  email: string;

  @ApiProperty({ description: 'The verification token.', example: 'enter token here', required: true })
  @IsNotEmpty({ message: 'Verification token cannot be empty.' })
  @IsString({ message: 'Verification token must be a string.' })
  token: string;
}
