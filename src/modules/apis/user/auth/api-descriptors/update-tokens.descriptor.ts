// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updateTokensDescriptor: ApiDescriptorOptions = {
  summary: 'Update Tokens',
  description: 'Updates the access and refresh tokens',
  responses: [
    {
      status: 200,
      description: 'Tokens updated successfully',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['refreshToken', 'accessToken'],
};
