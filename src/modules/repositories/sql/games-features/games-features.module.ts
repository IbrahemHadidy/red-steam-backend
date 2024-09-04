// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';

// Entities
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameFeature], 'sql')],
  providers: [GamesFeaturesService, Logger],
  exports: [TypeOrmModule, GamesFeaturesService],
})
export class GamesFeaturesModule {}
