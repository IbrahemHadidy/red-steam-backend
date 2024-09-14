// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteFeatureDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Feature',
  description: 'Deletes a feature',
  responses: [
    {
      status: 200,
      description: 'Feature deleted successfully',
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
  security: ['accessToken'],
};
