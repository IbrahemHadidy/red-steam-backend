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
const _gamespricingmodule = require("../games-pricing/games-pricing.module");
const _gamestagsmodule = require("../games-tags/games-tags.module");
const _gamesmodule = require("./games.module");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("./games.service");
describe('gamesService', ()=>{
    let game;
    let game2;
    let gamesService;
    let gamesTagsService;
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
                _gamesfeaturesmodule.GamesFeaturesModule,
                _gameslanguagesmodule.GamesLanguagesModule,
                _gamestagsmodule.GamesTagsModule
            ],
            providers: [
                _companiesservice.CompaniesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gamespricingservice.GamesPricingService,
                _gamestagsservice.GamesTagsService,
                _gamesservice.GamesService,
                _gameslanguagesservice.GamesLanguagesService,
                _common.Logger
            ]
        }).compile();
        gamesService = module.get(_gamesservice.GamesService);
        gamesTagsService = module.get(_gamestagsservice.GamesTagsService);
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
                free: false,
                price: 10
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
            legal: 'Test Legal',
            featured: false
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
                price: 10
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
            legal: 'Test Legal',
            featured: false
        });
    });
    afterEach(async ()=>{
        await gamesService.removeAll();
        await gamesTagsService.removeAll();
    });
    describe('getAll', ()=>{
        it('should return all games', async ()=>{
            const games = await gamesService.getAll('id', 'ASC');
            expect(games).toHaveLength(2);
        });
    });
    describe('getById', ()=>{
        it('should return game by id', async ()=>{
            const result = await gamesService.getById(game.id);
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                id: game.id,
                name: game.name,
                category: game.category,
                description: game.description,
                releaseDate: game.releaseDate,
                publishers: [],
                developers: [],
                thumbnailEntries: game.thumbnailEntries,
                imageEntries: [],
                videoEntries: [],
                tags: [],
                pricing: expect.objectContaining({
                    free: game.pricing.free,
                    discount: game.pricing.discount,
                    basePrice: game.pricing.basePrice,
                    discountPrice: game.pricing.discountPrice,
                    discountStartDate: game.pricing.discountStartDate,
                    discountEndDate: game.pricing.discountEndDate,
                    discountPercentage: game.pricing.discountPercentage,
                    offerType: game.pricing.offerType
                }),
                platformEntries: game.platformEntries,
                link: game.link,
                about: game.about,
                mature: game.mature,
                matureDescription: game.matureDescription,
                systemRequirements: game.systemRequirements,
                legal: game.legal,
                averageRating: game.averageRating,
                reviewsCount: game.reviewsCount,
                reviews: []
            }));
        });
        it('should throw NotFoundException if game is not found', async ()=>{
            await expect(gamesService.getById(0)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getByName', ()=>{
        it('should return game by name', async ()=>{
            const result = await gamesService.getByName(game.name);
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                id: game.id,
                name: game.name,
                category: game.category,
                description: game.description,
                releaseDate: game.releaseDate,
                publishers: [],
                developers: [],
                thumbnailEntries: game.thumbnailEntries,
                imageEntries: [],
                videoEntries: [],
                tags: [],
                pricing: expect.objectContaining({
                    free: game.pricing.free,
                    discount: game.pricing.discount,
                    basePrice: game.pricing.basePrice,
                    discountPrice: game.pricing.discountPrice,
                    discountStartDate: game.pricing.discountStartDate,
                    discountEndDate: game.pricing.discountEndDate,
                    discountPercentage: game.pricing.discountPercentage,
                    offerType: game.pricing.offerType
                }),
                platformEntries: game.platformEntries,
                link: game.link,
                about: game.about,
                mature: game.mature,
                matureDescription: game.matureDescription,
                systemRequirements: game.systemRequirements,
                legal: game.legal,
                averageRating: game.averageRating,
                reviewsCount: game.reviewsCount,
                reviews: []
            }));
        });
        it('should throw NotFoundException if game is not found', async ()=>{
            await expect(gamesService.getByName('Test Game3')).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('create', ()=>{
        it('should create new game', async ()=>{
            const newGame = await gamesService.create({
                name: 'Test Game3',
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
                    price: 100
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
                legal: 'Test Legal',
                featured: false
            });
            // Assertions
            expect(newGame).toEqual(expect.objectContaining({
                name: 'Test Game3',
                pricing: expect.objectContaining({
                    basePrice: expect.any(Number)
                })
            }));
        });
        it('should throw ConflictException if game already exists', async ()=>{
            await expect(gamesService.create({
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
                    price: 10
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
                legal: 'Test Legal',
                featured: false
            })).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('update', ()=>{
        it('should update game', async ()=>{
            const updatedGame = await gamesService.update(game2.id, {
                name: 'Test Game3',
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
            // Assertions
            expect(updatedGame).toEqual(expect.objectContaining({
                name: 'Test Game3',
                pricing: expect.objectContaining({
                    basePrice: expect.any(Number)
                })
            }));
        });
        it('should throw NotFoundException if game does not exist', async ()=>{
            await expect(gamesService.update(99999, {
                name: 'Test Game3'
            })).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('updateSales', ()=>{
        it('should update game sales', async ()=>{
            const updatedGame = await gamesService.updateSales([
                game2.id,
                game.id
            ]);
            // Assertions
            expect(updatedGame).toEqual(expect.objectContaining([
                {
                    name: game2.name,
                    totalSales: 1
                },
                {
                    name: game.name,
                    totalSales: 1
                }
            ]));
        });
    });
    describe('remove', ()=>{
        it('should remove the game with the given id', async ()=>{
            const removedGame = await gamesService.remove(game.id);
            // Assertions
            expect(removedGame).toEqual(expect.objectContaining({
                name: 'Test Game',
                pricing: expect.objectContaining({
                    basePrice: expect.any(Number)
                })
            }));
        });
    });
    describe('removeAll', ()=>{
        it('should remove all games', async ()=>{
            await gamesService.removeAll();
            const allGames = await gamesService.getAll('name', 'ASC');
            // Assertions
            expect(allGames).toEqual([]);
        });
    });
});

//# sourceMappingURL=games.service.spec.js.map