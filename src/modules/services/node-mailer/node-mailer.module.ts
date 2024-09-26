// NestJS
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Modules
import { MailerModule } from '@nestjs-modules/mailer';

// Services
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          // secure: configService.get<string>('NODE_ENV') === 'production', // Set to true if using SSL/TLS
          secure: false,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [NodeMailerService, Logger, ConfigService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
