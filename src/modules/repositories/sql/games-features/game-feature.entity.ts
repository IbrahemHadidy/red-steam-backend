import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import { Game } from '@repositories/sql/games/game.entity';

// Importing game type to fix circular dependency
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'features' })
export class GameFeature extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Game, (game: GameType) => game.gamesFeatures)
  games: GameType[];
}
