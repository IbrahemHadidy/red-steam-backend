// NestJS
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Services
import { DatabaseService } from '@services/database/database.service';

@Module({
  providers: [DatabaseService, ConfigService, Logger],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
