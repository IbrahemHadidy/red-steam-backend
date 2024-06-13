import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { ChangeCountryDto } from '@apis/user/management/dtos/change-country.dto';

export const changeCountryDescriptor: ApiDescriptorOptions = {
  summary: 'Change Country',
  description: 'Changes the user country',
  responses: [
    {
      status: 201,
      description: 'Country changed successfully',
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
  body: {
    type: ChangeCountryDto,
  },
};
