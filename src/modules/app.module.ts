import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart';
import { ExceptionInterceptor } from '@interceptors/exception.interceptor';
import { ServicesModule } from '@services/services.module';
import { ApisModule } from '@apis/apis.module';
import { RepositoriesModule } from '@repositories/repositories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
        `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
        'src/common/configs/environments/.env',
      ],
    }),
    RepositoriesModule,
    ServicesModule,
    ApisModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      },
    },
    Logger,
  ],
})
export class AppModule {
  static async register(app: NestFastifyApplication): Promise<NestFastifyApplication> {
    // Register the multipart plugin
    await app.register(multipart);

    // Set global prefix for all routes
    app.setGlobalPrefix('api');

    // Use global validation pipe to validate incoming data
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // Configure CORS
    app.enableCors({
      origin: process.env.FRONT_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      maxAge: 3600,
      allowedHeaders: 'origin, x-requested-with, x-refresh-token, content-type, accept, authorization',
      exposedHeaders: 'authorization, x-refresh-token',
    });

    return app;
  }
}
