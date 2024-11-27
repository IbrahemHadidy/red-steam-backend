// Class-validator
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailDto {
  @ApiProperty({ description: 'Current email', example: 'enter current email here', required: true })
  @IsNotEmpty({ message: 'currentEmail is required' })
  @IsString({ message: 'Invalid current email' })
  readonly currentEmail: string;

  @ApiProperty({ description: 'New email', example: 'enter new email here', required: true })
  @IsNotEmpty({ message: 'newEmail is required' })
  @IsEmail({}, { message: 'Invalid new email' })
  readonly newEmail: string;

  @ApiProperty({ description: 'Current password', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'Current password is required' })
  readonly currentPassword: string;
}
