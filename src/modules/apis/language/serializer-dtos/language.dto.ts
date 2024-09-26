// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';

// Types
import type { GameDto as GameType } from '@apis/game/serializer-dtos/game.dto';

export class LanguageDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Type(() => GameDto)
  @Expose()
  readonly games: GameType[];
}
