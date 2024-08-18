import { Expose, Type } from 'class-transformer';
import { UserDataDto } from '@apis/user/serializer-dtos/user-data.dto';
import type { UserDataDto as UserDataDtoType } from '@apis/user/serializer-dtos/user-data.dto';

export class GameDataDto {
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
  publishers: CompanyDto[];

  @Expose()
  @Type(() => CompanyDto)
  developers: CompanyDto[];

  @Expose()
  @Type(() => ThumbnailsEntryDto)
  thumbnailEntries: ThumbnailsEntryDto[];

  @Expose()
  @Type(() => ImageEntryDto)
  imageEntries: ImageEntryDto[];

  @Expose()
  @Type(() => VideoEntryDto)
  videoEntries: VideoEntryDto[];

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];

  @Expose()
  @Type(() => PricingDto)
  pricing: PricingDto[];

  @Expose()
  @Type(() => GameFeatureDto)
  gamesFeatures: GameFeatureDto[];

  @Expose()
  @Type(() => PlatformEntryDto)
  platforms: PlatformEntryDto[];

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
  @Type(() => reviewDto)
  reviews: reviewDto[];

  @Expose()
  totalSales: number;

  @Expose()
  averageRating: number;

  @Expose()
  reviewsCount: number;
}

class ThumbnailsEntryDto {
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

class ImageEntryDto {
  @Expose()
  link: string;

  @Expose()
  featured?: boolean;

  @Expose()
  order: number;
}

class VideoEntryDto {
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

class CompanyDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  website: string;
}

class TagDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
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

class GameFeatureDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}

class reviewDto {
  @Expose()
  id: number;

  @Expose()
  positive: boolean;

  @Expose()
  date: Date;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDataDto)
  user: UserDataDtoType;

  @Expose()
  @Type(() => GameDataDto)
  game: GameDataDto;
}