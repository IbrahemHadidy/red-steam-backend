import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getAllFeaturesDescriptor: ApiDescriptorOptions = {
  summary: 'Get All Features',
  description: 'Get all features',
  responses: [
    {
      status: 200,
      description: 'Features returned successfully',
    },
    {
      status: 404,
      description: 'No features found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
