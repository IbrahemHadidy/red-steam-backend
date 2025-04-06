"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _interactionservice = require("./interaction.service");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jwt = require("@nestjs/jwt");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _tokenblacklistmodule = require("../../../repositories/mongo/token-blacklist/token-blacklist.module");
const _tokenblacklistservice = require("../../../repositories/mongo/token-blacklist/token-blacklist.service");
const _companiesservice = require("../../../repositories/sql/companies/companies.service");
const _gamesfeaturesservice = require("../../../repositories/sql/games-features/games-features.service");
const _gameslanguagesservice = require("../../../repositories/sql/games-languages/games-languages.service");
const _gamespricingservice = require("../../../repositories/sql/games-pricing/games-pricing.service");
const _gamestagsmodule = require("../../../repositories/sql/games-tags/games-tags.module");
const _gamestagsservice = require("../../../repositories/sql/games-tags/games-tags.service");
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _reviewsmodule = require("../../../repositories/sql/reviews/reviews.module");
const _reviewsservice = require("../../../repositories/sql/reviews/reviews.service");
const _usersmodule = require("../../../repositories/sql/users/users.module");
const _usersservice = require("../../../repositories/sql/users/users.service");
const _nodemailermodule = require("../../../services/node-mailer/node-mailer.module");
const _nodemailerservice = require("../../../services/node-mailer/node-mailer.service");
const _integrationsetup = require("../../../../../test/integration-setup");
describe('InteractionService', ()=>{
    let user1;
    let user2;
    let game1;
    let game2;
    let game3;
    let tag1;
    let tag2;
    let tag3;
    let usersService;
    let gamesService;
    let reviewsService;
    let interactionService;
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
                _interactionservice.InteractionService,
                _jwt.JwtService,
                _usersservice.UsersService,
                _nodemailerservice.NodeMailerService,
                _config.ConfigService,
                _gamesservice.GamesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gameslanguagesservice.GamesLanguagesService,
                _gamespricingservice.GamesPricingService,
                _companiesservice.CompaniesService,
                _tokenblacklistservice.TokenBlacklistService,
                _reviewsservice.ReviewsService,
                _common.Logger
            ]
        }).compile();
        usersService = module.get(_usersservice.UsersService);
        gamesService = module.get(_gamesservice.GamesService);
        reviewsService = module.get(_reviewsservice.ReviewsService);
        interactionService = module.get(_interactionservice.InteractionService);
        gamesTagsService = module.get(_gamestagsservice.GamesTagsService);
        user1 = await usersService.create({
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
        game1 = await gamesService.create({
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
        });
        tag1 = await gamesTagsService.create('test1');
        tag2 = await gamesTagsService.create('test2');
        tag3 = await gamesTagsService.create('test3');
    });
    afterEach(async ()=>{
        await reviewsService.removeAll();
        await usersService.removeAll();
        await gamesService.removeAll();
        await gamesTagsService.removeAll();
    });
    describe('changeTags', ()=>{
        it('should change tags successfully', async ()=>{
            // Call changeTags function
            const result = await interactionService.changeTags({
                tags: [
                    tag1.id,
                    tag2.id,
                    tag3.id
                ],
                userId: user1.id
            }); // [tag1.id], userId: user1.id });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Tags changed successfully'
            });
        });
    });
    describe('getTags', ()=>{
        it('should get tags successfully', async ()=>{
            // Add tags to user
            await interactionService.changeTags({
                tags: [
                    tag1.id
                ],
                userId: user1.id
            });
            // Call getTags function
            const result = await interactionService.getTags({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                tags: [
                    tag1
                ]
            });
        });
    });
    describe('addToLibrary', ()=>{
        it('should add game to library successfully', async ()=>{
            // Call addToLibrary function
            const result = await interactionService.addToLibrary({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Games added to library successfully'
            });
        });
        it('should fail if some games are already in library', async ()=>{
            // Add game to library
            await interactionService.addToLibrary({
                itemsIds: [
                    game1.id
                ],
                userId: user1.id
            });
            // Call addToLibrary function
            const result = await interactionService.addToLibrary({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                success: false,
                message: 'Some games are already in the library'
            }));
        });
    });
    describe('removeFromLibrary', ()=>{
        it('should remove game from library successfully', async ()=>{
            // Add games to library
            await interactionService.addToLibrary({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call removeFromLibrary function
            const result = await interactionService.removeFromLibrary({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Games removed from library successfully'
            });
        });
    });
    describe('clearLibrary', ()=>{
        it('should clear library successfully', async ()=>{
            // Add games to Library
            await interactionService.addToWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call clearLibrary function
            const result = await interactionService.clearLibrary({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Library cleared successfully'
            });
        });
    });
    describe('addToWishlist', ()=>{
        it('should add game to wishlist successfully', async ()=>{
            // Call addToWishlist function
            const result = await interactionService.addToWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Games added to wishlist successfully'
            });
        });
        it('should fail if some games are already in wishlist', async ()=>{
            // Add game to wishlist
            await interactionService.addToWishlist({
                itemsIds: [
                    game1.id
                ],
                userId: user1.id
            });
            // Call addToWishlist function
            const result = await interactionService.addToWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                success: false,
                message: 'Some games are already in the wishlist',
                duplicates: [
                    game1.id
                ]
            }));
        });
    });
    describe('removeFromWishlist', ()=>{
        it('should remove game from wishlist successfully', async ()=>{
            // Add games to wishlist
            await interactionService.addToWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call removeFromWishlist function
            const result = await interactionService.removeFromWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Games removed from wishlist successfully'
            });
        });
    });
    describe('clearWishlist', ()=>{
        it('should clear wishlist successfully', async ()=>{
            // Add games to wishlist
            await interactionService.addToWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call clearWishlist function
            const result = await interactionService.clearWishlist({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Wishlist cleared successfully'
            });
        });
    });
    describe('addToCart', ()=>{
        it('should add game to cart successfully', async ()=>{
            // Call addToCart function
            const result = await interactionService.addToCart({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Games added to cart successfully'
            });
        });
        it('should fail if some games are already in cart', async ()=>{
            // Add game to cart
            await interactionService.addToCart({
                itemsIds: [
                    game1.id
                ],
                userId: user1.id
            });
            // Call removeFromCart function
            const result = await interactionService.addToCart({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                success: false,
                message: 'Some games are already in the cart',
                duplicates: [
                    game1.id
                ]
            }));
        });
    });
    describe('removeFromCart', ()=>{
        it('should remove game from cart successfully', async ()=>{
            // Add game to cart
            await interactionService.addToCart({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call removeFromCart function
            const result = await interactionService.removeFromCart({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Games removed from cart successfully'
            });
        });
    });
    describe('clearCart', ()=>{
        it('should clear cart successfully', async ()=>{
            // Add game to cart
            await interactionService.addToCart({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call clearCart function
            const result = await interactionService.clearCart({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Cart cleared successfully'
            });
        });
    });
    describe('getLibrary', ()=>{
        it('should return library successfully', async ()=>{
            // Add game to library
            await interactionService.addToLibrary({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call getLibrary function
            const result = await interactionService.getLibrary({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual([
                expect.objectContaining({
                    id: game1.id,
                    addedOn: expect.any(String)
                }),
                expect.objectContaining({
                    id: game2.id,
                    addedOn: expect.any(String)
                }),
                expect.objectContaining({
                    id: game3.id,
                    addedOn: expect.any(String)
                })
            ]);
        });
    });
    describe('getWishlist', ()=>{
        it('should return wishlist successfully', async ()=>{
            // Add game to wishlist
            await interactionService.addToWishlist({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call getWishlist function
            const result = await interactionService.getWishlist({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual([
                expect.objectContaining({
                    id: game1.id,
                    addedOn: expect.any(String)
                }),
                expect.objectContaining({
                    id: game2.id,
                    addedOn: expect.any(String)
                }),
                expect.objectContaining({
                    id: game3.id,
                    addedOn: expect.any(String)
                })
            ]);
        });
    });
    describe('getCart', ()=>{
        it('should return cart successfully', async ()=>{
            // Add game to cart
            await interactionService.addToCart({
                itemsIds: [
                    game1.id,
                    game2.id,
                    game3.id
                ],
                userId: user1.id
            });
            // Call getCart function
            const result = await interactionService.getCart({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual([
                expect.objectContaining({
                    id: game1.id,
                    addedOn: expect.any(String)
                }),
                expect.objectContaining({
                    id: game2.id,
                    addedOn: expect.any(String)
                }),
                expect.objectContaining({
                    id: game3.id,
                    addedOn: expect.any(String)
                })
            ]);
        });
    });
    describe('reviewGame', ()=>{
        it('should review game successfully', async ()=>{
            // Call reviewGame function
            const result = await interactionService.reviewGame({
                userId: user1.id,
                gameId: game1.id,
                positive: false,
                content: 'What a Bad game!'
            });
            // Assertions
            expect(result).toEqual({
                success: true,
                message: 'Game reviewed successfully'
            });
        });
    });
    describe('getReviews', ()=>{
        it('should get reviews successfully', async ()=>{
            // Call reviewGame function
            await interactionService.reviewGame({
                userId: user2.id,
                gameId: game1.id,
                positive: true,
                content: 'Very Great game!'
            });
            // Call getReviews function
            const result = await interactionService.getReviews({
                userId: user2.id
            });
            // Assertions
            expect(result).toEqual([
                expect.objectContaining({
                    content: 'Very Great game!',
                    positive: true
                })
            ]);
        });
        it('should return "No reviews found" if no reviews found', async ()=>{
            // Call getReviews function
            const result = await interactionService.getReviews({
                userId: user1.id
            });
            // Assertions
            expect(result).toEqual({
                success: false,
                message: 'No reviews found'
            });
        });
    });
});

//# sourceMappingURL=interaction.service.spec.js.map