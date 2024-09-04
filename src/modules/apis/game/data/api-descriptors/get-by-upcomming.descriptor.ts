// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByUpcommingDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Upcomming',
  description: 'Get games by upcomming',
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
