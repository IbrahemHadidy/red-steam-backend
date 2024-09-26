// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';

// Types
import type { ReviewDto as ReviewType } from '@apis/review/serializer-dtos/review.dto';

export class PaginatedReviewsDataDto {
  @Expose()
  @Type(() => ReviewDto)
  readonly items: ReviewType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
