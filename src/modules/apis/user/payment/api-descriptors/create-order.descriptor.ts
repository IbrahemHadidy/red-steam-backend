import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { CreateOrderDto } from '@apis/user/payment/dtos/create-order.dto';

export const createOrderDescriptor: ApiDescriptorOptions = {
  summary: 'Create Order',
  description: 'Creates an order',
  responses: [
    {
      status: 200,
      description: 'Order created successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Invalid credentials',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
  body: {
    type: CreateOrderDto,
  },
};
