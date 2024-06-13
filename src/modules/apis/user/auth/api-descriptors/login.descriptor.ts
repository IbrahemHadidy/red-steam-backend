import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { LoginDto } from '@apis/user/auth/dtos/login.dto';

export const loginDescriptor: ApiDescriptorOptions = {
  summary: 'Login User',
  description: 'Validates user credentials and returns user data with access token and refresh token',
  responses: [
    {
      status: 201,
      description: 'User logged in successfully',
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
  body: {
    type: LoginDto,
  },
};
