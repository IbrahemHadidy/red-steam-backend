import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { UpdateFeatureDto } from '@apis/feature/dtos/update-feature.dto';

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
