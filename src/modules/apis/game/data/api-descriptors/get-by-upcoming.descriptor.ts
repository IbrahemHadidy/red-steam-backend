// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByUpcomingDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Upcoming',
  description: 'Get games by upcoming',
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
