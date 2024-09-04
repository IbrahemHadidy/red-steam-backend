// NestJS
import { NestFactory } from '@nestjs/core';

// Main entry point of the application (App Module)
import { AppModule } from '@modules/app.module';

// Fastify
import { FastifyAdapter } from '@nestjs/platform-fastify';

// Swagger
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

// Types
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

// Declare 'module' variable for hot module replacement (HMR) support
declare const module: {
  hot: { reload: () => void; dispose: (func: () => void) => void; status: () => string; accept: () => void };
};

class AppBootstrapper {
  private readonly port: number;

  constructor() {
    this.port = parseInt(process.env.PORT) || 4000;
  }

  public async bootstrap() {
    // Create Nest application instance
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { snapshot: true });

    // Register other configurations and middleware
    await AppModule.register(app);

    // Configure Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('Red Steam API')
      .setDescription('A backend API for Red Steam')
      .setVersion('1.0')
      .addApiKey({ type: 'apiKey', name: 'authorization' }, 'access-token')
      .addApiKey({ type: 'apiKey', name: 'x-refresh-token' }, 'refresh-token')
      .build();

    // Configure custom Swagger theme
    const theme = new SwaggerTheme();
    const options: SwaggerCustomOptions = {
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    };

    // Create Swagger document
    const document = SwaggerModule.createDocument(app, config);

    // Setup Swagger UI endpoint
    SwaggerModule.setup('api', app, document, options);

    // Start the Nest application on specified port
    await app.listen(this.port);

    // Enable hot module replacement (HMR) support for development
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }
}

// Instantiate and run the application
const appBootstrapper = new AppBootstrapper();
appBootstrapper.bootstrap();
