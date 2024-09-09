// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';

// Types
import type { CompanyDto as CompanyDtoType } from '@apis/company/serializer-dtos/company.dto';

export class PaginatedCompaniesDataDto {
  @Expose()
  @Type(() => CompanyDto)
  items: CompanyDtoType;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;
}
