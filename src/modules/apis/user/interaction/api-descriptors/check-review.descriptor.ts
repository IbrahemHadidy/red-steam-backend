// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const checkReviewDescriptor: ApiDescriptorOptions = {
  summary: 'Check Review',
  description: 'Checks if a user has reviewed a game',
  responses: [
    {
      status: 200,
      description: 'Review found',
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
  security: ['accessToken'],
};
