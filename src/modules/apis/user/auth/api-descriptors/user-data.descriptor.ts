// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const userDataDescriptor: ApiDescriptorOptions = {
  summary: 'Get User Data',
  description: 'Returns the user data',
  responses: [
    {
      status: 200,
      description: 'User data returned successfully',
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
