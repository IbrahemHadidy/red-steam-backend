import 'dotenv/config';
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';

export default {
  mongo: {
    name: 'mongo',
    database: process.env.MONGODB_URI,
    entities: [BlacklistedToken],
    migrations: ['dist/migrations/mongo/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations/mongo',
    },
    synchronize: false,
    autoLoadEntities: false,
  },

  sql: {
    name: 'sql',
    type: 'postgres',
    url: process.env.POSTGRESQL_URI,
    entities: [Publisher, Developer, GameFeature, GamePricing, GameTag, Review, User],
    migrations: ['dist/migrations/sql/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations/sql',
    },
    synchronize: false,
    autoLoadEntities: false,
  },
};
