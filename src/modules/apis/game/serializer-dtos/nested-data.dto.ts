// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';

// Types
import type { GameDto as GameDtoType } from '@apis/game/serializer-dtos/game.dto';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => GameDto)
  gameData: GameDtoType;
}
