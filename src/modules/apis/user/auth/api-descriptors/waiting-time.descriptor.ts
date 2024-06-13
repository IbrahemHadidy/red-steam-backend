import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const waitingTimeDescriptor: ApiDescriptorOptions = {
  summary: 'Get Waiting Time',
  description: 'Returns the waiting time',
  responses: [
    {
      status: 200,
      description: 'Waiting time returned successfully',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
};
