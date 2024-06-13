import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService, ConfigService, Logger],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
