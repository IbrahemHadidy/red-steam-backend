import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteUserDescriptor: ApiDescriptorOptions = {
  summary: 'Delete User',
  description: 'Deletes a user',
  responses: [
    {
      status: 204,
      description: 'User deleted successfully',
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
  security: ['access-token'],
};
