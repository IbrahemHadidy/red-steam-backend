// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { UserDto } from '@apis/user/serializer-dtos/user.dto';

// Types
import { UserDto as UserType } from '@apis/user/serializer-dtos/user.dto';

export class NestedDataDto {
  @Expose()
  readonly message: string;

  @Expose()
  readonly isSessionLoggedIn: boolean;

  @Expose()
  @Type(() => UserDto)
  readonly userData: UserType;
}
