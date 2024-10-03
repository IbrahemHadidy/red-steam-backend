// TypeORM
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { Game } from '@repositories/sql/games/game.entity';
import { User } from '@repositories/sql/users/user.entity';

// Types
import type { Game as GameType } from '@repositories/sql/games/game.entity';
import type { User as UserType } from '@repositories/sql/users/user.entity';

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'review_id' })
  id: number;

  @ManyToOne(() => User, (user: UserType) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: UserType;

  @ManyToOne(() => Game, (game: GameType) => game.reviews)
  @JoinColumn({ name: 'game_id' })
  game: GameType;

  @Column()
  positive: boolean;

  @Column({ default: new Date() })
  date: Date;

  @Column()
  content: string;

  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  async updateGameReviewsData() {
    if (this.game) {
      await this.game.updateReviewsData();
    }
  }
}
