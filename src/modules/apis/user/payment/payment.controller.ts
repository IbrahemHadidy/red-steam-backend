import { Body, Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest as Request } from 'fastify';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { VerifiedUserGuard } from '@guards/verified-user.guard';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { PaymentService } from '@apis/user/payment/payment.service';

// importing dtos
import { CreateOrderDto } from '@apis/user/payment/dtos/create-order.dto';
import { CaptureOrderDto } from '@apis/user/payment/dtos/capture-order.dto';

// importing swagger descriptors
import { createOrderDescriptor } from "@apis/user/payment/api-descriptors/create-order.descriptor";
import { captureOrderDescriptor } from '@apis/user/payment/api-descriptors/capture-order.descriptor';

@Controller('user/payment')
@ApiTags('User Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiDescriptor(createOrderDescriptor)
  @UseGuards(JwtAccessAuthGuard, VerifiedUserGuard)
  @Post('order/create')
  @HttpCode(201)
  async createOrder(@Req() request: Request, @Body() bodyData: CreateOrderDto) {
    const data = {
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
    const data = {
      ...bodyData,
      userId: request['userId'],
    };
    const result = await this.paymentService.captureOrder(data);

    // Send the response
    return result;
  }
}