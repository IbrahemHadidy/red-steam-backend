import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { CreateTagDto } from '@apis/tag/dtos/create-tag.dto';

export const createTagDescriptor: ApiDescriptorOptions = {
  summary: 'Create Tag',
  description: 'Creates a new tag',
  responses: [
    {
      status: 201,
      description: 'Tag created successfully',
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
    type: CreateTagDto,
  },
  security: ['access-token'],
}