"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _core = require("@nestjs/core");
const _cookie = /*#__PURE__*/ _interop_require_default(require("@fastify/cookie"));
const _static = /*#__PURE__*/ _interop_require_default(require("@fastify/static"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("@fastify/helmet"));
const _multipart = require("@fastify/multipart");
const _exceptioninterceptor = require("../common/interceptors/exception.interceptor");
const _loggermiddleware = require("../common/middlewares/logger.middleware");
const _apismodule = require("./apis/apis.module");
const _repositoriesmodule = require("./repositories/repositories.module");
const _servicesmodule = require("./services/services.module");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
    // This method used to register global middlewares on main.ts and e2e tests
    static async register(app) {
        const configService = app.get(_config.ConfigService);
        // Register Redis plugin for direct Redis interactions
        // await app.register(fastifyRedis, {
        //   host: configService.get<string>('REDIS_HOST'),
        //   port: configService.get<number>('REDIS_PORT'),
        //   password: configService.get<string>('REDIS_PASSWORD'),
        // });
        // Register fastify-static (to serve static files)
        app.register(_static.default, {
            root: _path.default.join(__dirname, 'public'),
            prefix: '/public/'
        });
        // Register helmet (to set security headers)
        await app.register(_helmet.default);
        // Register the multipart plugin (to handle file uploads)
        await app.register(_multipart.fastifyMultipart);
        // Register fastify-cookie (to handle cookies)
        await app.register(_cookie.default, {
            secret: configService.get('COOKIE_SECRET'),
            parseOptions: {}
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
            origin: [
                process.env.FRONT_URL,
                process.env.BASE_URL
            ],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
            maxAge: 3600
        });
        return app;
    }
    // Configure the logger middleware for all routes
    configure(consumer) {
        consumer.apply(_loggermiddleware.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
                    `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
                    'src/common/configs/environments/.env'
                ]
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
            _repositoriesmodule.RepositoriesModule,
            _servicesmodule.ServicesModule,
            _apismodule.ApisModule
        ],
        providers: [
            // Use Exception Interceptor
            {
                provide: _core.APP_INTERCEPTOR,
                useClass: _exceptioninterceptor.ExceptionInterceptor
            },
            // Use Validation Pipe
            {
                provide: _core.APP_PIPE,
                useClass: _common.ValidationPipe,
                useValue: {
                    transform: true,
                    whitelist: true,
                    forbidNonWhitelisted: true
                }
            },
            _common.Logger
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map