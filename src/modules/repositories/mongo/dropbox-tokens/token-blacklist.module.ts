import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DropboxTokensService } from '@repositories/mongo/dropbox-tokens/dropbox-tokens.service';
import { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DropboxToken], 'mongo')],
  providers: [DropboxTokensService, Logger],
  exports: [TypeOrmModule, DropboxTokensService],
})
export class DropboxTokensModule {}
