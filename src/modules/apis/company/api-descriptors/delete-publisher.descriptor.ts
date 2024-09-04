// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deletePublisherDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Publisher',
  description: 'Deletes a publisher',
  responses: [
    {
      status: 204,
      description: 'Publisher deleted successfully',
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
