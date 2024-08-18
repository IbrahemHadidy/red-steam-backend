import { ApiDescriptorOptions } from "@decorators/api-descriptor.decorator";

export const getPublishersDescriptor: ApiDescriptorOptions = {
  summary: 'Get Publishers',
  description: 'Get publishers',
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
  parameters: [
    {
      name: 'ids',
      type: [Number],
      required: true,
      description: 'The ids of the publishers',
    },
  ],
};