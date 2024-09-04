import { Logger, Module } from '@nestjs/common';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { GamesLanguagesModule } from '@repositories/sql/games-languages/games-languages.module';

// Services
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { LanguageService } from '@apis/language/language.service';

// Controllers
import { LanguageController } from '@apis/language/language.controller';

@Module({
  imports: [GamesLanguagesModule, UsersModule, JwtModule, TokenBlacklistModule],
  providers: [GamesLanguagesService, LanguageService, Logger],
  controllers: [LanguageController],
  exports: [LanguageService],
})
export class LanguageModule {}
