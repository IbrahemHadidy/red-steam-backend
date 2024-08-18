import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getBySpecialsDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Top Sales',
  description: 'Get games by top sales',
  responses: [
    {
      status: 200,
      description: 'Games returned successfully',
    },
    {
      status: 404,
      description: 'No games found',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
