// Body DTOs
import { UpdateReviewDto } from '@apis/user/interaction/dtos/update-review.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updateReviewDescriptor: ApiDescriptorOptions = {
  summary: 'Update Review',
  description: 'Updates a review',
  responses: [
    {
      status: 200,
      description: 'Review updated successfully',
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
  security: ['accessToken'],
  body: {
    type: UpdateReviewDto,
  },
};
