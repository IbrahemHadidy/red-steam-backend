import { ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Game } from '@repositories/sql/games/game.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';

export const environmentConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [
    `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
    `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
    'src/common/configs/environments/.env',
  ],
};

export const getSqlTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('POSTGRESQL_URI'),
  entities: [Publisher, Developer, GameFeature, GamePricing, GameTag, Review, GameLanguage, User, Game],
  synchronize: true,
  autoLoadEntities: true,
});

export const getMongoTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  url: configService.get<string>('MONGODB_URI'),
  entities: [BlacklistedToken, DropboxToken],
  synchronize: true,
  autoLoadEntities: true,
});