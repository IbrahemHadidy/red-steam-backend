// Types
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Entites
import { Game } from '@repositories/sql/games/game.entity';

// Types
import type { Game as GameType } from '@repositories/sql/games/game.entity';

@Entity({ name: 'features' })
export class GameFeature extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'bytea' })
  icon: Buffer;

  @ManyToMany(() => Game, (game: GameType) => game.gamesFeatures)
  games?: GameType[];
}
