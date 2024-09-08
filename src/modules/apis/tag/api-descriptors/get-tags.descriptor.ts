// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getTagsDescriptor: ApiDescriptorOptions = {
  summary: 'Get Tags',
  description: 'Get tags',
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
  parameters: [
    {
      name: 'ids',
      type: String,
      required: true,
      description: 'The ids of the tags comma separated',
    },
  ],
};
