// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const logoutDescriptor: ApiDescriptorOptions = {
  summary: 'Logout User',
  description: 'Logs out a user',
  responses: [
    {
      status: 200,
      description: 'Logout successful',
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
  security: ['refresh-token', 'access-token'],
};
