import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'The username of email to verify.',
    example: 'enter username here',
    required: true,
  })
  @IsNotEmpty({ message: 'username cannot be empty.' })
  @IsString({ message: 'username must be a string.' })
  username: string;

  @ApiProperty({ description: 'The verification token.', example: 'enter token here', required: true })
  @IsNotEmpty({ message: 'Verification token cannot be empty.' })
  @IsString({ message: 'Verification token must be a string.' })
  token: string;
}
