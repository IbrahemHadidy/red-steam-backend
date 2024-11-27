// Class-validator
import { IsNotEmpty, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUsernameDto {
  @ApiProperty({ description: 'new username', example: 'enter new username here', required: true })
  @IsNotEmpty({ message: 'New username is required' })
  @IsString({ message: 'New username must be a string' })
  readonly newUsername: string;

  @ApiProperty({ description: 'current password', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'Current password is required' })
  readonly currentPassword: string;
}
