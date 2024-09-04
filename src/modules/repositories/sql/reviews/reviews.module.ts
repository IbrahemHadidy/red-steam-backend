// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesService } from '@repositories/sql/games/games.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { UsersService } from '@repositories/sql/users/users.service';

// Entities
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Game } from '@repositories/sql/games/game.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Review, User, Game, Publisher, Developer, GameLanguage, GameFeature, GamePricing, GameTag],
      'sql',
    ),
  ],
  providers: [
    GamesPricingService,
    GamesService,
    CompaniesService,
    GamesFeaturesService,
    GamesLanguagesService,
    GamesTagsService,
    UsersService,
    ReviewsService,
    Logger,
  ],
  exports: [TypeOrmModule, ReviewsService],
})
export class ReviewsModule {}
