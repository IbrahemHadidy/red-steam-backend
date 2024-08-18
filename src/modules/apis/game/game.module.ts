import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Modules
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { DropboxModule } from '@services/dropbox/dropbox.module';
import { DropboxTokensModule } from '@repositories/mongo/dropbox-tokens/token-blacklist.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { GameService } from '@apis/game/game.service';

// Services
import { GameController } from '@apis/game/game.controller';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    GamesModule,
    TokenBlacklistModule,
    DropboxTokensModule,
    DropboxModule,
  ],
  providers: [GameService, Logger],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
