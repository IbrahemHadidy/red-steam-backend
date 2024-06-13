import { Logger, Module } from "@nestjs/common";
import { DriveService } from '@services/google-drive/google-drive.service';
import { ConfigService } from "@nestjs/config";

@Module({
  providers: [DriveService, Logger, ConfigService],
  exports: [DriveService],
})
export class DriveModule {}