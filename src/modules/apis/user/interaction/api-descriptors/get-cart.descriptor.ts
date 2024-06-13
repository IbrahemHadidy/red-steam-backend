import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getCartDescriptor: ApiDescriptorOptions = {
  summary: 'Get User Cart',
  description: "Returns the user's cart",
  responses: [
    {
      status: 200,
      description: 'User cart retrieved successfully',
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
