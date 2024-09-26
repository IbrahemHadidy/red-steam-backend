// Class-validator
import { IsNotEmpty, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'Email', example: 'enter your email here', required: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  readonly email: string;
}
