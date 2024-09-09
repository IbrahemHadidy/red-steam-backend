// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { LanguageDto } from '@apis/language/serializer-dtos/language.dto';

// Types
import type { LanguageDto as LanguageDtoType } from '@apis/language/serializer-dtos/language.dto';

export class PaginatedLanguagesDataDto {
  @Expose()
  @Type(() => LanguageDto)
  items: LanguageDtoType;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}
