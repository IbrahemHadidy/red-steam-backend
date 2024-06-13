import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { ChangeEmailDto } from '@apis/user/management/dtos/change-email.dto';

export const changeEmailDescriptor: ApiDescriptorOptions = {
  summary: 'Change Country',
  description: 'Changes the user country',
  responses: [
    {
      status: 201,
      description: 'Email changed successfully',
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
    type: ChangeEmailDto,
  },
};
