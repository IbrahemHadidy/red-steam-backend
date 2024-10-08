// Body DTOs
import { CreateGameDto } from '@apis/game/admin/dtos/create-game.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const createGameDescriptor: ApiDescriptorOptions = {
  summary: 'Create Game',
  description: 'Creates a new game',
  responses: [
    {
      status: 201,
      description: 'Game created successfully',
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
    type: CreateGameDto,
  },
  security: ['accessToken'],
};
