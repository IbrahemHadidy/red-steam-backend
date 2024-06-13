import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GamePricing], 'sql')],
  providers: [GamesPricingService, Logger],
  exports: [TypeOrmModule, GamesPricingService],
})
export class GamesPricingModule {}
