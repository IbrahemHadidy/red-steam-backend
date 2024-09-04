// Class-validator
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class DeleteAccountDto {
  @ApiProperty({ description: 'user password', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Password is not strong enough.' },
  )
  password: string;
}
