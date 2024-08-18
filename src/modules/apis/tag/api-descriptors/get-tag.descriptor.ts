import { ApiDescriptorOptions } from "@decorators/api-descriptor.decorator";

export const getTagDescriptor: ApiDescriptorOptions = {
  summary: 'Get Tag',
  description: 'Get tag',
  responses: [
    {
      status: 200,
      description: 'Tags returned successfully',
    },
    {
      status: 404,
      description: 'No tag found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  parameters: [
    {
      name: 'ids',
      type: Number,
      required: true,
      description: 'The id of the tags',
    },
  ],
};