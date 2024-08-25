import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { VerifyEmailDto } from '@apis/user/auth/dtos/verify-email.dto';

export const verifyEmailDescriptor: ApiDescriptorOptions = {
  summary: 'Verify Email',
  description: 'Verifies email',
  responses: [
    {
      status: 200,
      description: 'Email verified successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Invalid verification token',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  body: {
    type: VerifyEmailDto,
  },
};