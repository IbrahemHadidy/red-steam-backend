import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const checkUsernameExistsDescriptor: ApiDescriptorOptions = {
  summary: 'Check if username exists',
  description: 'Checks if the username already exists',
  responses: [
    {
      status: 200,
      description: 'Username existence state returned successfully',
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
      name: 'username',
      type: String,
    },
  ],
};
