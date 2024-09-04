// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getWishlistDescriptor: ApiDescriptorOptions = {
  summary: 'Get User Wishlist',
  description: "Returns the user's wishlist",
  responses: [
    {
      status: 200,
      description: 'User wishlist retrieved successfully',
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
};
