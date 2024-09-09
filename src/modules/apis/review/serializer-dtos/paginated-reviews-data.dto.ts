// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';

// Types
import type { ReviewDto as ReviewDtoType } from '@apis/review/serializer-dtos/review.dto';

export class PaginatedReviewsDataDto {
  @Expose()
  @Type(() => ReviewDto)
  items: ReviewDtoType;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}
