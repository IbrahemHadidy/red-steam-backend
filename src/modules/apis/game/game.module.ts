// NestJS
import { Logger, Module } from '@nestjs/common';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { DropboxTokensModule } from '@repositories/mongo/dropbox-tokens/token-blacklist.module';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { GamesPricingModule } from '@repositories/sql/games-pricing/games-pricing.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { DropboxModule } from '@services/dropbox/dropbox.module';

// Services
import { AdminService } from '@apis/game/admin/admin.service';
import { DataService } from '@apis/game/data/data.service';
import { OfferService } from '@apis/game/offer/offer.service';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';

// Controllers
import { AdminController } from '@apis/game/admin/admin.controller';
import { DataController } from '@apis/game/data/data.controller';
import { OfferController } from '@apis/game/offer/offer.controller';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    GamesModule,
    GamesPricingModule,
    ReviewsModule,
    TokenBlacklistModule,
    DropboxTokensModule,
    DropboxModule,
  ],
  providers: [DataService, OfferService, AdminService, Logger],
  controllers: [DataController, AdminController, OfferController],
  exports: [DataService, AdminService, OfferService],
})
export class GameModule {}
