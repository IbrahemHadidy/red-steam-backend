import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { Review } from '@repositories/sql/reviews/review.entity';

// Importing types to fix circular dependency
import type { Publisher as PublisherType, Developer as DeveloperType } from '@repositories/sql/companies/company.entity';
import type { GameTag as GameTagType } from '@repositories/sql/games-tags/game-tag.entity';
import type { GamePricing as GamePricingType } from '@repositories/sql/games-pricing/game-pricing.entity';
import type { GameFeature as GameFeatureType } from '@repositories/sql/games-features/game-feature.entity';
import type { Review as ReviewType } from '@repositories/sql/reviews/review.entity';

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

  @Column()
  releaseDate: Date;

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

  @Column({ type: 'jsonb' })
  platformEntries: PlatformEntry;

  @Column({ nullable: true })
  link: string;

  @Column({ type: 'text' })
  about: string;

  @Column()
  mature: boolean;

  @Column({ type: 'text' })
  matureDescription: string;

  @Column({ type: 'jsonb' })
  systemRequirements: SystemRequirementEntry;

  @Column({ type: 'text', nullable: true })
  legal: string;

  @OneToMany(() => Review, (review: ReviewType) => review.game)
  reviews: ReviewType[];
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
