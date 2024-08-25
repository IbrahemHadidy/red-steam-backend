import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { CreateOfferDto } from '@apis/game/offer/dtos/create-offer.dto';
export const createOfferDescriptor: ApiDescriptorOptions = {
  summary: 'Create Offer',
  description: 'Creates a new offer',
  responses: [
    {
      status: 201,
      description: 'Offer created successfully',
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
    type: CreateOfferDto,
  },
  security: ['access-token'],
};
