// NestJS
import { NestFactory } from '@nestjs/core';

// Main entry point of the application (App Module)
import { AppModule } from '@modules/app.module';

// Fastify
import { FastifyAdapter } from '@nestjs/platform-fastify';

// Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

// Types
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { SwaggerCustomOptions } from '@nestjs/swagger';

// Declare 'module' variable for hot module replacement (HMR) support
declare const module: NodeJS.Module;

class AppBootstrapper {
  private readonly port: number;

  constructor() {
    this.port = parseInt(process.env.PORT) || 4000;
  }

  public async bootstrap() {
    // Create Nest application instance (Fastify adapter)
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { snapshot: true });

    // Configure Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('Red Steam API')
      .setDescription('A backend API for Red Steam')
      .setVersion('1.0')
      .addCookieAuth('accessToken', {
        type: 'apiKey',
        name: 'accessToken',
        in: 'cookie',
      })
      .addCookieAuth('refreshToken', {
        type: 'apiKey',
        name: 'refreshToken',
        in: 'cookie',
      })
      .build();

    // Configure custom Swagger theme
    const theme = new SwaggerTheme();
    const options: SwaggerCustomOptions = {
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
      jsonDocumentUrl: 'json',
      yamlDocumentUrl: 'yaml',
    };

    // Create Swagger document
    const document = SwaggerModule.createDocument(app, config);

    // Setup Swagger UI endpoint
    SwaggerModule.setup('api', app, document, options);

    // Register configurations and middleware to the application instance
    await AppModule.register(app);

    // Start the Nest application on specified port
    await app.listen(this.port, '0.0.0.0');

    // Enable hot module replacement (HMR) support for development
    if (process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }
}

// Instantiate and run the application
const appBootstrapper = new AppBootstrapper();
appBootstrapper.bootstrap();
