import { ApiDescriptorOptions } from "@decorators/api-descriptor.decorator";

export const getLanguageDescriptor: ApiDescriptorOptions = {
  summary: 'Get Language',
  description: 'Get language',
  responses: [
    {
      status: 200,
      description: 'Language returned successfully',
    },
    {
      status: 404,
      description: 'No language found',
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
      description: 'The id of the language',
    },
  ],
};