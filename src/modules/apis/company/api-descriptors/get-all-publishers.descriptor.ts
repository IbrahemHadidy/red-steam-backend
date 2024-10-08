// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getAllPublishersDescriptor: ApiDescriptorOptions = {
  summary: 'Get All Publishers',
  description: 'Get all publishers',
  responses: [
    {
      status: 200,
      description: 'Publishers returned successfully',
    },
    {
      status: 404,
      description: 'No publishers found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
