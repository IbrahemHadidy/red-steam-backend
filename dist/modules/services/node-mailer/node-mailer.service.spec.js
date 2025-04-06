"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _mailer = require("@nestjs-modules/mailer");
const _companiesmodule = require("../../repositories/sql/companies/companies.module");
const _gamesfeaturesmodule = require("../../repositories/sql/games-features/games-features.module");
const _gameslanguagesmodule = require("../../repositories/sql/games-languages/games-languages.module");
const _gamespricingmodule = require("../../repositories/sql/games-pricing/games-pricing.module");
const _gamestagsmodule = require("../../repositories/sql/games-tags/games-tags.module");
const _gamesmodule = require("../../repositories/sql/games/games.module");
const _nodemailermodule = require("./node-mailer.module");
const _companiesservice = require("../../repositories/sql/companies/companies.service");
const _gamesfeaturesservice = require("../../repositories/sql/games-features/games-features.service");
const _gamespricingservice = require("../../repositories/sql/games-pricing/games-pricing.service");
const _gamestagsservice = require("../../repositories/sql/games-tags/games-tags.service");
const _gamesservice = require("../../repositories/sql/games/games.service");
const _nodemailerservice = require("./node-mailer.service");
const _companyentity = require("../../repositories/sql/companies/company.entity");
const _gamefeatureentity = require("../../repositories/sql/games-features/game-feature.entity");
const _gamepricingentity = require("../../repositories/sql/games-pricing/game-pricing.entity");
const _gametagentity = require("../../repositories/sql/games-tags/game-tag.entity");
const _gameentity = require("../../repositories/sql/games/game.entity");
const _reviewentity = require("../../repositories/sql/reviews/review.entity");
const _userentity = require("../../repositories/sql/users/user.entity");
describe('NodeMailerService', ()=>{
    let mailer;
    let logger;
    let loggerSpy;
    let game;
    let game2;
    let gamesService;
    beforeAll(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _config.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: [
                        `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
                        `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
                        'src/common/configs/environments/.env'
                    ]
                }),
                _mailer.MailerModule.forRootAsync({
                    imports: [
                        _config.ConfigModule
                    ],
                    useFactory: async (configService)=>({
                            transport: {
                                service: 'gmail',
                                host: 'smtp.gmail.com',
                                secure: false,
                                auth: {
                                    user: configService.get('SMTP_USER'),
                                    pass: configService.get('SMTP_PASSWORD')
                                }
                            }
                        }),
                    inject: [
                        _config.ConfigService
                    ]
                }),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    name: 'sql',
                    useFactory: async (configService)=>({
                            type: 'postgres',
                            url: configService.get('POSTGRESQL_URI'),
                            entities: [
                                _companyentity.Publisher,
                                _companyentity.Developer,
                                _gamefeatureentity.GameFeature,
                                _gamepricingentity.GamePricing,
                                _gametagentity.GameTag,
                                _reviewentity.Review,
                                _userentity.User,
                                _gameentity.Game
                            ],
                            synchronize: true,
                            autoLoadEntities: true
                        })
                }),
                _gamespricingmodule.GamesPricingModule,
                _gamesmodule.GamesModule,
                _companiesmodule.CompaniesModule,
                _gamesfeaturesmodule.GamesFeaturesModule,
                _gamestagsmodule.GamesTagsModule,
                _gameslanguagesmodule.GamesLanguagesModule,
                _nodemailermodule.NodeMailerModule
            ],
            providers: [
                _nodemailerservice.NodeMailerService,
                _common.Logger,
                _config.ConfigService,
                _gamespricingservice.GamesPricingService,
                _gamesservice.GamesService,
                _companiesservice.CompaniesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gamestagsservice.GamesTagsService,
                _common.Logger
            ]
        }).compile();
        gamesService = module.get(_gamesservice.GamesService);
        mailer = module.get(_nodemailerservice.NodeMailerService);
        logger = module.get(_common.Logger);
        game = await gamesService.create({
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
                free: false
            },
            features: [],
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
            legal: 'Test Legal',
            featured: false,
            languages: []
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
                free: false
            },
            features: [],
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
            legal: 'Test Legal',
            languages: [],
            featured: false
        });
    });
    beforeEach(()=>{
        loggerSpy = jest.spyOn(logger, 'log');
    });
    afterEach(()=>{
        loggerSpy.mockRestore();
    });
    describe('sendVerificationEmail', ()=>{
        it('should send the verification email', async ()=>{
            const email = 'w9GhsdgawtgkI@example.com';
            const username = 'testuser';
            const verificationToken = 'verificationToken';
            await mailer.sendVerificationEmail(email, username, verificationToken);
            expect(loggerSpy).toHaveBeenCalledWith(`Verification email sent to ${email}`);
        });
    });
    describe('sendPasswordResetEmail', ()=>{
        it('should send the password reset email', async ()=>{
            const email = 'w9GhsdgawtgkI@example.com';
            const username = 'testuser';
            const resetToken = 'resetToken';
            await mailer.sendPasswordResetEmail(email, username, resetToken);
            expect(loggerSpy).toHaveBeenCalledWith(`Password reset email sent to ${email}`);
        });
    });
    describe('sendPaymentConfirmationEmail', ()=>{
        it('should send the payment confirmation email', async ()=>{
            const email = 'w9GhsdgawtgkI@example.com';
            const data = {
                orderId: 'paymentId',
                accountName: 'accountName',
                games: [
                    game,
                    game2
                ]
            };
            await mailer.sendPaymentConfirmationEmail(email, data);
            expect(loggerSpy).toHaveBeenCalledWith(`Payment confirmation email sent to ${email}`);
        });
    });
});

//# sourceMappingURL=node-mailer.service.spec.js.map