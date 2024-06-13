import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameTag], 'sql')],
  providers: [GamesTagsService, Logger],
  exports: [TypeOrmModule, GamesTagsService],
})
export class GamesTagsModule {}
