// Body DTOs
import { ChangeTagsDto } from '@apis/user/interaction/dtos/change-tags.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const changeTagsDescriptor: ApiDescriptorOptions = {
  summary: 'Change User Tags',
  description: 'Changes the user tags',
  responses: [
    {
      status: 200,
      description: 'User tags changed successfully',
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
    type: ChangeTagsDto,
  },
};
