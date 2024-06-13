import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { User } from '@repositories/sql/users/user.entity';
import { Game } from '@repositories/sql/games/game.entity';

// Importing types to fix circular dependency
import type { User as UserType } from '@repositories/sql/users/user.entity';
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'reviews' })
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
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
}
