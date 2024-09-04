// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const uploadAvatarDescriptor: ApiDescriptorOptions = {
  summary: 'Upload User Avatar',
  description: 'Uploads the user avatar',
  responses: [
    {
      status: 200,
      description: 'User avatar uploaded successfully',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
  consumes: ['multipart/form-data'],
};
