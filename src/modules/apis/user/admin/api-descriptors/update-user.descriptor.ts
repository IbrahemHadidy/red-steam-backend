// Body DTOs
import { UpdateUserDto } from '@apis/user/admin/dtos/update-user.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updateUserDescriptor: ApiDescriptorOptions = {
  summary: 'Update User',
  description: 'Updates a user',
  responses: [
    {
      status: 200,
      description: 'User updated successfully',
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
    type: UpdateUserDto,
  },
  security: ['accessToken'],
};
