// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteReviewDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Review',
  description: 'Deletes a review',
  responses: [
    {
      status: 204,
      description: 'Review deleted successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Unauthorized',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
};
