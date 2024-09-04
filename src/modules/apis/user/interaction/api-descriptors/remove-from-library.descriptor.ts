// DTOs
import { RemoveFromLibraryDto } from '@apis/user/interaction/dtos/remove-from-library.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const removeFromLibraryDescriptor: ApiDescriptorOptions = {
  summary: 'Remove Items From Library',
  description: "Removes items from the user's library",
  responses: [
    {
      status: 200,
      description: 'Items removed from library successfully',
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
  body: { type: RemoveFromLibraryDto, required: false },
};
