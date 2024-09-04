// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getAllLanguagesDescriptor: ApiDescriptorOptions = {
  summary: 'Get All Languages',
  description: 'Get all languages',
  responses: [
    {
      status: 200,
      description: 'languages returned successfully',
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
};
