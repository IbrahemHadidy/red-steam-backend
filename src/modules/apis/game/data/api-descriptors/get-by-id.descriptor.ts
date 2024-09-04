// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByIdDescriptor: ApiDescriptorOptions = {
  summary: 'Get Game By Id',
  description: 'Returns a game by id',
  responses: [
    {
      status: 200,
      description: 'Game returned successfully',
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
      name: 'id',
      description: 'The id of the game',
      required: true,
      type: Number,
    },
  ],
};
