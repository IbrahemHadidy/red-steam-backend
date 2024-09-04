// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getGameReviewsDescriptor: ApiDescriptorOptions = {
  summary: 'Get Game Reviews',
  description: 'Get game reviews',
  responses: [
    {
      status: 200,
      description: 'Reviews returned successfully',
    },
    {
      status: 404,
      description: 'No reviews found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  parameters: [
    {
      name: 'gameId',
      type: String,
      required: true,
      description: 'The id of the game',
    },
  ],
  queries: [
    {
      name: 'filter',
      type: String,
      required: true,
      description: 'The filter to apply',
    },
    {
      name: 'sort',
      type: String,
      required: true,
      description: 'The sort to apply',
    },
    {
      name: 'offset',
      type: String,
      required: true,
      description: 'The offset to apply',
    },
    {
      name: 'limit',
      type: String,
      required: true,
      description: 'The limit to apply',
    },
  ],
};