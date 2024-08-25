import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { ForgotPasswordDto } from '@apis/user/management/dtos/forgot-password.dto';

export const forgotPasswordDescriptor: ApiDescriptorOptions = {
  summary: 'Forgot Password',
  description: 'Sends an email to reset the password',
  responses: [
    {
      status: 200,
      description: 'Email sent successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  body: {
    type: ForgotPasswordDto,
  },
};