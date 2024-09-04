import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { PaypalModule } from '@services/paypal/paypal.module';
import { PaypalService } from '@services/paypal/paypal.service';

describe('PaypalService', () => {
  let paymentService: PaypalService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
            `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
            `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
            'src/common/configs/environments/.env',
          ],
        }),
        PaypalModule,
      ],
      providers: [PaypalService, ConfigService, Logger],
    }).compile();

    paymentService = module.get<PaypalService>(PaypalService);
  });

  describe('createOrder', () => {
    it('should create order', async () => {
      const order = await paymentService.createOrder(10);

      // Assertions
      expect(order).toBeDefined();
    });
  });

  describe('captureOrder', () => {
    it('should capture order after manual approval', async () => {
      // Create order
      const createdOrder = await paymentService.createOrder(10);

      // Get approval URL
      const approvalUrl = createdOrder.result.links.find((link: { rel: string }) => link.rel === 'approve').href;

      // Log the approval URL and wait for manual approval
      console.log(
        '\x1b[33m%s\x1b[0m',
        `
                \x1b[33m╔═══════════════════════════════════════════════════════════════════════╗
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mPlease manually approve the order by visiting the following URL:\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ║  \x1b[34m\x1b[1m${approvalUrl}\x1b[0m\x1b[33m   ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mUse the following credentials for approval:\x1b[0m\x1b[33m                          ║
                ║  \x1b[1mBuyer Email:\x1b[0m \x1b[32msb-gc21b29998568@business.example.com\x1b[33m                   ║
                ║  \x1b[1mBuyer Password:\x1b[0m \x1b[32m';>7GL;d\x1b[33m                                             ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[31mYou have 1 minute to approve the order, else the test will fail.\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ╚═══════════════════════════════════════════════════════════════════════╝\x1b[0m
        `,
      );


      // Wait for manual approval (adjust the timeout as necessary)
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute

      // Capture order after manual approval
      const capturedOrder = await paymentService.captureOrder(createdOrder.result.id);

      // Assertions
      expect(capturedOrder).toBeDefined();
      expect(capturedOrder.status).toBeDefined();
      expect(capturedOrder.orderId).toBeDefined();
      expect(capturedOrder.payerName).toBeDefined();
    }, 90000);
  });
});
