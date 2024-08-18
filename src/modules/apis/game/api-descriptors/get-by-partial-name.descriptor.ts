import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const getByPartialNameDescriptor: ApiDescriptorOptions = {
  summary: 'Get Games By Partial Name',
  description: 'Returns an array of games by partial name',
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
  parameters: [
    {
      name: 'partialName',
      type: String,
      description: 'The partial name of the games to retrieve',
    },
  ],
};
