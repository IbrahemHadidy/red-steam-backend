import { Logger, Module } from "@nestjs/common";
import { DropboxService } from '@services/dropbox/dropbox.service';
import { ConfigService } from "@nestjs/config";
import { DropboxTokensModule } from "@repositories/mongo/dropbox-tokens/token-blacklist.module";
import { AvatarStorageService } from "@services/dropbox/avatar-storage.service";
import { GameStorageService } from '@services/dropbox/game-storage.service';

@Module({
  imports: [DropboxTokensModule],
  providers: [DropboxService, AvatarStorageService, GameStorageService, Logger, ConfigService],
  exports: [DropboxService, AvatarStorageService, GameStorageService],
})
export class DropboxModule {}