// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { UserDto } from '@apis/user/serializer-dtos/user.dto';

// Types
import type { UserDto as UserType } from '@apis/user/serializer-dtos/user.dto';

export class PaginatedUsersDataDto {
  @Expose()
  @Type(() => UserDto)
  readonly items: UserType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
