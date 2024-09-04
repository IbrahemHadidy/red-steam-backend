// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getAllDevelopersDescriptor: ApiDescriptorOptions = {
  summary: 'Get All Developers',
  description: 'Get all developers',
  responses: [
    {
      status: 200,
      description: 'Developers returned successfully',
    },
    {
      status: 404,
      description: 'No developers found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
