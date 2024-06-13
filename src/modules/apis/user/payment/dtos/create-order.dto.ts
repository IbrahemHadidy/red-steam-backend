import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Total Price', example: 'enter total price here', required: true })
  @IsNotEmpty({ message: 'totalPrice is required' })
  @IsNumber({}, { message: 'totalPrice must be a number' })
  totalPrice: number;

  @ApiProperty({ description: 'Cart Items', example: 'enter items here', required: true })
  @IsNotEmpty({ message: 'cartItems is required' })
  @IsArray({ message: 'cartItems must be an array' })
  @IsNumber({}, { each: true })
  cartItems: number[];
}
