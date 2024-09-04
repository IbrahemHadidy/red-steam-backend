import { GameDataDto } from '@apis/game/serializer-dtos/game-data.dto';
import { Expose, Type } from 'class-transformer';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => GameDataDto)
  gameData: GameDataDto;
}
