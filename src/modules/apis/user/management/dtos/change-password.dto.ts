// Class-validator
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: 'current password', example: 'enter current password here', required: true })
  @IsNotEmpty({ message: 'Current password is required' })
  @IsString({ message: 'Current password must be a string' })
  readonly currentPassword: string;

  @ApiProperty({ description: 'new password', example: 'enter new password here', required: true })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString({ message: 'New password must be a string' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Password is not strong enough.' },
  )
  readonly newPassword: string;
}
