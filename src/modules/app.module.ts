import path from 'path';

// NestJS
import { Logger, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

// Fastify plugins
import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
// import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { fastifyMultipart } from '@fastify/multipart';
// import fastifyRedis from '@fastify/redis';

// Cache Manager
// import { createKeyv } from '@keyv/redis';
// import { CacheModule } from '@nestjs/cache-manager';
// import { CacheableMemory } from 'cacheable';
// import { Keyv } from 'keyv';

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
    //     stores: [
    //       new Keyv({
    //         store: new CacheableMemory({ ttl: configService.get<number>('CACHE_TTL') || 600, lruSize: 5000 }),
    //       }),
    //       createKeyv(configService.get<string>('REDIS_HOST')),
    //     ],
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
  // This method used to register global middlewares on main.ts and e2e tests
  static async register(app: NestFastifyApplication): Promise<NestFastifyApplication> {
    const configService = app.get(ConfigService);

    // Register Redis plugin for direct Redis interactions
    // await app.register(fastifyRedis, {
    //   host: configService.get<string>('REDIS_HOST'),
    //   port: configService.get<number>('REDIS_PORT'),
    //   password: configService.get<string>('REDIS_PASSWORD'),
    // });

    // Register fastify-static (to serve static files)
    app.register(fastifyStatic, {
      root: path.join(__dirname, 'public'),
      prefix: '/public/',
    });

    // Register helmet (to set security headers)
    await app.register(helmet);

    // Register the multipart plugin (to handle file uploads)
    await app.register(fastifyMultipart);

    // Register fastify-cookie (to handle cookies)
    await app.register(fastifyCookie, {
      secret: configService.get<string>('COOKIE_SECRET'),
      parseOptions: {},
    });

    // Register CSRF protection middleware
    // await app.register(fastifyCsrf, {
    //   cookieOpts: {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //   },
    // });

    // Set global prefix for all routes
    app.setGlobalPrefix('api');

    // Configure CORS (to allow cross-origin requests)
    app.enableCors({
      origin: [process.env.FRONT_URL, process.env.BASE_URL],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      maxAge: 3600,
    });

    return app;
  }

  // Configure the logger middleware for all routes
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
