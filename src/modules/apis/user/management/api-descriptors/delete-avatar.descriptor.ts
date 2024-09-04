// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteAvatarDescriptor: ApiDescriptorOptions = {
  summary: 'Delete User Avatar',
  description: 'Deletes the user avatar',
  responses: [
    {
      status: 200,
      description: 'User avatar deleted successfully',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
};
