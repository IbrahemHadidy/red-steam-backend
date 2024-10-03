// TypeORM
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { Game } from '@repositories/sql/games/game.entity';

// Types
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'languages' })
export class GameLanguage extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'language_id' })
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game, (game: GameType) => game.languages)
  games: GameType[];
}
