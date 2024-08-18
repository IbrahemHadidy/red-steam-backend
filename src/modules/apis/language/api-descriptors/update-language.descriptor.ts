import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { UpdateLanguageDto } from '@apis/language/dtos/update-language.dto';

export const updateLanguageDescriptor: ApiDescriptorOptions = {
  summary: 'Update Language',
  description: 'Updates a language',
  responses: [
    {
      status: 200,
      description: 'Language updated successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 401,
      description: 'Unauthorized',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  body: {
    type: UpdateLanguageDto,
  },
  security: ['access-token'],
};
