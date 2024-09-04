// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';

// Entities
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameTag], 'sql')],
  providers: [GamesTagsService, Logger],
  exports: [TypeOrmModule, GamesTagsService],
})
export class GamesTagsModule {}
