import { IsBoolean, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The unique identifier for the user, can be either username or email.', example: 'enter username or email here', required: true })
  @IsNotEmpty({ message: 'Identifier is required.' })
  @IsString({ message: 'Identifier must be a string.' })
  identifier: string;

  @ApiProperty({ description: 'The password of the user account.', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Invalid password.' },
  )
  password: string;

  @ApiProperty({ description: 'Whether to remember the user on this device.', required: true })
  @IsNotEmpty({ message: 'Remember me is required.' })
  @IsBoolean()
  rememberMe: boolean;
}
