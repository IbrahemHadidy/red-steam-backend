// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getPublishersPaginatedDescriptor: ApiDescriptorOptions = {
  summary: 'Get Publishers Paginated',
  description: 'Get publishers paginated with optional filtering',
  responses: [
    {
      status: 200,
      description: 'Publishers returned successfully',
    },
    {
      status: 404,
      description: 'No publishers found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  queries: [
    {
      name: 'page',
      type: Number,
      required: true,
      description: 'The page number',
    },
    {
      name: 'limit',
      type: Number,
      required: true,
      description: 'The number of items per page',
    },
    {
      name: 'orderBy',
      type: String,
      required: true,
      description: 'The order by field',
    },
    {
      name: 'order',
      type: String,
      required: true,
      description: 'The order direction',
    },
    {
      name: 'searchQuery',
      type: String,
      required: false,
      description: 'The search query',
    },
  ],
};
