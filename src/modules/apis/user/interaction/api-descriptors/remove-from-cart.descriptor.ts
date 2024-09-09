// Body DTOs
import { RemoveFromCartDto } from '@apis/user/interaction/dtos/remove-from-cart.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const removeFromCartDescriptor: ApiDescriptorOptions = {
  summary: 'Remove Items from Cart',
  description: "Removes items from the user's cart",
  responses: [
    {
      status: 200,
      description: 'Items removed from cart successfully',
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
  body: { type: RemoveFromCartDto, required: false },
};
