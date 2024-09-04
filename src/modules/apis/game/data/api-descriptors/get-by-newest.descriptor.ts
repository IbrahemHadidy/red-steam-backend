// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByNewestDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Newest',
  description: 'Get games by newest',
  responses: [
    {
      status: 200,
      description: 'Games returned successfully',
    },
    {
      status: 404,
      description: 'No games found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
