import { Logger, Module } from '@nestjs/common';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';

// Services
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { TagService } from '@apis/tag/tag.service';

// Controllers
import { TagController } from '@apis/tag/tag.controller';

@Module({
  imports: [GamesTagsModule, JwtModule, TokenBlacklistModule, UsersModule],
  providers: [GamesTagsService, TagService, Logger],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}