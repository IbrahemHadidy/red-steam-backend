// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { UserDto } from '@apis/user/serializer-dtos/user.dto';

// Types
import type { UserDto as UserDtoType } from '@apis/user/serializer-dtos/user.dto';

export class PaginatedUsersDataDto {
  @Expose()
  @Type(() => UserDto)
  items: UserDtoType;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}
