import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from '@modules/app.module';

// Declare 'module' variable for hot module replacement (HMR) support
declare const module: any;

// Bootstrap function to initialize the NestJS application
async function bootstrap() {
  // Create Nest application instance
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { snapshot: true });

  // Register other configurations and middleware
  await AppModule.register(app);

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Red Steam API') // Set title of the API documentation
    .setDescription('A backend API for Red Steam') // Set description of the API
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

  // Start the Nest application on specified port (or default to 4000)
  await app.listen(parseInt(process.env.PORT) || 4000);

  // Enable hot module replacement (HMR) support for development
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

// Call the bootstrap function to start the Nest application
bootstrap();
