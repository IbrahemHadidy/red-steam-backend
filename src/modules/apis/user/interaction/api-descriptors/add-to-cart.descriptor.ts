// DTOs
import { AddToCartDto } from '@apis/user/interaction/dtos/add-to-cart.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const addToCartDescriptor: ApiDescriptorOptions = {
  summary: 'Add Items to Cart',
  description: "Adds items to the user's cart",
  responses: [
    {
      status: 200,
      description: 'Items added to cart successfully',
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
    type: AddToCartDto,
  },
};
