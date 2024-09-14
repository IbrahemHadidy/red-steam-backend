// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const autoLoginDescriptor: ApiDescriptorOptions = {
  summary: 'Auto Login',
  description: 'Checks if the refresh token is still valid and returns the user data with new access token',
  responses: [
    {
      status: 201,
      description: 'User logged in successfully',
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
  security: ['refreshToken'],
};
