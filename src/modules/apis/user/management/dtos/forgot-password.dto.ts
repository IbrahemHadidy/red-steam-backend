// Class-validator
import { IsNotEmpty, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'Email', example: 'enter your email here', required: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  readonly email: string;

  @ApiProperty({ description: 'The recaptcha token.', example: 'TEST_TOKEN', required: true })
  @IsNotEmpty({ message: 'Recaptcha token is required.' })
  @IsString({ message: 'Recaptcha token must be a string.' })
  readonly recaptchaToken: string;
}
