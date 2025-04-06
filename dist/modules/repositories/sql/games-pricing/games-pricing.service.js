// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesPricingService", {
    enumerable: true,
    get: function() {
        return GamesPricingService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _decimal = /*#__PURE__*/ _interop_require_default(require("decimal.js"));
const _gamepricingentity = require("./game-pricing.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let GamesPricingService = class GamesPricingService {
    constructor(logger, gamesPricingRepository){
        this.logger = logger;
        this.gamesPricingRepository = gamesPricingRepository;
        this.relations = {
            game: true
        };
    }
    /**
   * Get all pricing
   * @param sortBy Sort by
   * @param sortOrder Sort order
   * @returns Promise that resolves to an array of pricings
   */ async getAll(sortBy, sortOrder) {
        this.logger.log(`Retrieving all pricings with sort order ${sortOrder} and sort by ${sortBy}`);
        // Get all pricings
        const pricings = await this.gamesPricingRepository.find({
            relations: this.relations,
            order: {
                [sortBy]: sortOrder
            }
        });
        // Update discount status for each pricing
        pricings.forEach(this.updateDiscountStatus);
        // Return pricings
        return pricings;
    }
    /**
   * Get pricing by ID
   * @param id Pricing ID
   * @returns Promise that resolves to a pricing
   * @throws `NotFoundException` If pricing not found
   */ async getById(id) {
        this.logger.log(`Retrieving pricing with ID ${id}`);
        // Find pricing by ID
        const pricing = await this.gamesPricingRepository.findOne({
            where: {
                id
            },
            relations: this.relations
        });
        if (!pricing) throw new _common.NotFoundException(`Pricing with ID ${id} not found`);
        // Update discount status for pricing
        this.updateDiscountStatus(pricing);
        // Return pricing
        return pricing;
    }
    /**
   * Get pricing by game ID
   * @param id Game ID
   * @returns Promise that resolves to a pricing
   * @throws `NotFoundException` If pricing not found
   */ async getByGameId(id) {
        this.logger.log(`Retrieving pricing for game with ID ${id}`);
        // Find pricing by game ID
        const pricing = await this.gamesPricingRepository.findOne({
            where: {
                game: {
                    id
                }
            },
            relations: this.relations
        });
        if (!pricing) throw new _common.NotFoundException(`Pricing for game with ID ${id} not found`);
        // Update discount status for pricing
        this.updateDiscountStatus(pricing);
        return pricing;
    }
    /**
   * Get games by pricing
   * @param options Options
   * @returns Promise that resolves to an array of games
   */ async getGamesByPricing(options) {
        this.logger.log(`Retrieving games by pricing with options ${JSON.stringify(options)}`);
        // Validate options
        if (options.free && options.discount) throw new _common.BadRequestException(`Game can't be free and discounted at the same time`);
        // Build where conditions
        const whereConditions = [];
        // Add where conditions
        if (options.discount) whereConditions.push({
            discount: true
        });
        if (options.free) whereConditions.push({
            free: true
        });
        // Add price range
        if (options.minPrice || options.maxPrice) {
            if (options.minPrice && options.maxPrice) {
                whereConditions.push(options.discount ? {
                    discountPrice: (0, _typeorm1.Between)(options.minPrice, options.maxPrice)
                } : {
                    basePrice: (0, _typeorm1.Between)(options.minPrice, options.maxPrice)
                });
            } else if (options.minPrice) {
                whereConditions.push(options.discount ? {
                    discountPrice: (0, _typeorm1.MoreThanOrEqual)(options.minPrice)
                } : {
                    basePrice: (0, _typeorm1.MoreThanOrEqual)(options.minPrice)
                });
            } else if (options.maxPrice) {
                whereConditions.push(options.discount ? {
                    discountPrice: (0, _typeorm1.LessThanOrEqual)(options.maxPrice)
                } : {
                    basePrice: (0, _typeorm1.LessThanOrEqual)(options.maxPrice)
                });
            }
        }
        // Add pagination
        let skip;
        let take;
        if (options.skip || options.take) {
            skip = options.skip;
            take = options.take;
        }
        // Fetch pricings
        const pricings = await this.gamesPricingRepository.find({
            where: whereConditions.length > 0 ? whereConditions : {},
            relations: this.relations,
            order: {
                [options.sortBy]: options.sortOrder
            },
            skip,
            take
        });
        // Update discount status for each pricing
        return pricings.map((pricing)=>pricing.game);
    }
    /**
   * Create pricing
   * @param pricing Pricing
   * @returns Promise that resolves when the creation is successful
   */ async create(pricing) {
        this.logger.log(`Creating pricing for game with ID ${pricing.game.id}`);
        // Validate pricing
        await this.validatePricing({
            free: pricing.free,
            basePrice: pricing.basePrice,
            discount: pricing.discount,
            discountPrice: pricing.discountPrice,
            discountStartDate: pricing.discountStartDate,
            discountEndDate: pricing.discountEndDate,
            offerType: pricing.offerType
        });
        // Calculate discount percentage
        const discountPercentage = pricing.discount ? await this.calculateDiscountPercentage(pricing.discountPrice, pricing.basePrice) : null;
        // Create new game pricing entity
        const createdPricing = this.gamesPricingRepository.create({
            free: pricing.free,
            basePrice: pricing.basePrice,
            discount: pricing.discount,
            discountPrice: pricing.discountPrice,
            discountStartDate: pricing.discountStartDate,
            discountEndDate: pricing.discountEndDate,
            offerType: pricing.offerType,
            discountPercentage,
            game: pricing.game
        });
        // Update discount status
        this.updateDiscountStatus(createdPricing);
        // Save the pricing entity
        const result = await this.gamesPricingRepository.save(createdPricing);
        // Log the successful creation of the pricing
        if (!result) throw new _common.InternalServerErrorException('Failed to create pricing');
        // Return the created pricing
        return result;
    }
    /**
   * Update pricing
   * @param id Pricing ID
   * @param pricing Pricing
   * @returns Promise that resolves when the update is successful
   * @throws `NotFoundException` If pricing not found
   */ async update(id, pricing) {
        this.logger.log(`Updating pricing with ID ${id}`);
        // Check if pricing exists
        const existingPricing = await this.gamesPricingRepository.findOne({
            where: {
                id
            }
        });
        if (!existingPricing) throw new _common.NotFoundException(`Game with ID ${id} not found`);
        // Validate pricing
        await this.validatePricing({
            free: pricing.free ?? existingPricing.free,
            basePrice: pricing.basePrice ?? existingPricing.basePrice,
            discount: pricing.discount ?? existingPricing.discount,
            discountPrice: pricing.discountPrice,
            discountStartDate: pricing.discountStartDate,
            discountEndDate: pricing.discountEndDate,
            offerType: pricing.offerType
        });
        // Calculate discount percentage
        const discountPercentage = pricing.discount ? await this.calculateDiscountPercentage(pricing.discountPrice, existingPricing.basePrice) : existingPricing.discountPercentage;
        // Update fields
        if (pricing.basePrice) existingPricing.basePrice = pricing.basePrice ?? existingPricing.basePrice;
        if (pricing.discount) existingPricing.discount = pricing.discount ?? existingPricing.discount;
        if (discountPercentage) existingPricing.discountPercentage = discountPercentage ?? existingPricing.discountPercentage;
        if (pricing.discountPrice) existingPricing.discountPrice = pricing.discountPrice ?? existingPricing.discountPrice;
        if (pricing.discountStartDate) existingPricing.discountStartDate = pricing.discountStartDate ?? existingPricing.discountStartDate;
        if (pricing.discountEndDate) existingPricing.discountEndDate = pricing.discountEndDate ?? existingPricing.discountEndDate;
        if (pricing.offerType) existingPricing.offerType = pricing.offerType ?? existingPricing.offerType;
        if (pricing.free) existingPricing.free = pricing.free ?? existingPricing.free;
        // Update discount status
        this.updateDiscountStatus(existingPricing);
        // Save changes
        const result = this.gamesPricingRepository.save(existingPricing);
        // Log the successful update of the pricing
        if (!result) throw new _common.InternalServerErrorException(`Failed to update pricing with ID ${id}`);
        // Return the updated pricing
        return result;
    }
    /**
   * Delete pricing
   * @param id Pricing ID
   * @returns Promise that resolves when the deletion is successful
   * @throws `NotFoundException` If pricing not found
   * @throws `InternalServerErrorException` If failed to delete
   */ async remove(id) {
        this.logger.log(`Deleting pricing with ID ${id}`);
        // Check if pricing exists
        const existingPricing = await this.gamesPricingRepository.findOne({
            where: {
                id
            }
        });
        // Log the initiation of the pricing deletion process
        if (!existingPricing) throw new _common.NotFoundException(`Pricing with ID ${id} not found`);
        // Delete the pricing
        const result = await this.gamesPricingRepository.remove(existingPricing);
        // Log the successful deletion of the pricing
        if (!result) throw new _common.InternalServerErrorException(`Failed to delete pricing with ID ${id}`);
        // Return the deleted pricing
        return result;
    }
    /**
   * Delete all pricings
   * @returns Promise that resolves when the deletion is successful
   * @throws `InternalServerErrorException` If failed to delete
   */ async removeAll() {
        this.logger.log('Deleting all pricings');
        // Delete the pricings
        const result = await this.gamesPricingRepository.delete({});
        // Log the successful deletion of the pricings
        if (result === undefined) throw new _common.InternalServerErrorException('Failed to delete pricings');
    }
    /**
   * Update discount status based on current date
   * @param pricing GamePricing entity
   */ updateDiscountStatus(pricing) {
        // Get current date
        const currentDate = new Date();
        // Update discount status to false if discount end date is before current date
        if (pricing.discount && pricing.discountEndDate && currentDate > pricing.discountEndDate) {
            pricing.discount = false;
            pricing.discountPrice = null;
            pricing.discountPercentage = null;
            pricing.discountStartDate = null;
            pricing.discountEndDate = null;
            pricing.offerType = null;
        }
    }
    /**
   * Validate pricing
   * @param pricing Pricing entity
   * @returns Promise that resolves when validation is successful
   * @throws `BadRequestException` If validation fails
   */ async validatePricing(pricing) {
        // Create decimals
        const basePriceDecimal = pricing.basePrice && new _decimal.default(pricing.basePrice);
        // If game is free, throw a bad request exception with a message
        if (pricing.free && pricing.discount) throw new _common.BadRequestException('Game is free, cannot have discount');
        // If game is not free and base price is not provided or less than or equal to 0, throw a bad request exception with a message
        if (!pricing.free && (!pricing.basePrice || basePriceDecimal.lte(0))) throw new _common.BadRequestException('Game is not free, Base price is required, and must be greater than 0');
        // If discount is provided, validate the following
        if (pricing.discount) {
            // If discount price is not provided, throw a bad request exception with a message
            if (!pricing.discountPrice) throw new _common.BadRequestException('Discount price is required');
            // If discount start date is not provided, throw a bad request exception with a message
            if (!pricing.discountStartDate) throw new _common.BadRequestException('Discount start date is required');
            // If discount end date is not provided, throw a bad request exception with a message
            if (!pricing.discountEndDate) throw new _common.BadRequestException('Discount end date is required');
            // If offer type is not provided, throw a bad request exception with a message
            if (!pricing.offerType) throw new _common.BadRequestException('Offer type is required');
            // If discount start date is greater than discount end date, throw a bad request exception with a message
            if (pricing.discountStartDate > pricing.discountEndDate) throw new _common.BadRequestException('Discount start date cannot be greater than discount end date');
            // If discount end date is less than current date, throw a bad request exception with a message
            if (pricing.discountEndDate < new Date()) throw new _common.BadRequestException('Discount end date cannot be less than current date');
        }
    }
    /**
   * Calculate discount percentage
   * @param discountPrice Discount price
   * @param basePrice Base price
   * @returns Promise that resolves to discount percentage
   * @throws `BadRequestException` If base price is less than or equal to 0
   */ async calculateDiscountPercentage(discountPrice, basePrice) {
        // Create decimals
        const basePriceDecimal = new _decimal.default(basePrice);
        const discountPriceDecimal = new _decimal.default(discountPrice);
        // If base price is less than or equal to 0, throw a bad request exception with a message
        if (!basePrice || basePriceDecimal.eq(0)) throw new _common.BadRequestException('Base price must be greater than 0 to calculate discount percentage');
        // Calculate discount percentage
        const discountPercentage = basePriceDecimal.minus(discountPriceDecimal).dividedBy(basePriceDecimal).times(100).toDecimalPlaces(0).toNumber();
        return discountPercentage;
    }
};
GamesPricingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_gamepricingentity.GamePricing, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], GamesPricingService);

//# sourceMappingURL=games-pricing.service.js.map