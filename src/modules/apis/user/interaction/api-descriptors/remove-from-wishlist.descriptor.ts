// DTOs
import { RemoveFromWishlistDto } from '@apis/user/interaction/dtos/remove-from-wishlist.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const removeFromWishlistDescriptor: ApiDescriptorOptions = {
  summary: 'Remove Items from Wishlist',
  description: "Removes items from the user's wishlist",
  responses: [
    {
      status: 200,
      description: 'Items removed from wishlist successfully',
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
  body: { type: RemoveFromWishlistDto, required: false },
};
