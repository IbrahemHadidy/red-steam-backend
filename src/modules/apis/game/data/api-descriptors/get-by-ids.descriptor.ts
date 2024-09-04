// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByIdsDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Ids',
  description: 'Returns an array of game by ids',
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
  parameters: [
    {
      name: 'ids',
      description: 'The ids of the games',
      required: true,
      type: Array,
    },
  ],
};
