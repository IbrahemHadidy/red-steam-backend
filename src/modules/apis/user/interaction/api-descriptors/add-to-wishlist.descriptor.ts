// Body DTOs
import { AddToWishlistDto } from '@apis/user/interaction/dtos/add-to-wishlist.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const addToWishlistDescriptor: ApiDescriptorOptions = {
  summary: 'Add Items to Wishlist',
  description: "Adds items to the user's wishlist",
  responses: [
    {
      status: 200,
      description: 'Items added to wishlist successfully',
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
    type: AddToWishlistDto,
  },
};
