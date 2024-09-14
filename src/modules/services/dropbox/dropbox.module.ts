// NestJS
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Modules
import { DropboxTokensModule } from '@repositories/mongo/dropbox-tokens/token-blacklist.module';

// Services
import { AvatarStorageService } from '@services/dropbox/avatar-storage.service';
import { DropboxService } from '@services/dropbox/dropbox.service';
import { GameStorageService } from '@services/dropbox/game-storage.service';

@Module({
  imports: [DropboxTokensModule],
  providers: [DropboxService, AvatarStorageService, GameStorageService, Logger, ConfigService],
  exports: [DropboxService, AvatarStorageService, GameStorageService],
})
export class DropboxModule {
  constructor(private readonly dropboxService: DropboxService) {}

  // Initialize the Dropbox client using onModuleInit hook
  public async onModuleInit() {
    await this.dropboxService.initializeDropboxClient();
  }
}
