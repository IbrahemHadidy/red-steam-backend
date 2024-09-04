// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteTagDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Tag',
  description: 'Deletes a tag',
  responses: [
    {
      status: 204,
      description: 'Tag deleted successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Unauthorized',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
};
