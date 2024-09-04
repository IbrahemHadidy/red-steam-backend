// TypeORM
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { GameLanguage } from '../games-languages/game-language.entity';

// Types
import type {
  Developer as DeveloperType,
  Publisher as PublisherType,
} from '@repositories/sql/companies/company.entity';
import type { GameFeature as GameFeatureType } from '@repositories/sql/games-features/game-feature.entity';
import type { GamePricing as GamePricingType } from '@repositories/sql/games-pricing/game-pricing.entity';
import type { GameTag as GameTagType } from '@repositories/sql/games-tags/game-tag.entity';
import type { Review as ReviewType } from '@repositories/sql/reviews/review.entity';
import type { GameLanguage as GameLanguageType } from '../games-languages/game-language.entity';

@Entity({ name: 'games' })
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: new Date() })
  releaseDate: Date;

  @Column({ default: false })
  featured: boolean;

  @ManyToMany(() => Publisher, (company: PublisherType) => company.games)
  @JoinTable({ name: 'games_publishers' })
  publishers: PublisherType[];

  @ManyToMany(() => Developer, (company: DeveloperType) => company.games)
  @JoinTable({ name: 'games_developers' })
  developers: DeveloperType[];

  @Column({ type: 'jsonb' })
  thumbnailEntries: ThumbnailsEntry;

  @Column({ type: 'jsonb', nullable: true })
  imageEntries: ImageEntry[];

  @Column({ type: 'jsonb', nullable: true })
  videoEntries: VideoEntry[];

  @ManyToMany(() => GameTag, (tag: GameTagType) => tag.games)
  @JoinTable({ name: 'games_tags' })
  tags: GameTagType[];

  @OneToOne(() => GamePricing, (pricing: GamePricingType) => pricing.game, {
    cascade: true,
  })
  @JoinColumn({ name: 'pricing_id' })
  pricing: GamePricingType;

  @ManyToMany(() => GameFeature, (feature: GameFeatureType) => feature.games)
  @JoinTable({ name: 'games_features' })
  gamesFeatures: GameFeatureType[];

  @ManyToMany(() => GameLanguage, (language: GameLanguageType) => language.games)
  @JoinTable({ name: 'games_languages' })
  languages: GameLanguageType[];

  @Column({ type: 'jsonb', nullable: true })
  languageSupport: LanguageSupportEntry[];

  @Column({ type: 'jsonb' })
  platformEntries: PlatformEntry;

  @Column({ nullable: true })
  link: string;

  @Column({ type: 'text' })
  about: string;

  @Column({ default: false })
  mature: boolean;

  @Column({ type: 'text' })
  matureDescription: string;

  @Column({ type: 'jsonb' })
  systemRequirements: SystemRequirementEntry;

  @Column({ type: 'text', nullable: true })
  legal: string;

  @OneToMany(() => Review, (review: ReviewType) => review.game)
  reviews: ReviewType[];

  @Column({ type: 'int', default: 0 })
  totalSales: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  // Function to update reviews count and average rating
  async updateReviewsData() {
    const reviews = this.reviews;
    const positiveReviewsCount = reviews.filter((review) => review.positive).length;
    this.reviewsCount = reviews.length;
    if (reviews.length > 0) {
      this.averageRating = (positiveReviewsCount / reviews.length) * 100;
    } else {
      this.averageRating = 0;
      this.reviewsCount = 0;
    }
    await this.save();
  }
}

export interface ThumbnailsEntry {
  mainImage: string;
  backgroundImage: string;
  menuImg: string;
  horizontalHeaderImage: string;
  verticalHeaderImage: string;
  smallHeaderImage: string;
  searchImage: string;
  tabImage: string;
}

export interface ImageEntry {
  link: string;
  featured?: boolean;
  order: number;
}

export interface VideoEntry {
  link: string;
  posterLink: string;
  order: number;
}

export interface LanguageSupportEntry {
  name: string;
  interface: boolean;
  fullAudio: boolean;
  subtitles: boolean;
}

export interface PlatformEntry {
  win: boolean;
  mac: boolean;
}

export interface SystemRequirementEntry {
  req64?: boolean;
  mini: SystemRequirementsDetails;
  recommended: SystemRequirementsDetails;
}

export interface SystemRequirementsDetails {
  os?: string;
  cpu?: string;
  ram?: string;
  gpu?: string;
  dx?: string;
  network?: string;
  storage?: string;
  additionalNotes?: string;
  soundCard?: string;
  vrSupport?: string;
}
