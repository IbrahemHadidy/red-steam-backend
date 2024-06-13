import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { Game } from '@repositories/sql/games/game.entity';
import { GamesService } from '@repositories/sql/games/games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Publisher, Developer, GameFeature, GamePricing, GameTag], 'sql')],
  providers: [CompaniesService, GamesFeaturesService, GamesPricingService, GamesTagsService, GamesService, Logger],
  exports: [TypeOrmModule, GamesService],
})
export class GamesModule {}
