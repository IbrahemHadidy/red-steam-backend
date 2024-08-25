import { Logger, Module } from '@nestjs/common';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';

// Services
import { ReviewService } from '@modules/apis/review/review.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';

// Controllers
import { ReviewController } from '@modules/apis/review/review.controller';

@Module({
  imports: [ReviewsModule, GamesModule, UsersModule, JwtModule, TokenBlacklistModule],
  providers: [ReviewsService, ReviewService, Logger],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
