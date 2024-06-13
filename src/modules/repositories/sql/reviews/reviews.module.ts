import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { GamesService } from '@repositories/sql/games/games.service';
import { Game } from '@repositories/sql/games/game.entity';
import { UsersService } from '@repositories/sql/users/users.service';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Game, Publisher, Developer, GameFeature, GamePricing, GameTag], 'sql'),
  ],
  providers: [
    GamesPricingService,
    GamesService,
    CompaniesService,
    GamesFeaturesService,
    GamesTagsService,
    UsersService,
    ReviewsService,
    Logger
  ],
  exports: [TypeOrmModule, ReviewsService],
})
export class ReviewsModule {}
