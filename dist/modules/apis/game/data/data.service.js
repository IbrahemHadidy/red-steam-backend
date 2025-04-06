// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataService", {
    enumerable: true,
    get: function() {
        return DataService;
    }
});
const _common = require("@nestjs/common");
const _reviewsservice = require("../../../repositories/sql/reviews/reviews.service");
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _searchservice = require("../../../repositories/sql/games/search.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DataService = class DataService {
    constructor(logger, game, search, review){
        this.logger = logger;
        this.game = game;
        this.search = search;
        this.review = review;
    }
    /**
   * Get games by partial name (for mini search)
   * @param data An object containing the name of the game
   * @returns An array of games
   */ async getByPartialName(partialName) {
        this.logger.log(`Finding games by partial name`);
        // Find games by partial name
        const games = await this.search.getByPartialName(partialName);
        this.logger.log(`Found ${games.length} games`);
        // Return games
        return games;
    }
    /**
   * Get games by parameters
   * @param searchData An object containing the search data
   * @param pagination An object containing the pagination data
   * @returns An array of games
   */ async getByParameters(searchData, pagination) {
        this.logger.log(`Finding games by criteria`);
        // Prepare search data
        const data = {
            sort: searchData.sort,
            partialName: searchData.partialName,
            maxPrice: searchData.maxPrice && searchData.maxPrice,
            tags: searchData.tags && searchData.tags.length > 0 && searchData.tags.map((tag)=>tag),
            excludeTags: searchData.excludeTags && searchData.excludeTags.length > 0 && searchData.excludeTags.map((tag)=>tag),
            paid: searchData.paid !== undefined ? searchData.paid : undefined,
            offers: searchData.offers !== undefined ? searchData.offers : undefined,
            platforms: searchData.platforms && searchData.platforms.length > 0 && searchData.platforms,
            publishers: searchData.publishers && searchData.publishers.length > 0 && searchData.publishers.map((publisher)=>publisher),
            developers: searchData.developers && searchData.developers.length > 0 && searchData.developers.map((developer)=>developer),
            features: searchData.features && searchData.features.length > 0 && searchData.features.map((feature)=>feature),
            languages: searchData.languages && searchData.languages.length > 0 && searchData.languages.map((language)=>language),
            featured: searchData.featured !== undefined ? searchData.featured : undefined,
            excludeMature: searchData.excludeMature !== undefined ? searchData.excludeMature : undefined,
            excludedGames: searchData.excludedGames && searchData.excludedGames.length > 0 && searchData.excludedGames.map((game)=>game),
            upcomingMode: searchData.upcomingMode
        };
        // Find games by parameters
        const games = await this.search.getByParameters(data, {
            page: pagination.page,
            limit: pagination.limit
        });
        this.logger.log(`Found ${games.length} games`);
        // Return found games
        return games;
    }
    /**
   * Get featured games
   * @param limit The maximum number of games to return
   * @returns An array of featured games
   */ async getFeaturedGames(excludedGames, limit) {
        this.logger.log(`Finding featured games`);
        // Find featured games
        const games = await this.search.getByParameters({
            featured: true,
            excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
            sort: 'releaseDate'
        }, {
            limit: limit,
            page: 0
        });
        this.logger.log(`Found ${games.length} featured games`);
        // Return featured games
        return games;
    }
    /**
   * Get games by tags
   * @param tags An array of tag IDs
   * @param limit The maximum number of games to return
   * @returns An array of games
   */ async getByUserTags(tags, excludedGames, limit) {
        this.logger.log(`Finding games by tags`);
        // If no tags are provided, return an empty array
        if (!tags || tags.length === 0) return [];
        // Find games by tags
        const games = await this.search.getByUserTags(tags, excludedGames.length > 0 ? excludedGames : undefined, limit);
        this.logger.log(`Found ${games.length} games`);
        // Return user games
        return games;
    }
    /**
   * Get game by ID
   * @param id The ID of the game
   * @returns The game
   */ async getById(id) {
        this.logger.log(`Finding game with ID: ${id}`);
        // Find game by ID
        const game = await this.game.getById(id);
        // Return game
        return game;
    }
    /**
   * Get games by IDs
   * @param ids The IDs of the games
   * @returns An array of games
   */ async getByIds(ids) {
        this.logger.log(`Finding games with IDs: ${ids}`);
        // Find games by IDs
        const games = await this.game.getByIds(ids ? ids.map((id)=>id) : []);
        // Return games
        return games;
    }
    /**
   * Get games with offers
   * @returns An array of games
   */ async getByOffers(excludedGames) {
        this.logger.log(`Finding games with offers`);
        // Find games with offers
        const games = await this.search.getByParameters({
            offers: true,
            excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
            sort: 'relevance'
        }, {
            limit: 24,
            page: 0
        });
        // Return games
        return games;
    }
    /**
   * Get games with new releases
   * @returns An array of games
   */ async getByNewest(excludedGames) {
        this.logger.log(`Finding games with newest`);
        // Find games with new releases
        const games = await this.search.getByParameters({
            upcomingMode: 'exclude',
            excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
            sort: 'releaseDate'
        }, {
            limit: 10,
            page: 0
        });
        // Return games
        return games;
    }
    /**
   * Get games with top sales
   * @returns An array of games
   */ async getByTopSales(excludedGames) {
        this.logger.log(`Finding games with top sales`);
        // Find games with top sales
        const games = await this.search.getByParameters({
            sort: 'totalSales',
            excludedGames: excludedGames.length > 0 ? excludedGames : undefined
        }, {
            limit: 10,
            page: 0
        });
        // Return games
        return games;
    }
    /**
   * Get games with specials
   * @returns An array of games
   */ async getBySpecials(excludedGames) {
        this.logger.log(`Finding games with specials`);
        // Find games with specials
        const games = await this.search.getByParameters({
            featured: true,
            excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
            sort: 'relevance'
        }, {
            limit: 10,
            page: 0
        });
        // Return games
        return games;
    }
    /**
   * Get upcoming games
   * @returns An array of games
   */ async getByUpcoming(excludedGames) {
        this.logger.log(`Finding games with upcoming`);
        // Find games with upcoming
        const games = await this.search.getByParameters({
            upcomingMode: 'onlyUpcoming',
            excludedGames: excludedGames.length > 0 ? excludedGames : undefined,
            sort: 'releaseDate'
        }, {
            limit: 10,
            page: 0
        });
        // Return games
        return games;
    }
    /**
   * Get reviews by game ID
   * @param id The ID of the game
   * @param pagination An object containing the pagination data
   * @returns An array of reviews
   */ async getGameReviews(id, filter, sort, pagination) {
        this.logger.log(`Finding reviews for game with ID: ${id}`);
        // Find reviews by game ID
        const reviews = await this.review.getByGameId(id, filter, sort, pagination);
        // Return reviews
        return reviews;
    }
};
DataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gamesservice.GamesService === "undefined" ? Object : _gamesservice.GamesService,
        typeof _searchservice.SearchService === "undefined" ? Object : _searchservice.SearchService,
        typeof _reviewsservice.ReviewsService === "undefined" ? Object : _reviewsservice.ReviewsService
    ])
], DataService);

//# sourceMappingURL=data.service.js.map