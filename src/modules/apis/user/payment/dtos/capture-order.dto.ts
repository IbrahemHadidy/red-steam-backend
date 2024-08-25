import { IsNotEmpty, IsNumber, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CaptureOrderDto {
  @ApiProperty({ description: 'Order ID', example: 'enter user uuid here here', required: true })
  @IsNotEmpty({ message: 'orderId is required' })
  @IsString({ message: 'orderId must be a string' })
  orderId: string;

  @ApiProperty({ description: 'Cart Items', example: 'enter items here', required: true })
  @IsNotEmpty({ message: 'cartItems is required' })
  @IsArray({ message: 'cartItems must be an array' })
  @IsNumber({}, { each: true })
  cartItems: number[];
}