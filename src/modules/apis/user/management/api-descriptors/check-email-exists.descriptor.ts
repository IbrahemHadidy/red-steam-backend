import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const checkEmailExistsDescriptor: ApiDescriptorOptions = {
  summary: 'Check Email Exists',
  description: 'Checks if an email exists',
  responses: [
    {
      status: 200,
      description: 'Email existence state returned successfully',
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
  parameters: [
    {
      name: 'email',
      type: String,
    },
  ],
};
