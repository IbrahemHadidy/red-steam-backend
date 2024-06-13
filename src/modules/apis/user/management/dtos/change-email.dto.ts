import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangeEmailDto {
  @ApiProperty({ description: 'Current email', example: 'enter current email here', required: true })
  @IsNotEmpty({ message: 'currentEmail is required' })
  @IsString({ message: 'Invalid current email' })
  currentEmail: string;

  @ApiProperty({ description: 'New email', example: 'enter new email here', required: true })
  @IsNotEmpty({ message: 'newEmail is required' })
  @IsEmail({}, { message: 'Invalid new email' })
  newEmail: string;

  @ApiProperty({ description: 'Strong password', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'password is required' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 },
    { message: 'Invalid password.' },
  )
  password: string;
}
