// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByOffersDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Offers',
  description: 'Get games by offers',
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
