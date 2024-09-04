// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getTagsDescriptor: ApiDescriptorOptions = {
  summary: 'Get User Tags',
  description: "Get the tags of a user's items",
  responses: [
    {
      status: 200,
      description: 'User tags returned successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Invalid credentials',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
};
