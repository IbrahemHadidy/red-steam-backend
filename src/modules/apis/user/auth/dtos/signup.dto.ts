// Class-validator
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ description: 'username', example: 'enter username here', required: true })
  @IsNotEmpty({ message: 'Please enter a username' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'email', example: 'enter email here', required: true })
  @IsNotEmpty({ message: 'Please enter an email' })
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty({ description: 'password', example: 'enter strong password here', required: true })
  @IsNotEmpty({ message: 'Please enter a password' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Password is too weak' },
  )
  password: string;

  @ApiProperty({ description: 'country code', maxLength: 2, minLength: 2, example: 'PS', required: true })
  @IsNotEmpty({ message: 'Please enter a country code' })
  @IsString({ message: 'Invalid country code' })
  country: string;
}
