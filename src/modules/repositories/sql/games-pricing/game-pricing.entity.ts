// NestJS
import { BadRequestException } from '@nestjs/common';

// TypeORM
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { Game } from '@repositories/sql/games/game.entity';

// Types
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'games_pricing' })
export class GamePricing extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'pricing_id' })
  id: number;

  @Column({ default: false })
  free: boolean;

  @Column({ nullable: true, type: 'float' })
  basePrice: number;

  @Column({ default: false })
  discount?: boolean;

  @Column({ nullable: true, type: 'float' })
  discountPercentage?: number;

  @Column({ nullable: true, type: 'float' })
  discountPrice?: number;

  @Column({ nullable: true })
  discountStartDate?: Date;

  @Column({ nullable: true })
  discountEndDate?: Date;

  @Column({ nullable: true })
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';

  @Column({ type: 'float', default: 0 })
  price: number;

  @OneToOne(() => Game, (game: GameType) => game.pricing)
  game?: GameType;

  // Final calculations
  @BeforeInsert()
  @BeforeUpdate()
  finalize() {
    this.price = this.discount ? this.discountPrice : this.basePrice;

    if (this.free) {
      this.price = 0;
      this.discount = false;
      this.basePrice = 0;
      this.discountPrice = null;
      this.offerType = null;
      this.discountStartDate = null;
      this.discountEndDate = null;
      this.discountPercentage = null;
    }

    if (this.discount) {
      if (this.basePrice <= 0)
        throw new BadRequestException('Base price must be greater than 0 to calculate discount percentage');
      this.discountPercentage = Math.round((this.discountPrice / this.basePrice) * 100);
    }

    if (!this.discount) {
      this.discountPrice = null;
      this.discountPercentage = null;
      this.discountStartDate = null;
      this.discountEndDate = null;
      this.offerType = null;
    }
  }
}
