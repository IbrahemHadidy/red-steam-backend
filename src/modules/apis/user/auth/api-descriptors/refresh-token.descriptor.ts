// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const refreshTokenDescriptor: ApiDescriptorOptions = {
  summary: 'Refresh Access Token',
  description: 'Checks if the refresh token is still valid and returns a new access token',
  responses: [
    {
      status: 201,
      description: 'Access token refreshed successfully',
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
