// DTOs
import { AddToLibraryDto } from '@apis/user/interaction/dtos/add-to-library.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const addToLibraryDescriptor: ApiDescriptorOptions = {
  summary: 'Add Items To Library',
  description: "Adds items to the user's library",
  responses: [
    {
      status: 200,
      description: 'Items added to library successfully',
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
    type: AddToLibraryDto,
  },
};
