import { GameDto } from '@apis/game/serializer-dtos/game.dto';
import { Expose, Type } from 'class-transformer';

export class NestedDataDto {
  @Expose()
  message: string;

  @Expose()
  @Type(() => GameDto)
  gameData: GameDto;
}
