// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';

// Entities
import { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DropboxToken], 'mongo')],
  providers: [DropboxTokensService, Logger],
  exports: [TypeOrmModule, DropboxTokensService],
})
export class DropboxTokensModule {}
