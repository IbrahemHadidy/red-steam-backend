// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getLanguagesDescriptor: ApiDescriptorOptions = {
  summary: 'Get Languages',
  description: 'Get languages',
  responses: [
    {
      status: 200,
      description: 'Languages returned successfully',
    },
    {
      status: 404,
      description: 'No languages found',
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
      description: 'The ids of the languages',
    },
  ],
};
