// Class-transformer
import { Expose, Type } from 'class-transformer';

// DTOs
import { GameDataDto } from '@apis/game/serializer-dtos/game-data.dto';
import { UserDataDto } from '@apis/user/serializer-dtos/user-data.dto';

// Types
import type { GameDataDto as GameDataDtoType } from '@apis/game/serializer-dtos/game-data.dto';
import type { UserDataDto as UserDataDtoType } from '@apis/user/serializer-dtos/user-data.dto';

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
  @Type(() => UserDataDto)
  user: UserDataDtoType;

  @Expose()
  @Type(() => GameDataDto)
  game: GameDataDtoType;
}
