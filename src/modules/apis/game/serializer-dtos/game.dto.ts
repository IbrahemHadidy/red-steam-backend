// Class-transformer
import { Expose, Type } from 'class-transformer';

// DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';
import { FeatureDto } from '@apis/feature/serializer-dtos/feature.dto';
import { LanguageDto } from '@apis/language/serializer-dtos/language.dto';
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Types
import type { CompanyDto as CompanyDtoType } from '@apis/company/serializer-dtos/company.dto';
import type { FeatureDto as FeatureDtoType } from '@apis/feature/serializer-dtos/feature.dto';
import type { LanguageDto as LanguageDtoType } from '@apis/language/serializer-dtos/language.dto';
import type { ReviewDto as ReviewDtoType } from '@apis/review/serializer-dtos/review.dto';
import type { TagDto as TagDtoType } from '@apis/tag/serializer-dtos/tag.dto';

export class GameDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  category: string;

  @Expose()
  description: string;

  @Expose()
  releaseDate: Date;

  @Expose()
  featured: boolean;

  @Expose()
  @Type(() => CompanyDto)
  publishers: CompanyDtoType[];

  @Expose()
  @Type(() => CompanyDto)
  developers: CompanyDtoType[];

  @Expose()
  @Type(() => ThumbnailEntriesDto)
  thumbnailEntries: ThumbnailEntriesDto[];

  @Expose()
  @Type(() => ImageEntriesDto)
  imageEntries: ImageEntriesDto[];

  @Expose()
  @Type(() => VideoEntriesDto)
  videoEntries: VideoEntriesDto[];

  @Expose()
  @Type(() => TagDto)
  tags: TagDtoType[];

  @Expose()
  @Type(() => PricingDto)
  pricing: PricingDto[];

  @Expose()
  @Type(() => FeatureDto)
  gamesFeatures: FeatureDtoType[];

  @Expose()
  @Type(() => PlatformEntryDto)
  platformEntries: PlatformEntryDto[];

  @Expose()
  @Type(() => LanguageDto)
  languages: LanguageDtoType[];

  @Expose()
  @Type(() => languageSupportDto)
  languageSupport: languageSupportDto[];

  @Expose()
  link: string;

  @Expose()
  about: string;

  @Expose()
  mature: boolean;

  @Expose()
  matureDescription: string;

  @Expose()
  @Type(() => SystemRequirementEntryDto)
  systemRequirements: SystemRequirementEntryDto[];

  @Expose()
  legal: string;

  @Expose()
  @Type(() => ReviewDto)
  reviews: ReviewDtoType[];

  @Expose()
  totalSales: number;

  @Expose()
  averageRating: number;

  @Expose()
  reviewsCount: number;
}

class ThumbnailEntriesDto {
  @Expose()
  mainImage: string;

  @Expose()
  backgroundImage: string;

  @Expose()
  menuImg: string;

  @Expose()
  horizontalHeaderImage: string;

  @Expose()
  verticalHeaderImage: string;

  @Expose()
  smallHeaderImage: string;

  @Expose()
  searchImage: string;

  @Expose()
  tabImage: string;
}

class ImageEntriesDto {
  @Expose()
  link: string;

  @Expose()
  featured?: boolean;

  @Expose()
  order: number;
}

class VideoEntriesDto {
  @Expose()
  link: string;

  @Expose()
  posterLink: boolean;

  @Expose()
  order: number;
}

class PlatformEntryDto {
  @Expose()
  win: boolean;

  @Expose()
  mac: boolean;
}

class languageSupportDto {
  @Expose()
  name: string;

  @Expose()
  interface: boolean;

  @Expose()
  fullAudio: boolean;

  @Expose()
  subtitles: boolean;
}

class SystemRequirementEntryDto {
  @Expose()
  req64?: boolean;

  @Expose()
  @Type(() => SystemRequirementsDetailsDto)
  mini: SystemRequirementsDetailsDto[];

  @Expose()
  @Type(() => SystemRequirementsDetailsDto)
  recommended: SystemRequirementsDetailsDto[];
}

class SystemRequirementsDetailsDto {
  @Expose()
  os?: string;

  @Expose()
  cpu?: string;

  @Expose()
  ram?: string;

  @Expose()
  gpu?: string;

  @Expose()
  dx?: string;

  @Expose()
  network?: string;

  @Expose()
  storage?: string;

  @Expose()
  additionalNotes?: string;

  @Expose()
  soundCard?: string;

  @Expose()
  vrSupport?: string;
}

class PricingDto {
  @Expose()
  id: number;

  @Expose()
  free: boolean;

  @Expose()
  basePrice: number;

  @Expose()
  discount?: boolean;

  @Expose()
  discountPercentage?: number;

  @Expose()
  discountPrice?: number;

  @Expose()
  discountStartDate?: Date;

  @Expose()
  discountEndDate?: Date;

  @Expose()
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';

  @Expose()
  price: number;
}
