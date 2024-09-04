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
          secure: false, // Set to true if using SSL/TLS
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [NodeMailerService, Logger, ConfigService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
