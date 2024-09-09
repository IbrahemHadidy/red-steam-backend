// Body DTOs
import { SignupDto } from '@apis/user/auth/dtos/signup.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const signupDescriptor: ApiDescriptorOptions = {
  summary: 'Register User',
  description: 'Validates and creates a new user',
  responses: [
    {
      status: 201,
      description: 'User created successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 409,
      description: 'User already exists',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  body: {
    type: SignupDto,
  },
};
