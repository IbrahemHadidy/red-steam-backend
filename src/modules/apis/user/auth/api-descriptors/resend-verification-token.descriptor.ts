import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { ResendRegisterTokenDto } from '@apis/user/auth/dtos/resend-register-token.dto';

export const resendVerificationTokenDescriptor: ApiDescriptorOptions = {
  summary: 'Resend Verification Token',
  description: 'Resends verification token',
  responses: [
    {
      status: 200,
      description: 'Verification token sent successfully',
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
    type: ResendRegisterTokenDto,
  },
};
