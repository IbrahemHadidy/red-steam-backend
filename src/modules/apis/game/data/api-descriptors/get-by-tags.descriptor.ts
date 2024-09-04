// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByTagsDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Tags',
  description: 'Get games by tags',
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
      name: 'tags',
      type: [Number],
      required: false,
      description: 'Tags of the games',
    },
    {
      name: 'limit',
      type: Number,
      required: false,
      description: 'The number of games to return',
    },
  ],
};
