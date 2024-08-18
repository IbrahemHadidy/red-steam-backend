import { Expose, Type } from 'class-transformer';
import { GameDataDto } from '@apis/game/serializer-dtos/game-data.dto';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => GameDataDto)
  gameData: GameDataDto;
}