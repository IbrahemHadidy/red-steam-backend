// TypeORM
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { Game } from '@repositories/sql/games/game.entity';
import { User } from '@repositories/sql/users/user.entity';

// Types
import type { Game as GameType } from '@repositories/sql/games/game.entity';
import type { User as UserType } from '@repositories/sql/users/user.entity';

@Entity({ name: 'tags' })
export class GameTag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game, (game: GameType) => game.tags)
  games?: GameType[];

  @ManyToMany(() => User, (user: UserType) => user.tags)
  users?: UserType[];
}
