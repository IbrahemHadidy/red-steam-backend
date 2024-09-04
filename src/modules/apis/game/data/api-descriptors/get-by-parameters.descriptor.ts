// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByParametersDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Parameters',
  description: 'Returns games based on the parameters',
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
      name: 'sortBy',
      type: String,
      enum: ['relevance', 'name', 'lowestPrice', 'highestPrice', 'releaseDate', 'reviews'],
      required: false,
      description: 'Sort by relevance, name, lowestPrice, highestPrice, releaseDate, reviews',
    },
    {
      name: 'partialName',
      type: String,
      required: false,
      description: 'Partial name of the games',
    },
    {
      name: 'maxPrice',
      type: Number,
      required: false,
      description: 'Maximum price of the games',
    },
    {
      name: 'tags',
      type: [Number],
      required: false,
      description: 'Tags of the games',
    },
    {
      name: 'excludeTags',
      type: [Number],
      required: false,
      description: 'Excluded tags of the games',
    },
    {
      name: 'paid',
      type: Boolean,
      required: false,
      description: 'Paid games only',
    },
    {
      name: 'offers',
      type: Boolean,
      required: false,
      description: 'Offers only',
    },
    {
      name: 'platforms',
      type: [String],
      enum: ['win', 'mac'],
      required: false,
      description: 'Platforms of the games',
    },
    {
      name: 'publishers',
      type: [Number],
      required: false,
      description: 'Publishers of the games',
    },
    {
      name: 'developers',
      type: [Number],
      required: false,
      description: 'Developers of the games',
    },
    {
      name: 'features',
      type: [Number],
      required: false,
      description: 'Features of the games',
    },
    {
      name: 'featured',
      type: Boolean,
      required: false,
      description: 'Featured games only',
    },
    {
      name: 'excludeMature',
      type: Boolean,
      required: false,
      description: 'Exclude mature content',
    },
    {
      name: 'excludedGames',
      type: [Number],
      required: false,
      description: 'Excluded games',
    },
    {
      name: 'upcomingMode',
      type: String,
      enum: ['exclude', 'upcomingOnly'],
      required: false,
    },
    {
      name: 'offset',
      type: Number,
      required: false,
      description: 'Get games after this offset',
    },
    {
      name: 'limit',
      type: Number,
      required: false,
      description: 'The number of games to return',
    },
  ],
};
