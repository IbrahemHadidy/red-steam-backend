// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';

// Types
import type { GameDto as GameType } from '@apis/game/serializer-dtos/game.dto';

export class PaginatedGamesDataDto {
  @Expose()
  @Type(() => GameDto)
  readonly items: GameType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
