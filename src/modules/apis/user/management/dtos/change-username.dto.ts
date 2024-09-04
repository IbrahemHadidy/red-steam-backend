// Class-validator
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUsernameDto {
  @ApiProperty({ description: 'new username', example: 'enter new username here', required: true })
  @IsNotEmpty({ message: 'New username is required' })
  @IsString({ message: 'New username must be a string' })
  newUsername: string;

  @ApiProperty({ description: 'current password', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Invalid password' },
  )
  password: string;
}
