// Body DTOs
import { UpdateGameDto } from '@apis/game/admin/dtos/update-game.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const updateGameDescriptor: ApiDescriptorOptions = {
  summary: 'Update Game',
  description: 'Updates a new game',
  responses: [
    {
      status: 200,
      description: 'Game updated successfully',
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
    type: UpdateGameDto,
  },
  security: ['accessToken'],
};
