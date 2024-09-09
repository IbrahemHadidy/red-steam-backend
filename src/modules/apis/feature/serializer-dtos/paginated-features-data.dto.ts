// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { FeatureDto } from '@apis/feature/serializer-dtos/feature.dto';

// Types
import type { FeatureDto as FeatureDtoType } from '@apis/feature/serializer-dtos/feature.dto';

export class PaginatedFeaturesDataDto {
  @Expose()
  @Type(() => FeatureDto)
  items: FeatureDtoType;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}
