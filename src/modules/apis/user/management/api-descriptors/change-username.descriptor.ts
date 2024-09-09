// Body DTOs
import { ChangeUsernameDto } from '@apis/user/management/dtos/change-username.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const changeUsernameDescriptor: ApiDescriptorOptions = {
  summary: 'Change Username',
  description: 'Changes the user username',
  responses: [
    {
      status: 201,
      description: 'Username changed successfully',
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
  body: {
    type: ChangeUsernameDto,
  },
};
