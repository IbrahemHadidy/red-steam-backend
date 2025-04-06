// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./modules/app.module");
const _platformfastify = require("@nestjs/platform-fastify");
const _swagger = require("@nestjs/swagger");
const _swaggerthemes = require("swagger-themes");
let AppBootstrapper = class AppBootstrapper {
    constructor(){
        this.port = parseInt(process.env.PORT) || 4000;
    }
    async bootstrap() {
        // Create Nest application instance (Fastify adapter)
        const app = await _core.NestFactory.create(_appmodule.AppModule, new _platformfastify.FastifyAdapter(), {
            snapshot: true
        });
        // Configure Swagger documentation
        const config = new _swagger.DocumentBuilder().setTitle('Red Steam API').setDescription('A backend API for Red Steam').setVersion('1.0').addCookieAuth('accessToken', {
            type: 'apiKey',
            name: 'accessToken',
            in: 'cookie'
        }).addCookieAuth('refreshToken', {
            type: 'apiKey',
            name: 'refreshToken',
            in: 'cookie'
        }).build();
        // Configure custom Swagger theme
        const theme = new _swaggerthemes.SwaggerTheme();
        const options = {
            customCss: theme.getBuffer(_swaggerthemes.SwaggerThemeNameEnum.DARK),
            jsonDocumentUrl: 'json',
            yamlDocumentUrl: 'yaml'
        };
        // Create Swagger document
        const document = _swagger.SwaggerModule.createDocument(app, config);
        // Setup Swagger UI endpoint
        _swagger.SwaggerModule.setup('api', app, document, options);
        // Register configurations and middleware to the application instance
        await _appmodule.AppModule.register(app);
        // Start the Nest application on specified port
        await app.listen(this.port, '0.0.0.0');
        // Enable hot module replacement (HMR) support for development
        if (process.env.NODE_ENV === 'development' && module.hot) {
            module.hot.accept();
            module.hot.dispose(()=>app.close());
        }
    }
};
// Instantiate and run the application
const appBootstrapper = new AppBootstrapper();
appBootstrapper.bootstrap();

//# sourceMappingURL=main.js.map