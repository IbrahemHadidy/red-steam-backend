// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';

// Types
import type { CompanyDto as CompanyType } from '@apis/company/serializer-dtos/company.dto';

export class PaginatedCompaniesDataDto {
  @Expose()
  @Type(() => CompanyDto)
  readonly items: CompanyType;

  @Expose()
  readonly total: number;

  @Expose()
  readonly totalPages: number;
}
