// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';

// Types
import type { GameDto as GameDtoType } from '@apis/game/serializer-dtos/game.dto';

export class FeatureDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  icon: { type: string; data: number[] };

  @Type(() => GameDto)
  @Expose()
  games: GameDtoType[];
}
