// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { UserDto } from '@apis/user/serializer-dtos/user.dto';

// Types
import { UserDto as UserDtoType } from '@apis/user/serializer-dtos/user.dto';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => UserDto)
  userData: UserDtoType;
}
