import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const verificationStatusDescriptor: ApiDescriptorOptions = {
  summary: 'Get Verification Status',
  description: 'Returns the verification status',
  responses: [
    {
      status: 200,
      description: 'Verification status returned successfully',
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
};