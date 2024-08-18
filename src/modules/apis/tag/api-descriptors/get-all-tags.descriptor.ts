import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getAllTagsDescriptor: ApiDescriptorOptions = {
  summary: 'Get All Tags',
  description: 'Get all tags',
  responses: [
    {
      status: 200,
      description: 'Tags returned successfully',
    },
    {
      status: 404,
      description: 'No tags found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
