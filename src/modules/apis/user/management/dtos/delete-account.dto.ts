// Class-validator
import { IsNotEmpty } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class DeleteAccountDto {
  @ApiProperty({ description: 'Current password', example: 'enter password here', required: true })
  @IsNotEmpty({ message: 'Current password is required.' })
  readonly currentPassword: string;
}
