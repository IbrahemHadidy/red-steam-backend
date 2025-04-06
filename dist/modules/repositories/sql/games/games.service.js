// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesService", {
    enumerable: true,
    get: function() {
        return GamesService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamepricingentity = require("../games-pricing/game-pricing.entity");
const _gameentity = require("./game.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let GamesService = class GamesService {
    constructor(logger, gameRepository, companiesService, featuresService, languagesService, gamesPricingService, gamesTagsService){
        this.logger = logger;
        this.gameRepository = gameRepository;
        this.companiesService = companiesService;
        this.featuresService = featuresService;
        this.languagesService = languagesService;
        this.gamesPricingService = gamesPricingService;
        this.gamesTagsService = gamesTagsService;
        this.relations = {};
        this.relations = {
            tags: true,
            pricing: true
        };
    }
    /**
   * Retrieves all games.
   * @param {string} orderBy - The property to order by.
   * @param {string} order - The order to use.
   * @return {Promise<GameType[]>} A Promise that resolves to an array of game entities.
   */ async getAll(orderBy, order) {
        this.logger.log(`Retrieving all games from the database`);
        // Retrieve all games
        const games = await this.gameRepository.find({
            order: {
                [orderBy]: order
            }
        });
        // Return the games
        return games;
    }
    /**
   * Retrieves a game by its ID.
   * @param {number} id - The ID of the game to retrieve.
   * @return {Promise<GameType>} A Promise that resolves to the game entity.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   */ async getById(id) {
        this.logger.log(`Retrieving game with ID ${id} from the database`);
        // Retrieve the game by ID
        const game = await this.gameRepository.findOne({
            where: {
                id
            },
            relations: {
                developers: true,
                publishers: true,
                tags: true,
                pricing: true,
                features: true,
                languages: true
            }
        });
        // Throw a NotFoundException if the game is not found
        if (!game) throw new _common.NotFoundException(`Game with ID ${id} not found`);
        // Return the game
        return game;
    }
    /**
   * Retrieves games by their IDs.
   * @param {number[]} ids - The IDs of the games to retrieve.
   * @return {Promise<GameType[]>} A Promise that resolves to an array of game entities.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   */ async getByIds(ids) {
        this.logger.log(`Retrieving games with IDs ${ids.length > 0 ? ids : 'none'} from the database`);
        // Retrieve the games by IDs
        const games = await this.gameRepository.find({
            where: {
                id: (0, _typeorm1.In)(ids)
            },
            relations: this.relations
        });
        // Throw a NotFoundException if any of the games are not found
        if (games.length !== ids.length) {
            const missingIds = ids.filter((id)=>!games.some((game)=>game.id === id));
            throw new _common.NotFoundException(`Games with IDs ${missingIds} not found`);
        }
        // Return the games
        return games;
    }
    /**
   * Retrieves games by their name.
   * @param {string} name - The name of the games to retrieve.
   * @return {Promise<GameType[]>} A Promise that resolves to an array of game entities.
   */ async getByName(name) {
        this.logger.log(`Retrieving game with name ${name} from the database`);
        // Retrieve the game by name
        const games = await this.gameRepository.findOne({
            where: {
                name
            },
            relations: this.relations
        });
        // Throw a NotFoundException if the game is not found
        if (!games) throw new _common.NotFoundException(`Game with name ${name} not found`);
        // Return the game
        return games;
    }
    /**
   * Gets paginated games.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated games.
   */ async getGamesPaginated(page, limit, orderBy, order, discount, searchQuery, admin) {
        this.logger.log(`Getting games paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);
        // Create a where clause based on the search query
        const where = {};
        if (discount) {
            if (admin) {
                where.pricing = {
                    discount: true,
                    discountEndDate: (0, _typeorm1.MoreThanOrEqual)(new Date())
                };
            } else {
                where.pricing = {
                    discount: true,
                    discountEndDate: (0, _typeorm1.MoreThanOrEqual)(new Date()),
                    discountStartDate: (0, _typeorm1.LessThanOrEqual)(new Date())
                };
            }
        }
        if (searchQuery?.name) where.name = (0, _typeorm1.ILike)(`%${searchQuery.name}%`);
        const orderOptions = {};
        if (orderBy === 'id') orderOptions.id = order;
        if (orderBy === 'name') orderOptions.name = order;
        if (orderBy === 'discountPrice') orderOptions.pricing = {
            discountPrice: order
        };
        if (orderBy === 'basePrice') orderOptions.pricing = {
            basePrice: order
        };
        if (orderBy === 'discountPercentage') orderOptions.pricing = {
            discountPercentage: order
        };
        if (orderBy === 'offerType') orderOptions.pricing = {
            offerType: order
        };
        if (orderBy === 'discountStartDate') orderOptions.pricing = {
            discountStartDate: order
        };
        if (orderBy === 'discountEndDate') orderOptions.pricing = {
            discountEndDate: order
        };
        // Set skipCheckDiscount to true for admin
        if (admin) _gamepricingentity.GamePricing.skipDiscountCheck = true;
        // Get the paginated games
        const [items, total] = await this.gameRepository.findAndCount({
            where,
            order: orderOptions,
            relations: {
                pricing: true
            },
            skip: Math.max((page - 1) * limit, 0),
            take: limit
        });
        // Reset after fetching to avoid affecting other queries
        if (admin) _gamepricingentity.GamePricing.skipDiscountCheck = false;
        // Calculate the total number of pages
        const totalPages = Math.ceil(total / limit);
        // Return the paginated games and total number of pages
        return {
            items,
            total,
            totalPages
        };
    }
    /**
   * Creates a new game.
   * @param {Game} game - The game entity to be created.
   * @return {Promise<GameType>} A Promise that resolves to the created game entity.
   * @throws `ConflictException` Throws a ConflictException if the game already exists.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the creation fails.
   */ async create(game) {
        this.logger.log(`Creating game with name ${game.name} in the database`);
        // Check if game already exists
        const existingGame = await this.gameRepository.findOne({
            where: {
                name: game.name
            }
        });
        if (existingGame) throw new _common.ConflictException(`Game with name ${game.name} already exists`);
        // Get publishers and developers
        const publishers = await this.companiesService.getByIds(game.publishers, 'publisher');
        const developers = await this.companiesService.getByIds(game.developers, 'developer');
        // Get game features
        const features = await this.featuresService.getByIds(game.features);
        // Get game languages
        const gameLanguages = await this.languagesService.getByNameList(game.languages.map((language)=>language.name));
        // Create new game tags
        const tags = await this.gamesTagsService.getByIds(game.tags);
        // Create new game entity
        const newGame = new _gameentity.Game();
        newGame.name = game.name;
        newGame.storageName = game.name;
        newGame.category = game.category;
        newGame.description = game.description;
        newGame.releaseDate = game.releaseDate;
        newGame.featured = game.featured;
        newGame.publishers = publishers;
        newGame.developers = developers;
        newGame.thumbnailEntries = game.thumbnailEntries;
        newGame.imageEntries = game.imageEntries;
        newGame.videoEntries = game.videoEntries;
        newGame.tags = tags;
        newGame.features = features;
        newGame.languages = gameLanguages;
        newGame.languageSupport = game.languages;
        newGame.platformEntries = game.platformEntries;
        newGame.link = game.link;
        newGame.about = game.about;
        newGame.mature = game.mature;
        newGame.matureDescription = game.matureDescription;
        newGame.systemRequirements = game.systemRequirements;
        newGame.legal = game.legal;
        // Create new game pricing and link it to the saved game
        const pricing = new _gamepricingentity.GamePricing();
        pricing.free = game.pricing.free;
        pricing.basePrice = game.pricing.price ?? '0.00';
        // Link the pricing to the game
        newGame.pricing = pricing;
        pricing.game = newGame;
        // Save the new game
        const result = await this.gameRepository.save(newGame);
        if (!result) throw new _common.InternalServerErrorException('Failed to create game');
        return result;
    }
    /**
   * Updates a game by its ID.
   * @param {number} id - The ID of the game to be updated.
   * @param {Game} game - The updated game entity.
   * @return {Promise<GameType>} A Promise that resolves to the updated game entity.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the update fails.
   */ async update(id, game) {
        this.logger.log(`Updating game with ID ${id} in the database`);
        // Get relations
        const relations = {
            publishers: !!game.publishers,
            developers: !!game.developers,
            tags: !!game.tags,
            pricing: !!game.pricing,
            features: !!game.features,
            languages: !!game.languages
        };
        // Check if game exists
        const existingGame = await this.gameRepository.findOne({
            where: {
                id
            },
            relations
        });
        // Throw a not found exception if game does not exist
        if (!existingGame) throw new _common.NotFoundException(`Game with ID ${id} not found`);
        // Get game languages if they are provided
        let gameLanguages = [];
        if (game.languages) {
            gameLanguages = await this.languagesService.getByNameList(game.languages.map((language)=>language.name));
        }
        // Update fields if they are provided
        if (game.name) existingGame.name = game.name;
        if (game.category) existingGame.category = game.category;
        if (game.description) existingGame.description = game.description;
        if (game.releaseDate) existingGame.releaseDate = game.releaseDate;
        if (game.link) existingGame.link = game.link;
        if (game.about) existingGame.about = game.about;
        if (game.mature) existingGame.mature = game.mature;
        if (game.matureDescription) existingGame.matureDescription = game.matureDescription;
        if (game.legal) existingGame.legal = game.legal;
        // Update related entities
        if (game.publishers) {
            const publishers = await this.companiesService.getByIds(game.publishers, 'publisher');
            existingGame.publishers = publishers;
        }
        if (game.developers) {
            const developers = await this.companiesService.getByIds(game.developers, 'developer');
            existingGame.developers = developers;
        }
        if (game.tags) {
            const tags = await this.gamesTagsService.getByIds(game.tags);
            existingGame.tags = tags;
        }
        if (game.features) {
            const features = await this.featuresService.getByIds(game.features);
            existingGame.features = features;
        }
        if (game.languages) {
            existingGame.languages = gameLanguages;
            existingGame.languageSupport = game.languages;
        }
        if (game.featured !== undefined) existingGame.featured = game.featured;
        if (game.changedThumbnails) {
            const filteredThumbnails = Object.fromEntries(Object.entries(game.changedThumbnails).filter(([, value])=>value !== undefined));
            existingGame.thumbnailEntries = {
                ...existingGame.thumbnailEntries,
                ...filteredThumbnails
            };
        }
        if (game.deletedScreenshots && game.deletedScreenshots.length > 0) {
            existingGame.imageEntries = existingGame.imageEntries.filter((image)=>!game.deletedScreenshots.includes(image.order));
        }
        if (game.deletedVideos && game.deletedVideos.length > 0) {
            existingGame.videoEntries = existingGame.videoEntries.filter((video)=>!game.deletedVideos.includes(video.order));
        }
        if (game.renamedScreenshots && game.renamedScreenshots.length > 0) {
            existingGame.imageEntries = existingGame.imageEntries.map((entry)=>{
                const newEntry = game.renamedScreenshots.find((renamedEntry)=>renamedEntry.oldOrder === entry.order);
                if (!newEntry) return entry;
                return {
                    ...entry,
                    order: newEntry.newOrder,
                    link: newEntry.link
                };
            });
        }
        if (game.renamedVideos && game.renamedVideos.length > 0) {
            existingGame.videoEntries = existingGame.videoEntries.map((entry)=>{
                const newEntry = game.renamedVideos.find((renamedEntry)=>renamedEntry.oldOrder === entry.order);
                if (!newEntry) return entry;
                return {
                    ...entry,
                    order: newEntry.newOrder,
                    link: newEntry.videoLink,
                    posterLink: newEntry.posterLink
                };
            });
        }
        if (game.addedScreenshots && game.addedScreenshots.length > 0) existingGame.imageEntries = [
            ...existingGame.imageEntries,
            ...game.addedScreenshots
        ];
        if (game.addedVideos && game.addedVideos.length > 0) existingGame.videoEntries = [
            ...existingGame.videoEntries,
            ...game.addedVideos
        ];
        if (game.featuredOrders && game.featuredOrders.length > 0) {
            existingGame.imageEntries = existingGame.imageEntries.map((image)=>({
                    ...image,
                    featured: game.featuredOrders.includes(image.order)
                }));
        }
        if (game.platformEntries) existingGame.platformEntries = game.platformEntries;
        if (game.systemRequirements) existingGame.systemRequirements = game.systemRequirements;
        // Update pricing if provided
        if (game.pricing) {
            if (game.pricing.free !== true && game.pricing.price) {
                existingGame.pricing.free = false;
                existingGame.pricing.basePrice = game.pricing.price;
                existingGame.pricing.price = game.pricing.price;
            }
            if (game.pricing.free === true) {
                existingGame.pricing.free = game.pricing.free;
                existingGame.pricing.basePrice = '0.00';
                existingGame.pricing.price = '0.00';
            }
        }
        // Save the updated game to the database
        const result = await this.gameRepository.save(existingGame);
        if (!result) throw new _common.InternalServerErrorException(`Failed to update game with ID ${id}`);
        return result;
    }
    /**
   * Updates games total sales by 1
   * @param {number} ids - The IDs of the games to be updated.
   * @return {Promise<Game[]>} A Promise that resolves to an array of updated games.
   */ async updateSales(ids) {
        this.logger.log(`Updating games sales`);
        // Update games sales
        const games = await this.getByIds(ids);
        // Update games sales
        games.forEach((game)=>{
            game.totalSales += 1;
        });
        // Save the updated games to the database
        const result = await this.gameRepository.save(games);
        if (!result) throw new _common.InternalServerErrorException(`Failed to update games sales`);
        return result;
    }
    /**
   * Removes a game by its ID.
   * @param {number} id - The ID of the game to be removed.
   * @return {Promise<Game>} A Promise that resolves to the removed game entity.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */ async remove(id) {
        this.logger.log(`Removing game with ID ${id} from the database`);
        // Check if game exists
        const game = await this.getById(id);
        // Throw a not found exception if game does not exist
        if (!game) throw new _common.NotFoundException(`Game with ID ${id} not found`);
        // Remove the game from the database
        const removedGame = await this.gameRepository.remove(game);
        // Throw an internal server error if the removal fails
        if (!removedGame) throw new _common.InternalServerErrorException('Failed to remove game from the database');
        // Get game pricing id
        const gamePricingId = game.pricing.id;
        // Remove game pricing from the database
        await this.gamesPricingService.remove(gamePricingId);
        // Return the removed game
        return removedGame;
    }
    /**
   * Removes all games from the database.
   * @return {Promise<void>} A Promise that resolves when the removal is complete.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */ async removeAll() {
        this.logger.log('Removing all games from the database');
        // Remove all games from the database
        const result = await this.gameRepository.delete({});
        // Throw an internal server error if the removal fails
        if (!result) throw new _common.InternalServerErrorException('Failed to remove games from the database');
        // Remove all game pricing from the database
        await this.gamesPricingService.removeAll();
    }
};
GamesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_gameentity.Game, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _companiesservice.CompaniesService === "undefined" ? Object : _companiesservice.CompaniesService,
        typeof _gamesfeaturesservice.GamesFeaturesService === "undefined" ? Object : _gamesfeaturesservice.GamesFeaturesService,
        typeof _gameslanguagesservice.GamesLanguagesService === "undefined" ? Object : _gameslanguagesservice.GamesLanguagesService,
        typeof _gamespricingservice.GamesPricingService === "undefined" ? Object : _gamespricingservice.GamesPricingService,
        typeof _gamestagsservice.GamesTagsService === "undefined" ? Object : _gamestagsservice.GamesTagsService
    ])
], GamesService);

//# sourceMappingURL=games.service.js.map