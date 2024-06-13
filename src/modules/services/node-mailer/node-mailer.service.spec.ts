import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { NodeMailerModule } from '@services/node-mailer/node-mailer.module';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';

describe('NodeMailerService', () => {
  let mailer: NodeMailerService;
  let logger: Logger;
  let loggerSpy: jest.SpyInstance;

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
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: {
              service: 'gmail',
              host: 'smtp.gmail.com',
              secure: false, // Set to true if using SSL/TLS
              auth: {
                user: configService.get<string>('EMAIL_USER'),
                pass: configService.get<string>('EMAIL_PASSWORD'),
              },
            },
          }),
          inject: [ConfigService],
        }),
        NodeMailerModule,
      ],
      providers: [NodeMailerService, Logger, ConfigService],
    }).compile();

    mailer = module.get<NodeMailerService>(NodeMailerService);
    logger = module.get<Logger>(Logger);
  });

  beforeEach(() => {
    loggerSpy = jest.spyOn(logger, 'log');
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  describe('sendVerificationEmail', () => {
    it('should send the verification email', async () => {
      const email = 'w9GhsdgawtgkI@example.com';
      const username = 'testuser';
      const verificationToken = 'verificationToken';

      await mailer.sendVerificationEmail(email, username, verificationToken);
      expect(loggerSpy).toHaveBeenCalledWith(`Verification email sent to ${email}`);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send the password reset email', async () => {
      const email = 'w9GhsdgawtgkI@example.com';
      const username = 'testuser';
      const resetToken = 'resetToken';

      await mailer.sendPasswordResetEmail(email, username, resetToken);
      expect(loggerSpy).toHaveBeenCalledWith(`Password reset email sent to ${email}`);
    });
  });

  describe('sendPaymentConfirmationEmail', () => {
    it('should send the payment confirmation email', async () => {
      const email = 'w9GhsdgawtgkI@example.com';
      const orderId = 'paymentId';

      await mailer.sendPaymentConfirmationEmail(email, orderId);
      expect(loggerSpy).toHaveBeenCalledWith(`Payment confirmation email sent to ${email}`);
    });
  });
});
