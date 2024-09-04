// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteGameDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Game',
  description: 'Delete a game',
  responses: [
    {
      status: 200,
      description: 'Game deleted successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
};
