import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { ChangePasswordDto } from '@apis/user/management/dtos/change-password.dto';

export const changePasswordDescriptor: ApiDescriptorOptions = {
  summary: 'Change Password',
  description: 'Changes the user password',
  responses: [
    {
      status: 201,
      description: 'Password changed successfully',
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
    type: ChangePasswordDto,
  },
};
