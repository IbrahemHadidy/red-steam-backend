import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getFeaturedDescriptor: ApiDescriptorOptions = {
  summary: 'Get Featured Games',
  description: 'Get featured games',
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
  queries: [
    {
      name: 'limit',
      type: Number,
      required: false,
      description: 'The number of games to return',
    },
  ],
};
