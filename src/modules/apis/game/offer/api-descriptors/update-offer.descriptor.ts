import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { UpdateOfferDto } from '@apis/game/offer/dtos/update-offer.dto';
export const updateOfferDescriptor: ApiDescriptorOptions = {
  summary: 'Update Offer',
  description: 'Updates a new offer',
  responses: [
    {
      status: 201,
      description: 'Offer updated successfully',
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
  body: {
    type: UpdateOfferDto,
  },
  security: ['access-token'],
};
