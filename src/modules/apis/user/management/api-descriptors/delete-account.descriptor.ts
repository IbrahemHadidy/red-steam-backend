// Body DTOs
import { DeleteAccountDto } from '@apis/user/management/dtos/delete-account.dto';

// Types
import type { ApiDescriptorOptions } from '@decorators/api-descriptor.decorator';

export const deleteAccountDescriptor: ApiDescriptorOptions = {
  summary: 'Delete Account',
  description: 'Deletes the account',
  responses: [
    {
      status: 200,
      description: 'Account deleted successfully',
    },
    {
      status: 500,
      description: 'Internal server error',
    },
  ],
  security: ['access-token'],
  body: {
    type: DeleteAccountDto,
  },
};
