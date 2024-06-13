import { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';
import { ReviewGameDto } from '@apis/user/interaction/dtos/review-game.dto';

export const reviewGameDescriptor: ApiDescriptorOptions = {
  summary: 'Review Game',
  description: 'Reviews a game',
  responses: [
    {
      status: 200,
      description: 'Game reviewed successfully',
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
    type: ReviewGameDto,
  },
};
