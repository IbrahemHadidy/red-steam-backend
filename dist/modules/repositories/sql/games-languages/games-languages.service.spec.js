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
const _gameslanguagesmodule = require("./games-languages.module");
const _gamespricingmodule = require("../games-pricing/games-pricing.module");
const _gamestagsmodule = require("../games-tags/games-tags.module");
const _gamesmodule = require("../games/games.module");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("./games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("../games/games.service");
describe('gamesLanguagesService', ()=>{
    let gameLanguage;
    let gameLanguage2;
    let game;
    let game2;
    let gamesService;
    let gamesLanguagesService;
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
        gamesLanguagesService = module.get(_gameslanguagesservice.GamesLanguagesService);
        gameLanguage = await gamesLanguagesService.create('Lang1');
        gameLanguage2 = await gamesLanguagesService.create('Lang2');
        game = await gamesService.create({
            name: 'Test Game 1',
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
            languages: [
                {
                    name: gameLanguage.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: gameLanguage2.name,
                    interface: true,
                    fullAudio: false,
                    subtitles: true
                }
            ],
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
            name: 'Test Game 2',
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
            languages: [
                {
                    name: gameLanguage.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: false
                },
                {
                    name: gameLanguage2.name,
                    interface: true,
                    fullAudio: false,
                    subtitles: false
                }
            ],
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
        await gamesLanguagesService.removeAll();
        await gamesService.removeAll();
    });
    describe('getAll', ()=>{
        it('should return an array of game languages', async ()=>{
            const gameLanguages = await gamesLanguagesService.getAll('name', 'ASC');
            expect(gameLanguages.length).toEqual(2);
            expect(game.languages[0]).toEqual(expect.objectContaining({
                name: 'Lang1'
            }));
            expect(game.languages[1]).toEqual(expect.objectContaining({
                name: 'Lang2'
            }));
            expect(game2.languages[0]).toEqual(expect.objectContaining({
                name: 'Lang1'
            }));
            expect(game2.languages[1]).toEqual(expect.objectContaining({
                name: 'Lang2'
            }));
        });
    });
    describe('getById', ()=>{
        it('should return the game languages with the given id', async ()=>{
            const foundGameLanguage = await gamesLanguagesService.getById(gameLanguage.id);
            expect(foundGameLanguage).toEqual(expect.objectContaining({
                name: 'Lang1'
            }));
            expect(gameLanguage);
        });
        it('should throw an error if the game language does not exist', async ()=>{
            await expect(gamesLanguagesService.getById(0)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getByName', ()=>{
        it('should return the game langauge with the given name', async ()=>{
            const foundGameLanguage = await gamesLanguagesService.getByName('Lang1');
            expect(foundGameLanguage).toEqual(expect.objectContaining({
                name: 'Lang1'
            }));
        });
        it('should throw an error if the game language does not exist', async ()=>{
            await expect(gamesLanguagesService.getByName('Lang6')).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getLanguagesPaginated', ()=>{
        it('should return an array of game tags sorted by name', async ()=>{
            const gameLanguages = await gamesLanguagesService.getLanguagesPaginated(0, 10, 'name', 'ASC');
            expect(gameLanguages.items.length).toEqual(2);
            expect(gameLanguages.items[0].name).toEqual('Test1');
            expect(gameLanguages.items[1].name).toEqual('Test2');
        });
        it('should return an array of game tags sorted by id', async ()=>{
            const gameLanguages = await gamesLanguagesService.getLanguagesPaginated(0, 10, 'id', 'ASC');
            expect(gameLanguages.items.length).toEqual(2);
            expect(gameLanguages.items[0].id).toEqual(gameLanguage.id);
            expect(gameLanguages.items[1].id).toEqual(gameLanguage2.id);
        });
        it('should return values with the given search', async ()=>{
            const gameLanguages = await gamesLanguagesService.getLanguagesPaginated(0, 10, 'name', 'ASC', {
                name: 'Test2'
            });
            expect(gameLanguages.items.length).toEqual(1);
            expect(gameLanguages.items[0].name).toEqual('Test2');
        });
    });
    describe('create', ()=>{
        it('should create a new game language', async ()=>{
            const createdGameLanguage = await gamesLanguagesService.create('Lang6');
            expect(createdGameLanguage).toEqual(expect.objectContaining({
                name: 'Lang6'
            }));
        });
        it('should throw an error if the game language name already exists', async ()=>{
            await expect(gamesLanguagesService.create('Lang1')).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('update', ()=>{
        it('should update the game language with the given id', async ()=>{
            const updatedGameLanguage = await gamesLanguagesService.update(gameLanguage2.id, 'Lang6');
            expect(updatedGameLanguage).toEqual(expect.objectContaining({
                name: 'Lang6'
            }));
        });
        it('should throw an error if the game language does not exist', async ()=>{
            await expect(gamesLanguagesService.update(0, 'Lang6')).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('remove', ()=>{
        it('should remove the game langauge with the given id', async ()=>{
            const removedGameLanguage = await gamesLanguagesService.remove(gameLanguage.id);
            const changedGame = await gamesService.getById(game.id);
            expect(removedGameLanguage).toEqual(expect.objectContaining({
                name: 'Lang1'
            }));
            expect(changedGame.languages.length).toEqual(1);
        });
        it('should throw an error if the game langauges does not exist', async ()=>{
            await expect(gamesLanguagesService.remove(0)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('removeAll', ()=>{
        it('should remove all game langauges', async ()=>{
            await gamesLanguagesService.removeAll();
            const gameLanguages = await gamesLanguagesService.getAll('name', 'ASC');
            const changedGame = await gamesService.getById(game.id);
            const changedGame2 = await gamesService.getById(game2.id);
            expect(gameLanguages.length).toEqual(0);
            expect(changedGame.languages.length).toEqual(0);
            expect(changedGame2.languages.length).toEqual(0);
        });
    });
});

//# sourceMappingURL=games-languages.service.spec.js.map