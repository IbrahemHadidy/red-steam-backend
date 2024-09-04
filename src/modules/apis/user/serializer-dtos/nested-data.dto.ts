// Class-transformer
import { Expose, Type } from 'class-transformer';

// DTOs
import { UserDataDto } from '@apis/user/serializer-dtos/user-data.dto';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => UserDataDto)
  userData: UserDataDto;
}
