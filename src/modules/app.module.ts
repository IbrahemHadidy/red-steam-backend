// NestJS
import { Logger, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// Fastify
import { fastifyMultipart } from '@fastify/multipart';

// Cache Manager
// import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-redis-yet';

// Global interceptors
import { ExceptionInterceptor } from '@interceptors/exception.interceptor';

// Global Middlewares
import { LoggerMiddleware } from '@middlewares/logger.middleware';

// Main Modules
import { ApisModule } from '@apis/apis.module';
import { RepositoriesModule } from '@repositories/repositories.module';
import { ServicesModule } from '@services/services.module';

// Types
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

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
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     store: redisStore,
    //     host: configService.get<string>('REDIS_HOST'),
    //     port: configService.get<number>('REDIS_PORT'),
    //     ttl: configService.get<number>('CACHE_TTL') || 600,
    //     max: configService.get<number>('CACHE_MAX_ITEMS') || 100,
    //     password: configService.get<string>('REDIS_PASSWORD'),
    //   }),
    // }),
    RepositoriesModule,
    ServicesModule,
    ApisModule,
  ],
  providers: [
    // Use Exception Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
    // Use Validation Pipe
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
export class AppModule implements NestModule {
  static async register(app: NestFastifyApplication): Promise<NestFastifyApplication> {
    // Register the multipart plugin
    await app.register(fastifyMultipart);

    // Set global prefix for all routes
    app.setGlobalPrefix('api');

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

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
