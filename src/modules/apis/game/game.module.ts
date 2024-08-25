import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Modules
import { DropboxModule } from '@services/dropbox/dropbox.module';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { DropboxTokensModule } from '@repositories/mongo/dropbox-tokens/token-blacklist.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { GamesModule } from '@repositories/sql/games/games.module';


// Services
import { DataService } from '@apis/game/data/data.service';
import { AdminService } from '@apis/game/admin/admin.service';

// Controllers
import { DataController } from '@apis/game/data/data.controller';
import { AdminController } from '@apis/game/admin/admin.controller';

@Module({
  imports: [JwtModule, UsersModule, GamesModule, TokenBlacklistModule, DropboxTokensModule, DropboxModule],
  providers: [DataService, AdminService, Logger],
  controllers: [DataController, AdminController],
  exports: [DataService, AdminService],
})
export class GameModule {}
