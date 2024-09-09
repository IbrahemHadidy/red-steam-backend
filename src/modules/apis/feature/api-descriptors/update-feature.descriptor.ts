// Body DTOs
import { UpdateFeatureDto } from '@apis/feature/dtos/update-feature.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updateFeatureDescriptor: ApiDescriptorOptions = {
  summary: 'Update Feature',
  description: 'Updates a feature',
  responses: [
    {
      status: 200,
      description: 'Feature updated successfully',
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
    type: UpdateFeatureDto,
  },
  security: ['access-token'],
};
