import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { DropboxTokensModule } from '@repositories/mongo/dropbox-tokens/token-blacklist.module';

// DB Config
import { DatabaseService } from '@services/database/database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [DatabaseService],
      extraProviders: [DatabaseService, Logger, ConfigService],
      name: 'mongo',
      useFactory: async (databaseService: DatabaseService): Promise<TypeOrmModuleOptions> => {
        return databaseService.getMongoTypeOrmConfig();
      },
    }),
    TokenBlacklistModule,
    DropboxTokensModule,
  ],
})
export class MongoModule {}