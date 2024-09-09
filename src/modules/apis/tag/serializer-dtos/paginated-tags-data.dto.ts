// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Types
import type { TagDto as TagDtoType } from '@apis/tag/serializer-dtos/tag.dto';

export class PaginatedTagsDataDto {
  @Expose()
  @Type(() => TagDto)
  items: TagDtoType;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}
