// NestJS
import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';

// Fastify
import { FastifyRequest as Request } from 'fastify';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { VerifiedUserGuard } from '@guards/verified-user.guard';

// Services
import { PaymentService } from '@apis/user/payment/payment.service';

// Body DTOs
import { CaptureOrderDto } from '@apis/user/payment/dtos/capture-order.dto';
import { CreateOrderDto } from '@apis/user/payment/dtos/create-order.dto';

// Swagger descriptors
import { captureOrderDescriptor } from '@apis/user/payment/api-descriptors/capture-order.descriptor';
import { createOrderDescriptor } from '@apis/user/payment/api-descriptors/create-order.descriptor';

@ApiTags('User Payment')
@Controller('user/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiDescriptor(createOrderDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Post('order/create')
  @HttpCode(201)
  async createOrder(@Req() request: Request, @Body() bodyData: CreateOrderDto) {
    const data: CreateOrderDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };
    const result = await this.paymentService.createOrder(data);

    // Send the response
    return result;
  }

  @ApiDescriptor(captureOrderDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Post('order/capture')
  @HttpCode(200)
  async captureOrder(@Req() request: Request, @Body() bodyData: CaptureOrderDto) {
    const data: CaptureOrderDto & { userId: string } = {
      ...bodyData,
      userId: request['userId'],
    };
    const result = await this.paymentService.captureOrder(data);

    // Send the response
    return result;
  }
}
