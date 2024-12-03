// NestJS
import { BadRequestException } from '@nestjs/common';

// TypeORM
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// DecimalJS
import Decimal from 'decimal.js';

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

  @Column({ nullable: false, default: '0.00', type: 'decimal', precision: 10, scale: 2 })
  basePrice: string;

  @Column({ default: false })
  discount?: boolean;

  @Column({ nullable: true, type: 'float' })
  discountPercentage?: number;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  discountPrice?: string;

  @Column({ nullable: true })
  discountStartDate?: Date;

  @Column({ nullable: true })
  discountEndDate?: Date;

  @Column({ nullable: true })
  offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';

  @Column({ type: 'decimal', precision: 10, scale: 2, default: '0.00' })
  price: string;

  @OneToOne(() => Game, (game: GameType) => game.pricing)
  game?: GameType;

  // Final calculations
  @BeforeInsert()
  @BeforeUpdate()
  finalize() {
    const basePriceDecimal = new Decimal(this.basePrice || '0.00');
    const discountPriceDecimal = new Decimal(this.discountPrice || '0.00');

    if (this.free) {
      this.price = '0.00';
      this.discount = false;
      this.basePrice = '0.00';
      this.discountPrice = null;
      this.offerType = null;
      this.discountStartDate = null;
      this.discountEndDate = null;
      this.discountPercentage = null;
    } else {
      this.price = this.discount ? discountPriceDecimal.toFixed(2) : basePriceDecimal.toFixed(2);

      if (this.discount) {
        if (basePriceDecimal.lessThanOrEqualTo(0)) {
          throw new BadRequestException('Base price must be greater than 0 to calculate discount percentage');
        }
        this.discountPercentage = Math.round(
          basePriceDecimal.minus(discountPriceDecimal).dividedBy(basePriceDecimal).times(100).toNumber(),
        );
      } else {
        this.discountPrice = null;
        this.discountPercentage = null;
        this.discountStartDate = null;
        this.discountEndDate = null;
        this.offerType = null;
      }
    }
  }

  @AfterLoad()
  checkDiscountEndDate() {
    if (this.discountEndDate && this.discountEndDate < new Date()) {
      this.discount = false;
      this.discountPrice = null;
      this.discountPercentage = null;
      this.discountStartDate = null;
      this.discountEndDate = null;
      this.offerType = null;
    }
  }
}
