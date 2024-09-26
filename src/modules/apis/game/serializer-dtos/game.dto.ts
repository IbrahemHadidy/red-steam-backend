// Class-transformer
import { Expose, Type } from 'class-transformer';

// Body DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';
import { FeatureDto } from '@apis/feature/serializer-dtos/feature.dto';
import { LanguageDto } from '@apis/language/serializer-dtos/language.dto';
import { ReviewDto } from '@apis/review/serializer-dtos/review.dto';
import { TagDto } from '@apis/tag/serializer-dtos/tag.dto';

// Types
import type { CompanyDto as CompanyType } from '@apis/company/serializer-dtos/company.dto';
import type { FeatureDto as FeatureType } from '@apis/feature/serializer-dtos/feature.dto';
import type { LanguageDto as LanguageType } from '@apis/language/serializer-dtos/language.dto';
import type { ReviewDto as ReviewType } from '@apis/review/serializer-dtos/review.dto';
import type { TagDto as TagType } from '@apis/tag/serializer-dtos/tag.dto';

class ThumbnailEntriesDto {
  @Expose()
  readonly mainImage: string;

  @Expose()
  readonly backgroundImage: string;

  @Expose()
  readonly menuImg: string;

  @Expose()
  readonly horizontalHeaderImage: string;

  @Expose()
  readonly verticalHeaderImage: string;

  @Expose()
  readonly smallHeaderImage: string;

  @Expose()
  readonly searchImage: string;

  @Expose()
  readonly tabImage: string;
}

class ImageEntriesDto {
  @Expose()
  readonly link: string;

  @Expose()
  readonly featured?: boolean;

  @Expose()
  readonly order: number;
}

class VideoEntriesDto {
  @Expose()
  readonly link: string;

  @Expose()
  readonly posterLink: boolean;

  @Expose()
  readonly order: number;
}

class PlatformEntryDto {
  @Expose()
  readonly win: boolean;

  @Expose()
  readonly mac: boolean;
}

class languageSupportDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly interface: boolean;

  @Expose()
  readonly fullAudio: boolean;

  @Expose()
  readonly subtitles: boolean;
}

class SystemRequirementEntryDto {
  @Expose()
  readonly req64?: boolean;

  @Expose()
  @Type(() => SystemRequirementsDetailsDto)
  readonly mini: SystemRequirementsDetailsDto[];

  @Expose()
  @Type(() => SystemRequirementsDetailsDto)
  readonly recommended: SystemRequirementsDetailsDto[];
}

class SystemRequirementsDetailsDto {
  @Expose()
  readonly os?: string;

  @Expose()
  readonly cpu?: string;

  @Expose()
  readonly ram?: string;

  @Expose()
  readonly gpu?: string;

  @Expose()
  readonly dx?: string;

  @Expose()
  readonly network?: string;

  @Expose()
  readonly storage?: string;

  @Expose()
  readonly additionalNotes?: string;

  @Expose()
  readonly soundCard?: string;

  @Expose()
  readonly vrSupport?: string;
}

class PricingDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly free: boolean;

  @Expose()
  readonly basePrice: number;

  @Expose()
  readonly discount?: boolean;

  @Expose()
  readonly discountPercentage?: number;

  @Expose()
  readonly discountPrice?: number;

  @Expose()
  readonly discountStartDate?: Date;

  @Expose()
  readonly discountEndDate?: Date;

  @Expose()
  readonly offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';

  @Expose()
  readonly price: number;
}

export class GameDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly category: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly releaseDate: Date;

  @Expose()
  readonly featured: boolean;

  @Expose()
  @Type(() => CompanyDto)
  readonly publishers: CompanyType[];

  @Expose()
  @Type(() => CompanyDto)
  readonly developers: CompanyType[];

  @Expose()
  @Type(() => ThumbnailEntriesDto)
  readonly thumbnailEntries: ThumbnailEntriesDto[];

  @Expose()
  @Type(() => ImageEntriesDto)
  readonly imageEntries: ImageEntriesDto[];

  @Expose()
  @Type(() => VideoEntriesDto)
  readonly videoEntries: VideoEntriesDto[];

  @Expose()
  @Type(() => TagDto)
  readonly tags: TagType[];

  @Expose()
  @Type(() => PricingDto)
  readonly pricing: PricingDto[];

  @Expose()
  @Type(() => FeatureDto)
  readonly features: FeatureType[];

  @Expose()
  @Type(() => PlatformEntryDto)
  readonly platformEntries: PlatformEntryDto[];

  @Expose()
  @Type(() => LanguageDto)
  readonly languages: LanguageType[];

  @Expose()
  @Type(() => languageSupportDto)
  readonly languageSupport: languageSupportDto[];

  @Expose()
  readonly link: string;

  @Expose()
  readonly about: string;

  @Expose()
  readonly mature: boolean;

  @Expose()
  readonly matureDescription: string;

  @Expose()
  @Type(() => SystemRequirementEntryDto)
  readonly systemRequirements: SystemRequirementEntryDto[];

  @Expose()
  readonly legal: string;

  @Expose()
  @Type(() => ReviewDto)
  readonly reviews: ReviewType[];

  @Expose()
  readonly totalSales: number;

  @Expose()
  readonly averageRating: number;

  @Expose()
  readonly reviewsCount: number;
}
