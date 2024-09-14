// Body DTOs
import { UpdateDeveloperDto } from '@apis/company/dtos/update-developer.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updateDeveloperDescriptor: ApiDescriptorOptions = {
  summary: 'Update Developer',
  description: 'Updates a developer',
  responses: [
    {
      status: 200,
      description: 'Developer updated successfully',
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
    type: UpdateDeveloperDto,
  },
  security: ['accessToken'],
};
