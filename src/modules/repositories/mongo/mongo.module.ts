import { DatabaseService } from '@/modules/services/database/database.service';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';

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
  ],
})
export class MongoModule {}