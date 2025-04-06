// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OfferService", {
    enumerable: true,
    get: function() {
        return OfferService;
    }
});
const _common = require("@nestjs/common");
const _gamespricingservice = require("../../../repositories/sql/games-pricing/games-pricing.service");
const _gamesservice = require("../../../repositories/sql/games/games.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OfferService = class OfferService {
    constructor(logger, game, pricing){
        this.logger = logger;
        this.game = game;
        this.pricing = pricing;
    }
    /**
   * Create a new offer
   * @param data - The data of the offer to be created
   * @returns A message indicating that the offer was created
   */ async createOffer(data) {
        const { gameId, discountPrice, discountStartDate, discountEndDate, offerType } = data;
        this.logger.log(`Creating offer for game with ID ${gameId}`);
        // Update the game's pricing to include the offer
        await this.pricing.update(gameId, {
            free: false,
            discount: true,
            discountPrice,
            discountStartDate,
            discountEndDate,
            offerType
        });
        // Return a success message
        return {
            message: 'Offer created successfully'
        };
    }
    /**
   * Get paginated offers
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns An object containing the paginated offers and the total number of offers
   */ async getOffersPaginated(page, limit, orderBy, order, searchQuery, admin) {
        this.logger.log(`Retrieving offers, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        // Get features paginated and return them if they exist
        return await this.game.getGamesPaginated(page, limit, orderBy, order, true, searchQuery, admin);
    }
    /**
   * Updates an offer
   * @param data - The data of the offer to be updated
   * @returns A message indicating that the offer was updated
   */ async updateOffer(data) {
        const { id, discountPrice, discountStartDate, discountEndDate, offerType } = data;
        this.logger.log(`Updating offer with ID ${id}`);
        // Update the game's pricing to include the new offer details
        await this.pricing.update(id, {
            free: false,
            discountPrice,
            discountStartDate,
            discountEndDate,
            offerType
        });
        // Return a success message
        return {
            message: 'Offer updated successfully'
        };
    }
    /**
   * Delete offer by game ID
   * @param id The ID of the offer
   * @returns A message indicating the success of the operation
   */ async delete(id) {
        this.logger.log(`Deleting offer with ID: ${id}`);
        // Update the game's pricing to remove the offer
        await this.pricing.update(id, {
            discount: false,
            discountPrice: null,
            discountStartDate: null,
            discountEndDate: null,
            offerType: null
        });
        // Return a success message
        return {
            message: 'Offer deleted successfully'
        };
    }
};
OfferService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gamesservice.GamesService === "undefined" ? Object : _gamesservice.GamesService,
        typeof _gamespricingservice.GamesPricingService === "undefined" ? Object : _gamespricingservice.GamesPricingService
    ])
], OfferService);

//# sourceMappingURL=offer.service.js.map