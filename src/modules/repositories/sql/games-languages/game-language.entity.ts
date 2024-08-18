import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { Game } from '@repositories/sql/games/game.entity';

// Importing game type to fix circular dependency
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'languages' })
export class GameLanguage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game, (game: GameType) => game.languages)
  games: GameType[];
}
