// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { FeatureDto } from '@apis/feature/serializer-dtos/feature.dto';

// Types
import type { FeatureDto as FeatureType } from '@apis/feature/serializer-dtos/feature.dto';

export class PaginatedFeaturesDataDto {
  @Expose()
  @Type(() => FeatureDto)
  readonly items: FeatureType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
