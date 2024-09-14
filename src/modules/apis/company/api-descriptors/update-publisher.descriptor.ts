// Body DTOs
import { UpdatePublisherDto } from '@apis/company/dtos/update-publisher.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updatePublisherDescriptor: ApiDescriptorOptions = {
  summary: 'Update Publisher',
  description: 'Updates a publisher',
  responses: [
    {
      status: 200,
      description: 'Publisher updated successfully',
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
  body: {
    type: UpdatePublisherDto,
  },
  security: ['accessToken'],
};
