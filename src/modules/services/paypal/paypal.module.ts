import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaypalService } from '@services/paypal/paypal.service';

@Module({
  imports: [ConfigModule],
  providers: [PaypalService, Logger],
  exports: [PaypalService],
})
export class PaypalModule {}
