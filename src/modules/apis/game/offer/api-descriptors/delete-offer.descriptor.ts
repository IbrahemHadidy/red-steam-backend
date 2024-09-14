// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteOfferDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Offer',
  description: 'Delete a offer',
  responses: [
    {
      status: 200,
      description: 'Offer deleted successfully',
    },
    {
      status: 400,
      description: 'Invalid parameters',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['accessToken'],
};
