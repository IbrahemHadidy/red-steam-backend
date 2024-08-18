import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { UpdateTagDto } from '@apis/tag/dtos/update-tag.dto';

export const updateTagDescriptor: ApiDescriptorOptions = {
  summary: 'Update Tag',
  description: 'Updates a Tag',
  responses: [
    {
      status: 200,
      description: 'Tag updated successfully',
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
    type: UpdateTagDto,
  },
  security: ['access-token'],
};
