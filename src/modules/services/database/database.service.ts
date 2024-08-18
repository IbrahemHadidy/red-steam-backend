import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, DataSource} from 'typeorm';

// Entities
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';
import { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Game } from '@repositories/sql/games/game.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public getPostgresTypeOrmConfig(): DataSourceOptions {
    const postgresOptions: DataSourceOptions = {
      name: 'sql',
      type: 'postgres',
      url: this.configService.get<string>('POSTGRESQL_URI'),
      entities: [Publisher, Developer, GameFeature, GameLanguage, GamePricing, GameTag, Review, Game, User],
      migrations: ['dist/migrations/sql/**/*.js'],
      synchronize: true,
    };

    this.logger.log('PostgreSQL TypeORM config initialized');
    return postgresOptions;
  }

  public getMongoTypeOrmConfig(): DataSourceOptions {
    const mongoOptions: DataSourceOptions = {
      name: 'mongo',
      type: 'mongodb',
      url: this.configService.get<string>('MONGODB_URI'),
      entities: [BlacklistedToken, DropboxToken],
      migrations: ['dist/migrations/mongo/**/*.js'],
      synchronize: true,
    };

    this.logger.log('MongoDB TypeORM config initialized');
    return mongoOptions;
  }

  public async getPostgresDataSource(): Promise<DataSource> {
    const postgresDataSource = new DataSource(this.getPostgresTypeOrmConfig());
    await postgresDataSource.initialize();

    this.logger.log('PostgreSQL datasource initialized');
    return postgresDataSource;
  }

  public async getMongoDataSource(): Promise<DataSource> {
    const mongoDataSource = new DataSource(this.getMongoTypeOrmConfig());
    await mongoDataSource.initialize();

    this.logger.log('MongoDB datasource initialized');
    return mongoDataSource;
  }
}
