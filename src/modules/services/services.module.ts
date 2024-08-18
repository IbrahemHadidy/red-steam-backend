import { Module } from '@nestjs/common';
import { DatabaseModule } from '@services/database/database.module';
import { NodeMailerModule } from '@services/node-mailer/node-mailer.module';
import { DropboxModule } from '@services/dropbox/dropbox.module';
import { PaypalModule } from '@services/paypal/paypal.module';

@Module({
  imports: [DatabaseModule, NodeMailerModule, DropboxModule, PaypalModule],
})
export class ServicesModule {}
