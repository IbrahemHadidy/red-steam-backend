"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jwt = require("@nestjs/jwt");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _tokenblacklistmodule = require("../../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamestagsmodule = require("../../../repositories/sql/games-tags/games-tags.module");
const _reviewsmodule = require("../../../repositories/sql/reviews/reviews.module");
const _usersmodule = require("../../../repositories/sql/users/users.module");
const _nodemailermodule = require("../../../services/node-mailer/node-mailer.module");
const _authservice = require("../auth/auth.service");
const _paymentservice = require("../payment/payment.service");
const _tokenblacklistservice = require("../../../repositories/mongo/token-blacklist/token-blacklist.service");
const _companiesservice = require("../../../repositories/sql/companies/companies.service");
const _gamesfeaturesservice = require("../../../repositories/sql/games-features/games-features.service");
const _gameslanguagesservice = require("../../../repositories/sql/games-languages/games-languages.service");
const _gamespricingservice = require("../../../repositories/sql/games-pricing/games-pricing.service");
const _gamestagsservice = require("../../../repositories/sql/games-tags/games-tags.service");
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _usersservice = require("../../../repositories/sql/users/users.service");
const _dropboxservice = require("../../../services/dropbox/dropbox.service");
const _nodemailerservice = require("../../../services/node-mailer/node-mailer.service");
const _paypalservice = require("../../../services/paypal/paypal.service");
describe('PaymentService', ()=>{
    let data;
    let game1;
    let game2;
    let authService;
    let paymentService;
    let usersService;
    let gamesService;
    let tokenBlacklistService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _config.ConfigModule.forRoot(_integrationsetup.environmentConfig),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    name: 'sql',
                    useFactory: async (configService)=>(0, _integrationsetup.getSqlTypeOrmConfig)(configService)
                }),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    useFactory: async (configService)=>(0, _integrationsetup.getMongoTypeOrmConfig)(configService)
                }),
                _usersmodule.UsersModule,
                _gamestagsmodule.GamesTagsModule,
                _nodemailermodule.NodeMailerModule,
                _tokenblacklistmodule.TokenBlacklistModule,
                _reviewsmodule.ReviewsModule
            ],
            providers: [
                _authservice.AuthService,
                _paypalservice.PaypalService,
                _companiesservice.CompaniesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gameslanguagesservice.GamesLanguagesService,
                _gamespricingservice.GamesPricingService,
                _gamestagsservice.GamesTagsService,
                _paymentservice.PaymentService,
                _jwt.JwtService,
                _usersservice.UsersService,
                _gamesservice.GamesService,
                _nodemailerservice.NodeMailerService,
                _config.ConfigService,
                _tokenblacklistservice.TokenBlacklistService,
                _dropboxservice.DropboxService,
                _common.Logger
            ]
        }).compile();
        usersService = module.get(_usersservice.UsersService);
        gamesService = module.get(_gamesservice.GamesService);
        tokenBlacklistService = module.get(_tokenblacklistservice.TokenBlacklistService);
        paymentService = module.get(_paymentservice.PaymentService);
        authService = module.get(_authservice.AuthService);
        // register a user and login to get data sample for testing
        await authService.signup({
            username: 'test',
            email: 'test@test.com',
            password: 'password',
            country: 'test'
        });
        data = await authService.login({
            identifier: 'test',
            password: 'password',
            rememberMe: true
        });
        await usersService.verify(data.userData.id);
        data = await authService.login({
            identifier: 'test',
            password: 'password',
            rememberMe: true
        });
        game1 = await gamesService.create({
            name: 'Test Game',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2022-01-01'),
            publishers: [],
            developers: [],
            thumbnailEntries: {
                mainImage: null,
                backgroundImage: null,
                menuImg: null,
                horizontalHeaderImage: null,
                verticalHeaderImage: null,
                smallHeaderImage: null,
                searchImage: null,
                tabImage: null
            },
            imageEntries: [],
            videoEntries: [],
            tags: [],
            pricing: {
                free: false,
                discount: false,
                basePrice: 5,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-10-30'),
                offerType: 'SPECIAL PROMOTION'
            },
            features: [],
            languages: [],
            platformEntries: {
                win: true,
                mac: false
            },
            link: 'Test Link',
            about: 'Test About',
            mature: false,
            matureDescription: 'Test Mature Description',
            systemRequirements: {
                mini: {},
                recommended: {}
            },
            legal: 'Test Legal'
        });
        game2 = await gamesService.create({
            name: 'Test Game2',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2022-01-02'),
            publishers: [],
            developers: [],
            thumbnailEntries: {
                mainImage: null,
                backgroundImage: null,
                menuImg: null,
                horizontalHeaderImage: null,
                verticalHeaderImage: null,
                smallHeaderImage: null,
                searchImage: null,
                tabImage: null
            },
            imageEntries: [],
            videoEntries: [],
            tags: [],
            pricing: {
                free: false,
                discount: true,
                basePrice: 10,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-11-30'),
                offerType: 'WEEKEND DEAL'
            },
            features: [],
            languages: [],
            platformEntries: {
                win: true,
                mac: false
            },
            link: 'Test Link',
            about: 'Test About',
            mature: false,
            matureDescription: 'Test Mature Description',
            systemRequirements: {
                mini: {},
                recommended: {}
            },
            legal: 'Test Legal'
        });
    });
    afterEach(async ()=>{
        await usersService.removeAll();
        await gamesService.removeAll();
        await tokenBlacklistService.clearAll();
    });
    describe('createOrder', ()=>{
        it('should create an order successfully', async ()=>{
            // Call createOrder function
            const result = await paymentService.createOrder({
                userId: data.userData.id,
                totalPrice: 10.0,
                cartItems: [
                    game1.id,
                    game2.id
                ]
            });
            // Assertions
            expect(result).toEqual({
                orderId: expect.any(String),
                approvalUrl: expect.any(String),
                orderData: {
                    userId: data.userData.id,
                    totalPrice: 10.0,
                    cartItems: [
                        game1.id,
                        game2.id
                    ]
                }
            });
        });
        it('should throw an BadRequestException if some games are in library', async ()=>{
            // Add games to library
            await usersService.addItemsToLibrary(data.userData.id, [
                game1.id
            ]);
            // Call createOrder function
            await expect(paymentService.createOrder({
                userId: data.userData.id,
                totalPrice: 10.0,
                cartItems: [
                    game1.id,
                    game2.id
                ]
            })).rejects.toThrow(_common.BadRequestException);
        });
    });
    describe('captureOrder', ()=>{
        it('should capture an order successfully', async ()=>{
            // Create an order
            const order = await paymentService.createOrder({
                userId: data.userData.id,
                totalPrice: 10.0,
                cartItems: [
                    game1.id,
                    game2.id
                ]
            });
            // Get approval URL
            const approvalUrl = order.approvalUrl;
            // Log the approval URL and wait for manual approval
            console.log('\x1b[33m%s\x1b[0m', `
                \x1b[33m╔═══════════════════════════════════════════════════════════════════════╗
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mPlease manually approve the order by visiting the following URL:\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ║  \x1b[34m\x1b[1m${approvalUrl}\x1b[0m\x1b[33m   ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mUse the following credentials for approval:\x1b[0m\x1b[33m                          ║
                ║  \x1b[1mBuyer Email:\x1b[0m \x1b[32msb-gc21b29998568@business.example.com\x1b[33m                   ║
                ║  \x1b[1mBuyer Password:\x1b[0m \x1b[32m';>7GL;d\x1b[33m                                             ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[31mYou have 1 minute to approve the order, else the test will fail.\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ╚═══════════════════════════════════════════════════════════════════════╝\x1b[0m
        `);
            // Wait for manual approval (adjust the timeout as necessary)
            await new Promise((resolve)=>setTimeout(resolve, 60000)); // Wait for 1 minute
            // Call captureOrder function
            const result = await paymentService.captureOrder({
                orderId: order.orderId,
                userId: data.userData.id,
                cartItems: [
                    game1.id,
                    game2.id
                ]
            });
            // Assertions
            expect(result).toEqual({
                status: expect.any(String),
                orderId: expect.any(String),
                payerName: expect.any(String)
            });
        }, 90000);
    });
});

//# sourceMappingURL=admin.service.spec.js.map