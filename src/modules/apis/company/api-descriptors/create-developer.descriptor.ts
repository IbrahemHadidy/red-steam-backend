// Body DTOs
import { CreateDeveloperDto } from '@apis/company/dtos/create-developer.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const createDeveloperDescriptor: ApiDescriptorOptions = {
  summary: 'Create Developer',
  description: 'Creates a new developer',
  responses: [
    {
      status: 201,
      description: 'Developer created successfully',
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
    type: CreateDeveloperDto,
  },
  security: ['accessToken'],
};
