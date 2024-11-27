// Class-validator
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @ApiProperty({ description: 'Password reset token', example: 'enter your token here', required: true })
  @IsNotEmpty({ message: 'Token is required' })
  @IsString({ message: 'Token must be a string' })
  readonly token: string;

  @ApiProperty({ description: 'New password', example: 'enter your new password here', required: true })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString({ message: 'New password must be a string' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Password is not strong enough.' },
  )
  readonly newPassword: string;
}
