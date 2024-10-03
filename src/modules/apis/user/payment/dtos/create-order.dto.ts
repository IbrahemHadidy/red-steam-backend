// Class-validator
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Total Price', example: 'enter total price here', required: true })
  @IsNotEmpty({ message: 'totalPrice is required' })
  @IsString({ message: 'totalPrice must be a string' })
  readonly totalPrice: string;

  @ApiProperty({ description: 'Cart Items', example: 'enter items here', required: true })
  @IsNotEmpty({ message: 'cartItems is required' })
  @IsArray({ message: 'cartItems must be an array' })
  @IsNumber({ allowNaN: false }, { each: true, message: 'cartItems must be an array of numbers' })
  readonly cartItems: number[];
}
