// TypeORM
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entites
import { Game } from '@repositories/sql/games/game.entity';

// Types
import type { Game as GameType } from '@repositories/sql/games/game.entity';

export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  website: string;
}

@Entity({ name: 'publishers' })
export class Publisher extends Company {
  @ManyToMany(() => Game, (game: GameType) => game.publishers)
  games: GameType[];
}

@Entity({ name: 'developers' })
export class Developer extends Company {
  @ManyToMany(() => Game, (game: GameType) => game.developers)
  games: GameType[];
}
