import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from 'typeorm';
import { Game } from '@repositories/sql/games/game.entity';

// Importing game type to fix circular dependency
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'games_pricing' })
export class GamePricing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  free: boolean;

  @Column({ nullable: true })
  basePrice: number;

  @Column({ default: false })
  discount?: boolean;

  @Column({ nullable: true })
  discountPercentage?: number;

  @Column({ nullable: true })
  discountPrice?: number;

  @Column({ nullable: true })
  discountStartDate?: Date;

  @Column({ nullable: true })
  discountEndDate?: Date;

  @Column({ nullable: true })
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';

  @OneToOne(() => Game, (game: GameType) => game.pricing)
  game: GameType;
}
