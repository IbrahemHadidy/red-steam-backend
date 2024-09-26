// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Types
import type { TagDto as TagType } from '@apis/tag/serializer-dtos/tag.dto';

export class PaginatedTagsDataDto {
  @Expose()
  @Type(() => TagDto)
  readonly items: TagType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
