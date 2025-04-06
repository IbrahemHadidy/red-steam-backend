"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _companiesmodule = require("../companies/companies.module");
const _gamesfeaturesmodule = require("../games-features/games-features.module");
const _gameslanguagesmodule = require("../games-languages/games-languages.module");
const _gamespricingmodule = require("./games-pricing.module");
const _gamestagsmodule = require("../games-tags/games-tags.module");
const _gamesmodule = require("../games/games.module");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("./games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("../games/games.service");
const _gameentity = require("../games/game.entity");
describe('gamePricingService', ()=>{
    let game;
    let game2;
    let gamePricing;
    let gamePricing2;
    let gamesService;
    let gamesPricingService;
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
                _gamespricingmodule.GamesPricingModule,
                _gamesmodule.GamesModule,
                _companiesmodule.CompaniesModule,
                _gameslanguagesmodule.GamesLanguagesModule,
                _gamesfeaturesmodule.GamesFeaturesModule,
                _gamestagsmodule.GamesTagsModule
            ],
            providers: [
                _gamespricingservice.GamesPricingService,
                _gamesservice.GamesService,
                _companiesservice.CompaniesService,
                _gameslanguagesservice.GamesLanguagesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gamestagsservice.GamesTagsService,
                _common.Logger
            ]
        }).compile();
        gamesService = module.get(_gamesservice.GamesService);
        gamesPricingService = module.get(_gamespricingservice.GamesPricingService);
        game = await gamesService.create({
            name: 'Test Game',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date(),
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
                basePrice: 10,
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
            releaseDate: new Date(),
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
        gamePricing = game.pricing;
        gamePricing2 = game2.pricing;
    });
    afterEach(async ()=>{
        await gamesService.removeAll();
    });
    describe('getAll', ()=>{
        it('should return all pricings', async ()=>{
            const pricings = await gamesPricingService.getAll('id', 'ASC');
            // Assertions
            expect(pricings.length).toBe(2);
        });
    });
    describe('getById', ()=>{
        it('should return the pricing with the given id', async ()=>{
            const pricing = await gamesPricingService.getById(gamePricing.id);
            // Assertions
            expect(pricing.id).toBe(gamePricing.id);
        });
        it('should throw NotFoundException if pricing is not found', async ()=>{
            await expect(gamesPricingService.getById(9999)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getByGameId', ()=>{
        it('should return the pricing with the given game id', async ()=>{
            const pricing = await gamesPricingService.getByGameId(game.id);
            // Assertions
            expect(pricing.id).toBe(gamePricing.id);
        });
        it('should throw NotFoundException if pricing is not found', async ()=>{
            await expect(gamesPricingService.getByGameId(9999)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getGamesByPricing', ()=>{
        it('should return the games with the given pricing options', async ()=>{
            const games = await gamesPricingService.getGamesByPricing({
                free: false,
                discount: false,
                sortBy: 'basePrice',
                sortOrder: 'ASC',
                minPrice: 0,
                maxPrice: 100,
                skip: 0,
                take: 10
            });
            // Assertions
            expect(games.length).toBe(2);
        });
        it('should throw BadRequestException if game is free and discounted', async ()=>{
            await expect(gamesPricingService.getGamesByPricing({
                free: true,
                discount: true,
                sortBy: 'basePrice',
                sortOrder: 'ASC',
                minPrice: 0,
                maxPrice: 100,
                skip: 0,
                take: 10
            })).rejects.toThrow(_common.BadRequestException);
        });
    });
    describe('create', ()=>{
        it('should create a new game pricing', async ()=>{
            const pricing = await gamesPricingService.create({
                free: false,
                basePrice: 10,
                discount: true,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-12-31'),
                offerType: 'SPECIAL PROMOTION',
                game: new _gameentity.Game()
            });
            // Assertions
            expect(pricing).toEqual(expect.objectContaining({
                free: false,
                basePrice: 10,
                discountPrice: 5,
                discountEndDate: new Date('2024-12-31'),
                offerType: 'SPECIAL PROMOTION'
            }));
        });
    });
    describe('update', ()=>{
        it('should update the game pricing with the given id', async ()=>{
            const updatedPricing = await gamesPricingService.update(gamePricing2.id, {
                free: true,
                basePrice: 10,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-12-31'),
                offerType: 'SPECIAL PROMOTION'
            });
            // Assertions
            expect(updatedPricing).toEqual(expect.objectContaining({
                free: true,
                basePrice: 0
            }));
        });
        it('should throw NotFoundException if game pricing is not found', async ()=>{
            await expect(gamesPricingService.update(9999, {
                free: true,
                basePrice: 10,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-12-31'),
                offerType: 'SPECIAL PROMOTION'
            })).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('remove', ()=>{
        it('should remove the game pricing with the given id', async ()=>{
            await gamesService.remove(game.id);
            const pricings = await gamesPricingService.getAll('id', 'ASC');
            // Assertions
            expect(pricings.length).toBe(1);
        });
        it('should throw NotFoundException if game pricing is not found', async ()=>{
            await expect(gamesPricingService.remove(9999)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('removeAll', ()=>{
        it('should remove all game pricings', async ()=>{
            await gamesService.removeAll();
            const pricings = await gamesPricingService.getAll('id', 'ASC');
            // Assertions
            expect(pricings.length).toBe(0);
        });
    });
});

//# sourceMappingURL=games-pricing.service.spec.js.map