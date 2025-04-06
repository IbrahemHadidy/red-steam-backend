"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _crypto = require("crypto");
const _companiesmodule = require("../companies/companies.module");
const _gamesfeaturesmodule = require("../games-features/games-features.module");
const _gameslanguagesmodule = require("../games-languages/games-languages.module");
const _gamespricingmodule = require("../games-pricing/games-pricing.module");
const _gamestagsmodule = require("../games-tags/games-tags.module");
const _gamesmodule = require("../games/games.module");
const _reviewsmodule = require("./reviews.module");
const _usersmodule = require("../users/users.module");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("../games/games.service");
const _reviewsservice = require("./reviews.service");
const _usersservice = require("../users/users.service");
describe('gamesService', ()=>{
    let game;
    let game2;
    let game3;
    let user;
    let user2;
    let user3;
    let review;
    let review2;
    let review3;
    let review4;
    let gamesService;
    let usersService;
    let reviewsService;
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
                _gamestagsmodule.GamesTagsModule,
                _usersmodule.UsersModule,
                _reviewsmodule.ReviewsModule
            ],
            providers: [
                _gamespricingservice.GamesPricingService,
                _gamesservice.GamesService,
                _companiesservice.CompaniesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gameslanguagesservice.GamesLanguagesService,
                _gamestagsservice.GamesTagsService,
                _usersservice.UsersService,
                _reviewsservice.ReviewsService,
                _common.Logger
            ]
        }).compile();
        gamesService = module.get(_gamesservice.GamesService);
        usersService = module.get(_usersservice.UsersService);
        reviewsService = module.get(_reviewsservice.ReviewsService);
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
        game3 = await gamesService.create({
            name: 'Test Game3',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2022-01-03'),
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
        user = await usersService.create({
            username: 'test',
            email: 'test@test.com',
            password: 'password',
            country: 'test'
        });
        user2 = await usersService.create({
            username: 'test2',
            email: 'test2@test.com',
            password: 'password',
            country: 'test'
        });
        user3 = await usersService.create({
            username: 'test3',
            email: 'test3@test.com',
            password: 'password',
            country: 'test'
        });
        review = await reviewsService.create({
            userId: user.id,
            gameId: game.id,
            positive: true,
            content: 'Test Content'
        });
        review2 = await reviewsService.create({
            userId: user.id,
            gameId: game2.id,
            positive: false,
            content: 'Test Content 2'
        });
        review3 = await reviewsService.create({
            userId: user2.id,
            gameId: game.id,
            positive: false,
            content: 'Test Content 3'
        });
        review4 = await reviewsService.create({
            userId: user2.id,
            gameId: game2.id,
            positive: true,
            content: 'Test Content 4'
        });
    });
    afterEach(async ()=>{
        await reviewsService.removeAll();
        await gamesService.removeAll();
        await usersService.removeAll();
    });
    describe('getAll', ()=>{
        it('should return all reviews', async ()=>{
            const reviews = await reviewsService.getAll('date', 'DESC');
            // Assertions
            expect(reviews.length).toBe(4);
        });
    });
    describe('getAllPositive', ()=>{
        it('should return all positive reviews', async ()=>{
            const reviews = await reviewsService.getAllPositive('date', 'DESC');
            // Assertions
            expect(reviews.length).toBe(2);
        });
    });
    describe('getAllNegative', ()=>{
        it('should return all negative reviews', async ()=>{
            const reviews = await reviewsService.getAllNegative('date', 'DESC');
            // Assertions
            expect(reviews.length).toBe(2);
        });
    });
    describe('getById', ()=>{
        it('should return review by id', async ()=>{
            const result = await reviewsService.getById(review.id);
            // Assertions
            expect(result.id).toBe(review.id);
        });
        it('should throw NotFoundException if review does not exist', async ()=>{
            await expect(reviewsService.getById(999)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getByGameId', ()=>{
        it('should return all reviews by game id', async ()=>{
            const result = await reviewsService.getByGameId(game.id, 'all', 'newest');
            // Assertions
            expect(result.length).toBe(2);
        });
        it('should return all positive reviews by game id', async ()=>{
            const result = await reviewsService.getByGameId(game.id, 'positive', 'newest');
            // Assertions
            expect(result.length).toBe(1);
        });
        it('should return all negative reviews by game id', async ()=>{
            const result = await reviewsService.getByGameId(game.id, 'negative', 'newest');
            // Assertions
            expect(result.length).toBe(1);
        });
    });
    describe('getByUserId', ()=>{
        it('should return all reviews by user id', async ()=>{
            const result = await reviewsService.getByUserId(user.id, 'all', 'newest');
            // Assertions
            expect(result.length).toBe(2);
        });
        it('should return all positive reviews by user id', async ()=>{
            const result = await reviewsService.getByUserId(user.id, 'positive', 'newest');
            // Assertions
            expect(result.length).toBe(1);
        });
        it('should return all negative reviews by user id', async ()=>{
            const result = await reviewsService.getByUserId(user.id, 'negative', 'newest');
            // Assertions
            expect(result.length).toBe(1);
        });
    });
    describe('getReviewsPaginated', ()=>{
        it('should return an array of game reviews sorted by id', async ()=>{
            const reviews = await reviewsService.getReviewsPaginated(0, 10, 'id', 'ASC');
            expect(reviews.items.length).toEqual(4);
            expect(reviews.items[0].id).toEqual(review.id);
            expect(reviews.items[1].id).toEqual(review2.id);
            expect(reviews.items[2].id).toEqual(review3.id);
            expect(reviews.items[3].id).toEqual(review4.id);
        });
        it('should return an array of game reviews sorted by username', async ()=>{
            const reviews = await reviewsService.getReviewsPaginated(0, 10, 'username', 'ASC');
            expect(reviews.items.length).toEqual(4);
            expect(reviews.items[0].user.username).toEqual('test');
            expect(reviews.items[1].user.username).toEqual('test');
            expect(reviews.items[2].user.username).toEqual('test2');
            expect(reviews.items[3].user.username).toEqual('test2');
        });
        it('should return an array of game reviews sorted by gameName', async ()=>{
            const reviews = await reviewsService.getReviewsPaginated(0, 10, 'gameName', 'ASC');
            expect(reviews.items.length).toEqual(4);
            expect(reviews.items[0].game.name).toEqual('Test Game');
            expect(reviews.items[1].game.name).toEqual('Test Game');
            expect(reviews.items[2].game.name).toEqual('Test Game2');
            expect(reviews.items[3].game.name).toEqual('Test Game2');
        });
        it('should return an array of game reviews sorted by positive', async ()=>{
            const reviews = await reviewsService.getReviewsPaginated(0, 10, 'rating', 'ASC');
            expect(reviews.items.length).toEqual(4);
            expect(reviews.items[2].positive).toEqual(true);
            expect(reviews.items[3].positive).toEqual(true);
            expect(reviews.items[0].positive).toEqual(false);
            expect(reviews.items[1].positive).toEqual(false);
        });
        it('should return values with the given search', async ()=>{
            const reviews = await reviewsService.getReviewsPaginated(0, 10, 'content', 'ASC', {
                content: 'Test Content 3'
            });
            expect(reviews.items.length).toEqual(1);
            expect(reviews.items[0].content).toEqual('Test Content 3');
        });
    });
    describe('create', ()=>{
        it('should create a review', async ()=>{
            const result = await reviewsService.create({
                userId: user3.id,
                gameId: game3.id,
                positive: true,
                content: 'Test Content'
            });
            // Assertions
            expect(result.id).toBeDefined();
        });
        it('should throw ConflictException if user already reviewed the game', async ()=>{
            await expect(reviewsService.create({
                userId: user.id,
                gameId: game.id,
                positive: true,
                content: 'Test Content'
            })).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('update', ()=>{
        it('should update a review', async ()=>{
            const result = await reviewsService.update(review2.id, {
                positive: true,
                content: 'Test Content Updated'
            });
            // Assertions
            expect(result.content).toBe('Test Content Updated');
            expect(result.positive).toBe(true);
        });
        it('should throw NotFoundException if review does not exist', async ()=>{
            await expect(reviewsService.update(999, {
                positive: true,
                content: 'Test Content Updated'
            })).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('remove', ()=>{
        it('should remove a review', async ()=>{
            const result = await reviewsService.remove(review3.id);
            const result2 = await reviewsService.remove(review4.id);
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                id: review3.id,
                content: 'Test Content 3',
                positive: false
            }));
            expect(result2).toEqual(expect.objectContaining({
                id: review4.id,
                content: 'Test Content 4',
                positive: true
            }));
        });
        it('should throw NotFoundException if review does not exist', async ()=>{
            await expect(reviewsService.remove(999)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('removeAllUserReviews', ()=>{
        it('should remove all reviews by user', async ()=>{
            await reviewsService.removeAllUserReviews(user.id);
            const allReviews = await reviewsService.getByUserId(user.id, 'all', 'newest');
            // Assertions
            expect(allReviews).toEqual([]);
        });
        it('should throw NotFoundException if user does not exist', async ()=>{
            await expect(reviewsService.removeAllUserReviews((0, _crypto.randomUUID)())).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('removeAllGameReviews', ()=>{
        it('should remove all reviews by game', async ()=>{
            await reviewsService.removeAllGameReviews(game.id);
            const allReviews = await reviewsService.getByGameId(game.id, 'all', 'newest');
            // Assertions
            expect(allReviews).toEqual([]);
        });
        it('should throw NotFoundException if game does not exist', async ()=>{
            await expect(reviewsService.removeAllGameReviews(999)).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('removeAll', ()=>{
        it('should remove all reviews', async ()=>{
            await reviewsService.removeAll();
            const allReviews = await reviewsService.getAll('date', 'DESC');
            // Assertions
            expect(allReviews).toEqual([]);
        });
    });
});

//# sourceMappingURL=reviews.service.spec.js.map