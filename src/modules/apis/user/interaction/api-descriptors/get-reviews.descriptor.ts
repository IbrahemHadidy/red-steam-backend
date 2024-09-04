// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getReviewsDescriptor: ApiDescriptorOptions = {
  summary: 'Get User Reviews',
  description: "Returns the user's reviews",
  responses: [
    {
      status: 200,
      description: 'User reviews retrieved successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Invalid credentials',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
};
