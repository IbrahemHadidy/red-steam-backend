"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _gamesmodule = require("./games.module");
const _reviewsmodule = require("../reviews/reviews.module");
const _usersmodule = require("../users/users.module");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("./games.service");
const _searchservice = require("./search.service");
const _reviewsservice = require("../reviews/reviews.service");
const _usersservice = require("../users/users.service");
const _dropboxservice = require("../../../services/dropbox/dropbox.service");
describe('GameService', ()=>{
    let searchService;
    let gamesService;
    let usersService;
    let companiesService;
    let featuresService;
    let gamesLanguagesService;
    let gamesTagsService;
    let reviewsService;
    let game1;
    let game2;
    let game3;
    let game4;
    let game5;
    let game6;
    let user1;
    let user2;
    let user3;
    let user4;
    let user5;
    let user6;
    let dev1;
    let dev2;
    let dev3;
    let dev4;
    let dev5;
    let dev6;
    let pub1;
    let pub2;
    let pub3;
    let pub4;
    let pub5;
    let pub6;
    let feature1;
    let feature2;
    let feature3;
    let feature4;
    let feature5;
    let feature6;
    let language1;
    let language2;
    let language3;
    let language4;
    let language5;
    let language6;
    let tag1;
    let tag2;
    let tag3;
    let tag4;
    let tag5;
    let tag6;
    let tag7;
    let tag8;
    let tag9;
    beforeAll(async ()=>{
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
                _usersmodule.UsersModule,
                _gamesmodule.GamesModule,
                _reviewsmodule.ReviewsModule
            ],
            providers: [
                _searchservice.SearchService,
                _usersservice.UsersService,
                _gamesservice.GamesService,
                _companiesservice.CompaniesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gamespricingservice.GamesPricingService,
                _gamestagsservice.GamesTagsService,
                _gameslanguagesservice.GamesLanguagesService,
                _reviewsservice.ReviewsService,
                _dropboxservice.DropboxService,
                _common.Logger
            ]
        }).compile();
        searchService = module.get(_searchservice.SearchService);
        usersService = module.get(_usersservice.UsersService);
        gamesService = module.get(_gamesservice.GamesService);
        featuresService = module.get(_gamesfeaturesservice.GamesFeaturesService);
        gamesLanguagesService = module.get(_gameslanguagesservice.GamesLanguagesService);
        gamesTagsService = module.get(_gamestagsservice.GamesTagsService);
        companiesService = module.get(_companiesservice.CompaniesService);
        reviewsService = module.get(_reviewsservice.ReviewsService);
        // Create some test users
        user1 = await usersService.create({
            username: 'test user 1',
            email: 'test@test.com',
            password: 'password',
            country: 'test'
        });
        user2 = await usersService.create({
            username: 'test user 2',
            email: 'test2@test.com',
            password: 'password',
            country: 'test'
        });
        user3 = await usersService.create({
            username: 'test user 3',
            email: 'test3@test.com',
            password: 'password',
            country: 'test'
        });
        user4 = await usersService.create({
            username: 'test user 4',
            email: 'test4@test.com',
            password: 'password',
            country: 'test'
        });
        user5 = await usersService.create({
            username: 'test user 5',
            email: 'test5@test.com',
            password: 'password',
            country: 'test'
        });
        user6 = await usersService.create({
            username: 'test user 6',
            email: 'test6@test.com',
            password: 'password',
            country: 'test'
        });
        // Create some test tags
        tag1 = await gamesTagsService.create('Test Tag 1');
        tag2 = await gamesTagsService.create('Test Tag 2');
        tag3 = await gamesTagsService.create('Test Tag 3');
        tag4 = await gamesTagsService.create('Test Tag 4');
        tag5 = await gamesTagsService.create('Test Tag 5');
        tag6 = await gamesTagsService.create('Test Tag 6');
        tag7 = await gamesTagsService.create('Test Tag 7');
        tag8 = await gamesTagsService.create('Test Tag 8');
        tag9 = await gamesTagsService.create('Test Tag 9');
        // Create some test developers
        dev1 = await companiesService.create({
            name: 'Test Developer 1',
            website: 'https://test1.com'
        }, 'developer');
        dev2 = await companiesService.create({
            name: 'Test Developer 2',
            website: 'https://test2.com'
        }, 'developer');
        dev3 = await companiesService.create({
            name: 'Test Developer 3',
            website: 'https://test3.com'
        }, 'developer');
        dev4 = await companiesService.create({
            name: 'Test Developer 4',
            website: 'https://test4.com'
        }, 'developer');
        dev5 = await companiesService.create({
            name: 'Test Developer 5',
            website: 'https://test5.com'
        }, 'developer');
        dev6 = await companiesService.create({
            name: 'Test Developer 6',
            website: 'https://test6.com'
        }, 'developer');
        // Create some test publishers
        pub1 = await companiesService.create({
            name: 'Test Publisher 1',
            website: 'https://test1.com'
        }, 'publisher');
        pub2 = await companiesService.create({
            name: 'Test Publisher 2',
            website: 'https://test2.com'
        }, 'publisher');
        pub3 = await companiesService.create({
            name: 'Test Publisher 3',
            website: 'https://test3.com'
        }, 'publisher');
        pub4 = await companiesService.create({
            name: 'Test Publisher 4',
            website: 'https://test4.com'
        }, 'publisher');
        pub5 = await companiesService.create({
            name: 'Test Publisher 5',
            website: 'https://test5.com'
        }, 'publisher');
        pub6 = await companiesService.create({
            name: 'Test Publisher 6',
            website: 'https://test6.com'
        }, 'publisher');
        // Create some test game features
        feature1 = await featuresService.create({
            name: 'Test Feature 1',
            icon: Buffer.from('test icon 1', 'utf-8')
        });
        feature2 = await featuresService.create({
            name: 'Test Feature 2',
            icon: Buffer.from('test icon 2', 'utf-8')
        });
        feature3 = await featuresService.create({
            name: 'Test Feature 3',
            icon: Buffer.from('test icon 3', 'utf-8')
        });
        feature4 = await featuresService.create({
            name: 'Test Feature 4',
            icon: Buffer.from('test icon 4', 'utf-8')
        });
        feature5 = await featuresService.create({
            name: 'Test Feature 5',
            icon: Buffer.from('test icon 5', 'utf-8')
        });
        feature6 = await featuresService.create({
            name: 'Test Feature 6',
            icon: Buffer.from('test icon 6', 'utf-8')
        });
        // Create some languages
        language1 = await gamesLanguagesService.create('Test Language 1');
        language2 = await gamesLanguagesService.create('Test Language 2');
        language3 = await gamesLanguagesService.create('Test Language 3');
        language4 = await gamesLanguagesService.create('Test Language 4');
        language5 = await gamesLanguagesService.create('Test Language 5');
        language6 = await gamesLanguagesService.create('Test Language 6');
        // Create some test games
        game1 = await gamesService.create({
            name: 'Test Game 1',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2022-01-01'),
            publishers: [
                pub1.id,
                pub2.id
            ],
            developers: [
                dev1.id,
                dev2.id
            ],
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
            tags: [
                tag1.id,
                tag2.id,
                tag3.id
            ],
            pricing: {
                free: false,
                discount: false,
                basePrice: 10,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-10-30'),
                offerType: 'SPECIAL PROMOTION'
            },
            features: [
                feature1.id,
                feature2.id,
                feature3.id,
                feature4.id
            ],
            languages: [
                {
                    name: language1.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language2.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language3.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language4.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language5.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language6.name,
                    interface: true,
                    fullAudio: true,
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
            legal: 'Test Legal'
        });
        game2 = await gamesService.create({
            name: 'Test Game 2',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2022-01-02'),
            publishers: [
                pub2.id,
                pub3.id
            ],
            developers: [
                dev2.id,
                dev3.id
            ],
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
            tags: [
                tag1.id,
                tag2.id,
                tag3.id,
                tag7.id
            ],
            pricing: {
                free: false,
                discount: false,
                basePrice: 10,
                discountPrice: 5,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-11-30'),
                offerType: 'WEEKEND DEAL'
            },
            features: [
                feature2.id,
                feature3.id,
                feature4.id,
                feature5.id
            ],
            languages: [
                {
                    name: language1.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language2.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: false
                },
                {
                    name: language3.name,
                    interface: true,
                    fullAudio: false,
                    subtitles: true
                },
                {
                    name: language6.name,
                    interface: true,
                    fullAudio: true,
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
            legal: 'Test Legal'
        });
        game3 = await gamesService.create({
            name: 'Test Game 3',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2023-05-12'),
            publishers: [
                pub3.id,
                pub4.id
            ],
            developers: [
                dev3.id,
                dev4.id
            ],
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
            tags: [
                tag6.id,
                tag2.id,
                tag3.id
            ],
            pricing: {
                free: false,
                discount: true,
                basePrice: 50,
                discountPrice: 15,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-11-30'),
                offerType: 'WEEKEND DEAL'
            },
            features: [
                feature5.id,
                feature6.id,
                feature4.id,
                feature3.id
            ],
            languages: [
                {
                    name: language1.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language2.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language3.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language4.name,
                    interface: true,
                    fullAudio: true,
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
            legal: 'Test Legal'
        });
        game4 = await gamesService.create({
            name: 'Test Game 4',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2023-11-12'),
            publishers: [
                pub4.id,
                pub5.id
            ],
            developers: [
                dev4.id,
                dev5.id
            ],
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
            tags: [
                tag5.id,
                tag3.id,
                tag6.id,
                tag8.id
            ],
            pricing: {
                free: false,
                discount: false,
                basePrice: 50,
                discountPrice: 15,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-11-30'),
                offerType: 'WEEKEND DEAL'
            },
            features: [
                feature2.id,
                feature3.id,
                feature4.id
            ],
            languages: [
                {
                    name: language1.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language4.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: false
                },
                {
                    name: language5.name,
                    interface: true,
                    fullAudio: false,
                    subtitles: true
                },
                {
                    name: language6.name,
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
            legal: 'Test Legal'
        });
        game5 = await gamesService.create({
            name: 'Test Game 5',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2024-01-22'),
            publishers: [
                pub5.id,
                pub6.id
            ],
            developers: [
                dev5.id,
                dev6.id
            ],
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
            tags: [
                tag1.id,
                tag2.id,
                tag3.id,
                tag4.id,
                tag5.id,
                tag6.id
            ],
            pricing: {
                free: false,
                discount: true,
                basePrice: 80,
                discountPrice: 35,
                discountStartDate: new Date(),
                discountEndDate: new Date('2024-11-30'),
                offerType: 'SPECIAL PROMOTION'
            },
            features: [
                feature1.id,
                feature5.id,
                feature3.id,
                feature6.id
            ],
            languages: [
                {
                    name: language6.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language5.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                },
                {
                    name: language4.name,
                    interface: true,
                    fullAudio: false,
                    subtitles: true
                }
            ],
            platformEntries: {
                win: true,
                mac: true
            },
            link: 'Test Link',
            about: 'Test About',
            mature: true,
            matureDescription: 'Test Mature Description',
            systemRequirements: {
                mini: {},
                recommended: {}
            },
            legal: 'Test Legal'
        });
        game6 = await gamesService.create({
            name: 'Test Game 6',
            category: 'Test Category',
            description: 'Test Description',
            releaseDate: new Date('2024-05-22'),
            featured: false,
            publishers: [
                pub1.id,
                pub2.id
            ],
            developers: [
                dev1.id,
                dev2.id
            ],
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
            tags: [
                tag1.id,
                tag2.id,
                tag3.id,
                tag4.id,
                tag9.id
            ],
            pricing: {
                free: true
            },
            features: [
                feature2.id,
                feature3.id,
                feature4.id
            ],
            languages: [
                {
                    name: language1.name,
                    interface: true,
                    fullAudio: true,
                    subtitles: true
                }
            ],
            platformEntries: {
                win: true,
                mac: true
            },
            link: 'Test Link',
            about: 'Test About',
            mature: true,
            matureDescription: 'Test Mature Description',
            systemRequirements: {
                mini: {},
                recommended: {}
            },
            legal: 'Test Legal'
        });
        // update game 6 to be featured
        game6 = await gamesService.update(game6.id, {
            featured: true
        });
        // Create some test reviews
        // game 1 has 3 reviews (1 positive, 2 negative)
        await reviewsService.create({
            userId: user1.id,
            gameId: game1.id,
            positive: true,
            content: 'Test Content 1'
        });
        await reviewsService.create({
            userId: user2.id,
            gameId: game1.id,
            positive: false,
            content: 'Test Content 2'
        });
        await reviewsService.create({
            userId: user3.id,
            gameId: game1.id,
            positive: false,
            content: 'Test Content 3'
        });
        // game 2 has 6 reviews (3 positive, 3 negative)
        await reviewsService.create({
            userId: user1.id,
            gameId: game2.id,
            positive: true,
            content: 'Test Content 1'
        });
        await reviewsService.create({
            userId: user2.id,
            gameId: game2.id,
            positive: true,
            content: 'Test Content 4'
        });
        await reviewsService.create({
            userId: user3.id,
            gameId: game2.id,
            positive: true,
            content: 'Test Content 5'
        });
        await reviewsService.create({
            userId: user4.id,
            gameId: game2.id,
            positive: false,
            content: 'Test Content 6'
        });
        await reviewsService.create({
            userId: user5.id,
            gameId: game2.id,
            positive: false,
            content: 'Test Content 7'
        });
        await reviewsService.create({
            userId: user6.id,
            gameId: game2.id,
            positive: false,
            content: 'Test Content 8'
        });
        // game 3 has 0 reviews
        // game 4 has 1 review (1 positive)
        await reviewsService.create({
            userId: user1.id,
            gameId: game4.id,
            positive: true,
            content: 'Test Content 1'
        });
        // game 5 has 2 reviews (2 positive)
        await reviewsService.create({
            userId: user1.id,
            gameId: game5.id,
            positive: true,
            content: 'Test Content 1'
        });
        await reviewsService.create({
            userId: user2.id,
            gameId: game5.id,
            positive: true,
            content: 'Test Content 2'
        });
        // game 6 has 5 reviews (3 positive, 2 negative)
        await reviewsService.create({
            userId: user1.id,
            gameId: game6.id,
            positive: true,
            content: 'Test Content 1'
        });
        await reviewsService.create({
            userId: user2.id,
            gameId: game6.id,
            positive: true,
            content: 'Test Content 2'
        });
        await reviewsService.create({
            userId: user3.id,
            gameId: game6.id,
            positive: true,
            content: 'Test Content 3'
        });
        await reviewsService.create({
            userId: user4.id,
            gameId: game6.id,
            positive: false,
            content: 'Test Content 4'
        });
        await reviewsService.create({
            userId: user5.id,
            gameId: game6.id,
            positive: false,
            content: 'Test Content 5'
        });
    });
    afterAll(async ()=>{
        await reviewsService.removeAll();
        await gamesService.removeAll();
        await usersService.removeAll();
        await featuresService.removeAll();
        await gamesLanguagesService.removeAll();
        await gamesTagsService.removeAll();
        await companiesService.removeAll('developers');
        await companiesService.removeAll('publishers');
    });
    describe('getByPartialName', ()=>{
        it('should return 6 games with partial name', async ()=>{
            const games = await searchService.getByPartialName('Test Game');
            // Assertions
            expect(games.length).toBe(6);
        });
        it('should return 1 game with partial name', async ()=>{
            const games = await searchService.getByPartialName('Test Game 3');
            // Assertions
            expect(games.length).toBe(1);
            expect(games[0].name).toBe(game3.name);
        });
        it('throw NotFoundException when no games found', async ()=>{
            await expect(searchService.getByPartialName('No Game Found')).rejects.toThrow(_common.NotFoundException);
        });
    });
    describe('getByParameters', ()=>{
        describe('searchData', ()=>{
            it('should return games filtered by partial name', async ()=>{
                const games = await searchService.getByParameters({
                    partialName: 'Test Game'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.name.includes('Test Game'))).toBe(true);
            });
            it('should return games filtered by max price', async ()=>{
                const games = await searchService.getByParameters({
                    maxPrice: 40
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                const gamePrice = (game)=>{
                    const pricing = game.pricing;
                    if (pricing.discount) {
                        return pricing.discountPrice;
                    } else {
                        return pricing.basePrice;
                    }
                };
                expect(games.every((game)=>gamePrice(game) <= 40)).toBe(true);
            });
            it('should return games filtered by tags', async ()=>{
                const games = await searchService.getByParameters({
                    tags: [
                        tag1.id,
                        tag2.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.tags.some((tag)=>[
                            tag1.name,
                            tag2.name
                        ].includes(tag.name)))).toBe(true);
            });
            it('should return games filtered by excluded tags', async ()=>{
                const games = await searchService.getByParameters({
                    excludeTags: [
                        tag1.id,
                        tag2.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>!game.tags.some((tag)=>[
                            tag1.name,
                            tag2.name
                        ].includes(tag.name)))).toBe(true);
            });
            it('should return games filtered by paid games', async ()=>{
                const games = await searchService.getByParameters({
                    paid: true
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.pricing.free === false)).toBe(true);
            });
            it('should return games filtered by offers', async ()=>{
                const games = await searchService.getByParameters({
                    offers: true
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.pricing.discount === true)).toBe(true);
            });
            it('should return games filtered by platform', async ()=>{
                const games = await searchService.getByParameters({
                    platforms: [
                        'win'
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.platformEntries.win)).toBe(true);
            });
            it('should return games filtered by publishers', async ()=>{
                const games = await searchService.getByParameters({
                    publishers: [
                        pub1.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.publishers.some((pub)=>pub.name === pub1.name))).toBe(true);
            });
            it('should return games filtered by developers', async ()=>{
                const games = await searchService.getByParameters({
                    developers: [
                        dev1.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.developers.some((dev)=>dev.name === dev1.name))).toBe(true);
            });
            it('should return ganes filtered by games features', async ()=>{
                const games = await searchService.getByParameters({
                    features: [
                        feature1.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.features.some((feature)=>feature.name === feature1.name))).toBe(true);
            });
            it('should return games filtered by games languages', async ()=>{
                const games = await searchService.getByParameters({
                    languages: [
                        language1.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.languages.some((lang)=>lang.name === language1.name))).toBe(true);
            });
            it('should return games filtered by featured games', async ()=>{
                const games = await searchService.getByParameters({
                    featured: true
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.featured === true)).toBe(true);
            });
            it('should return games with mature games excluded', async ()=>{
                const games = await searchService.getByParameters({
                    excludeMature: true
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.mature === false)).toBe(true);
            });
            it('should return games filtered by multiple parameters', async ()=>{
                const games = await searchService.getByParameters({
                    tags: [
                        tag1.id,
                        tag2.id
                    ],
                    developers: [
                        dev1.id
                    ],
                    publishers: [
                        pub1.id
                    ]
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                expect(games.every((game)=>game.tags.some((tag)=>tag.name === 'Test Tag 1') && game.developers.some((dev)=>dev.name === 'Test Developer 1') && game.publishers.some((pub)=>pub.name === 'Test Publisher 1'))).toBe(true);
            });
        });
        describe('sorting', ()=>{
            it('should sort games by name', async ()=>{
                const games = await searchService.getByParameters({
                    sort: 'name'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                for(let i = 0; i < games.length - 1; i++){
                    expect(games[i].name.localeCompare(games[i + 1].name)).toBeLessThanOrEqual(0);
                }
            });
            it('should sort games by lowest price', async ()=>{
                const games = await searchService.getByParameters({
                    sort: 'lowestPrice'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                for(let i = 0; i < games.length - 1; i++){
                    expect(games[i].pricing.price).toBeLessThanOrEqual(games[i + 1].pricing.price);
                }
            });
            it('should sort games by highest price', async ()=>{
                const games = await searchService.getByParameters({
                    sort: 'highestPrice'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                for(let i = 0; i < games.length - 1; i++){
                    expect(games[i].pricing.price).toBeGreaterThanOrEqual(games[i + 1].pricing.price);
                }
            });
            it('should sort games by release date', async ()=>{
                const games = await searchService.getByParameters({
                    sort: 'releaseDate'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                for(let i = 0; i < games.length - 1; i++){
                    expect(games[i].releaseDate.getTime()).toBeGreaterThanOrEqual(games[i + 1].releaseDate.getTime());
                }
            });
            it('should sort games by reviews', async ()=>{
                const games = await searchService.getByParameters({
                    sort: 'reviews'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                for(let i = 0; i < games.length - 1; i++){
                    expect(games[i].averageRating).toBeGreaterThanOrEqual(games[i + 1].averageRating);
                }
            });
            it('should sort games by relevance', async ()=>{
                const games = await searchService.getByParameters({
                    sort: 'relevance'
                });
                // Assertions
                expect(games.length).toBeGreaterThan(0);
                for(let i = 0; i < games.length - 1; i++){
                    expect(games[i].reviewsCount).toBeGreaterThanOrEqual(games[i + 1].reviewsCount);
                }
            });
        });
    });
    describe('getByUserTags', ()=>{
        it('should return games by tags', async ()=>{
            // Add tags to games
            await gamesService.update(game1.id, {
                tags: [
                    tag1.id
                ]
            });
            await gamesService.update(game2.id, {
                tags: [
                    tag1.id,
                    tag2.id
                ]
            });
            await gamesService.update(game3.id, {
                tags: [
                    tag1.id,
                    tag2.id,
                    tag3.id
                ]
            });
            await gamesService.update(game4.id, {
                tags: [
                    tag1.id,
                    tag2.id,
                    tag3.id,
                    tag4.id
                ]
            });
            await gamesService.update(game5.id, {
                tags: [
                    tag1.id,
                    tag2.id,
                    tag3.id,
                    tag4.id,
                    tag5.id
                ]
            });
            await gamesService.update(game6.id, {
                tags: [
                    tag1.id,
                    tag2.id,
                    tag3.id,
                    tag4.id,
                    tag5.id,
                    tag6.id
                ]
            });
            const result = await searchService.getByUserTags([
                tag1.id,
                tag2.id,
                tag3.id,
                tag4.id,
                tag5.id,
                tag6.id
            ]);
            // Assertions
            expect(result).toHaveLength(6);
            expect(result[0].tags).toHaveLength(6); // game6 with 6 tags
            expect(result[1].tags).toHaveLength(5); // game5 with 5 tags
            expect(result[2].tags).toHaveLength(4); // game4 with 4 tags
            expect(result[3].tags).toHaveLength(3); // game3 with 3 tags
            expect(result[4].tags).toHaveLength(2); // game2 with 2 tags
            expect(result[5].tags).toHaveLength(1); // game1 with 1 tag
        });
    });
});

//# sourceMappingURL=search.service.spec.js.map