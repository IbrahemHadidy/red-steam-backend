// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { LanguageDto } from '@apis/language/serializer-dtos/language.dto';

// Types
import type { LanguageDto as LanguageType } from '@apis/language/serializer-dtos/language.dto';

export class PaginatedLanguagesDataDto {
  @Expose()
  @Type(() => LanguageDto)
  readonly items: LanguageType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
