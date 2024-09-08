// Class-transformer
import { Expose, Type } from 'class-transformer';

// DTOs
import { UserDto } from '@apis/user/serializer-dtos/user-data.dto';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => UserDto)
  userData: UserDto;
}
