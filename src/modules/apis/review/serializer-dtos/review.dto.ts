// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';
import { UserDto } from '@apis/user/serializer-dtos/user.dto';

// Types
import type { GameDto as GameDtoType } from '@apis/game/serializer-dtos/game.dto';
import type { UserDto as UserDtoType } from '@apis/user/serializer-dtos/user.dto';

export class ReviewDto {
  @Expose()
  id: number;

  @Expose()
  positive: boolean;

  @Expose()
  date: Date;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDtoType;

  @Expose()
  @Type(() => GameDto)
  game: GameDtoType;
}
