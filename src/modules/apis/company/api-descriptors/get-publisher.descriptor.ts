import { ApiDescriptorOptions } from "@decorators/api-descriptor.decorator";

export const getPublisherDescriptor: ApiDescriptorOptions = {
  summary: 'Get Publisher',
  description: 'Get publisher',
  responses: [
    {
      status: 200,
      description: 'Publisher returned successfully',
    },
    {
      status: 404,
      description: 'No publisher found',
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
      description: 'The id of the publisher',
    },
  ],
};