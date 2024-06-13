import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getLibraryDescriptor: ApiDescriptorOptions = {
  summary: 'Get User Library',
  description: "Returns the user's library",
  responses: [
    {
      status: 200,
      description: 'User library retrieved successfully',
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
};