// NestJS
import { Logger, Module } from '@nestjs/common';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { UsersModule } from '@repositories/sql/users/users.module';

// Services
import { FeatureService } from '@apis/feature/feature.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';

// Controllers
import { FeatureController } from '@apis/feature/feature.controller';

@Module({
  imports: [GamesFeaturesModule, JwtModule, TokenBlacklistModule, UsersModule],
  providers: [GamesFeaturesService, FeatureService, Logger],
  controllers: [FeatureController],
  exports: [FeatureService],
})
export class FeatureModule {}
