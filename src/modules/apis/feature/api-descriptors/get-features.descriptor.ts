// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getFeaturesDescriptor: ApiDescriptorOptions = {
  summary: 'Get Features',
  description: 'Get features',
  responses: [
    {
      status: 200,
      description: 'Features returned successfully',
    },
    {
      status: 404,
      description: 'No features found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  parameters: [
    {
      name: 'ids',
      type: [Number],
      required: true,
      description: 'The ids of the features',
    },
  ],
};
