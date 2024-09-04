// DTOs
import { PasswordResetDto } from '@apis/user/management/dtos/password-reset.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const passwordResetDescriptor: ApiDescriptorOptions = {
  summary: 'Submit Password Reset',
  description: 'Submits a password reset request',
  responses: [
    {
      status: 200,
      description: 'Password reset request submitted successfully',
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
    type: PasswordResetDto,
  },
};
