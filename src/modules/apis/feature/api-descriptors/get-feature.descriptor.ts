import { ApiDescriptorOptions } from "@decorators/api-descriptor.decorator";

export const getFeatureDescriptor: ApiDescriptorOptions = {
  summary: 'Get Feature',
  description: 'Get feature',
  responses: [
    {
      status: 200,
      description: 'Feature returned successfully',
    },
    {
      status: 404,
      description: 'No feature found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  parameters: [
    {
      name: 'id',
      type: Number,
      required: true,
      description: 'The id of the feature',
    },
  ],
};