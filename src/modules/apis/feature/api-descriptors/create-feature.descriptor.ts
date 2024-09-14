// Body DTOs
import { CreateFeatureDto } from '@apis/feature/dtos/create-feature.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const createFeatureDescriptor: ApiDescriptorOptions = {
  summary: 'Create Feature',
  description: 'Creates a new feature',
  responses: [
    {
      status: 201,
      description: 'Feature created successfully',
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
    type: CreateFeatureDto,
  },
  security: ['accessToken'],
};
