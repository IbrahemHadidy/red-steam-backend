// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';
import { UserDto } from '@apis/user/serializer-dtos/user.dto';

// Types
import type { GameDto as GameType } from '@apis/game/serializer-dtos/game.dto';
import type { UserDto as UserType } from '@apis/user/serializer-dtos/user.dto';

export class ReviewDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly positive: boolean;

  @Expose()
  @Type(() => Date)
  readonly date: Date;

  @Expose()
  readonly content: string;

  @Expose()
  @Type(() => UserDto)
  readonly user: UserType;

  @Expose()
  @Type(() => GameDto)
  readonly game: GameType;
}
