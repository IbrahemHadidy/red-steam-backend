import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResendRegisterTokenDto {
  @ApiProperty({ description: 'Email of the user', example: 'enter email here', required: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({},{ message: 'Please enter a valid email address' })
  email: string;
}