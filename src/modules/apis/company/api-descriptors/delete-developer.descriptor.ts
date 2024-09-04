// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteDeveloperDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Developer',
  description: 'Deletes a developer',
  responses: [
    {
      status: 204,
      description: 'Developer deleted successfully',
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
