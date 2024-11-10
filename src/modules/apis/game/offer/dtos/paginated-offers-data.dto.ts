// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { GameDto } from '@apis/game/serializer-dtos/game.dto';

// Types
import type { GameDto as OfferType } from '@apis/game/serializer-dtos/game.dto';

export class PaginatedOffersDataDto {
  @Expose()
  @Type(() => GameDto)
  readonly items: OfferType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
