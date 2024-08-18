import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { CreatePublisherDto } from '@apis/company/dtos/create-publisher.dto';

export const createPublisherDescriptor: ApiDescriptorOptions = {
  summary: 'Create Publisher',
  description: 'Creates a new publisher',
  responses: [
    {
      status: 201,
      description: 'Publisher created successfully',
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
    type: CreatePublisherDto,
  },
  security: ['access-token'],
};
