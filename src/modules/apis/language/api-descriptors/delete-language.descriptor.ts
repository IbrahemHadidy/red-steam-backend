import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteLanguageDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Language',
  description: 'Deletes a language',
  responses: [
    {
      status: 204,
      description: 'Language deleted successfully',
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
  security: ['access-token'],
};
