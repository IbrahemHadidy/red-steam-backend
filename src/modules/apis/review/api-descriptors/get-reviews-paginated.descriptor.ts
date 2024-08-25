import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getReviewsPaginatedDescriptor: ApiDescriptorOptions = {
  summary: 'Get Reviews Paginated',
  description: 'Get reviews paginated with optional filtering',
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
      name: 'searchBy',
      type: String,
      required: false,
      description: 'The search by field',
    },
    {
      name: 'search',
      type: String,
      required: false,
      description: 'The search query',
    },
  ],
};
