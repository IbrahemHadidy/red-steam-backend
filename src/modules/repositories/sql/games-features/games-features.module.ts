import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameFeature], 'sql')],
  providers: [GamesFeaturesService, Logger],
  exports: [TypeOrmModule, GamesFeaturesService],
})
export class GamesFeaturesModule {}
