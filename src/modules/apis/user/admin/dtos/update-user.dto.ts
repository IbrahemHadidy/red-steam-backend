// Class-validator
import { IsBoolean } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'true', description: 'The user is an administrator or not' })
  @IsBoolean({ message: 'isAdmin must be a boolean' })
  isAdmin: boolean;

  @ApiProperty({ example: 'false', description: 'The user is verified or not' })
  @IsBoolean({ message: 'isVerified must be a boolean' })
  isVerified: boolean;
}
