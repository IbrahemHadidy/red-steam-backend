import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseModule } from '@services/database/database.module';
import { DatabaseService } from '@services/database/database.service';
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { GamesPricingModule } from '@repositories/sql/games-pricing/games-pricing.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      inject: [DatabaseService],
      extraProviders: [DatabaseService, Logger, ConfigService],
      name: 'sql',
      useFactory: async (databaseService: DatabaseService): Promise<TypeOrmModuleOptions> => {
        return databaseService.getPostgresTypeOrmConfig();
      },
    }),
    CompaniesModule,
    GamesFeaturesModule,
    GamesPricingModule,
    GamesTagsModule,
    ReviewsModule,
    GamesModule,
    UsersModule,
  ],
  exports: [TypeOrmModule],
})
export class SqlModule {}
