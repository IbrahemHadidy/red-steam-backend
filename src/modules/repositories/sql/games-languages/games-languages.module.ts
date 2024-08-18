import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';
import { Game } from '@repositories/sql/games/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameLanguage, Game], 'sql')],
  providers: [GamesLanguagesService, Logger],
  exports: [TypeOrmModule, GamesLanguagesService],
})
export class GamesLanguagesModule {}
