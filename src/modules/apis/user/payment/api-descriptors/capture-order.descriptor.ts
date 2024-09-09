// Body DTOs
import { CaptureOrderDto } from '@apis/user/payment/dtos/capture-order.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const captureOrderDescriptor: ApiDescriptorOptions = {
  summary: 'Capture Order',
  description: 'Captures an order',
  responses: [
    {
      status: 200,
      description: 'Order captured successfully',
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
    type: CaptureOrderDto,
  },
};
