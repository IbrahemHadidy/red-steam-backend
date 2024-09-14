// Body DTOs
import { CreateLanguageDto } from '@apis/language/dtos/create-language.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const createLanguageDescriptor: ApiDescriptorOptions = {
  summary: 'Create Language',
  description: 'Creates a new language',
  responses: [
    {
      status: 201,
      description: 'Language created successfully',
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
    type: CreateLanguageDto,
  },
  security: ['accessToken'],
};
