// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FeatureService", {
    enumerable: true,
    get: function() {
        return FeatureService;
    }
});
const _common = require("@nestjs/common");
const _gamesfeaturesservice = require("../../repositories/sql/games-features/games-features.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FeatureService = class FeatureService {
    constructor(logger, feature){
        this.logger = logger;
        this.feature = feature;
    }
    /**
   * Create a new feature
   * @param data - The name and website of the feature
   * @returns A success message
   */ async createFeature(data) {
        const { name, icon } = data;
        // Convert icon from base64 to buffer
        const iconAsBuffer = Buffer.from(icon, 'base64');
        // Create the feature
        this.logger.log(`Creating feature with name ${name}`);
        await this.feature.create({
            name,
            icon: iconAsBuffer
        });
        // Send a success response
        return {
            message: 'Feature created successfully'
        };
    }
    /**
   * Get Feature by ID
   * @param id
   * @returns The feature
   */ async getFeature(id) {
        this.logger.log(`Retrieving feature with ID ${id}`);
        // Get feature and return it if it exists
        return this.feature.getById(id);
    }
    /**
   * Get features by IDs
   * @param ids
   * @returns An array of features
   */ async getFeatures(ids) {
        this.logger.log(`Retrieving features with IDs ${ids}`);
        // Get features and return them if they exist
        return this.feature.getByIds(ids);
    }
    /**
   * Get all features
   * @returns An array of all features
   */ async getAllFeatures() {
        this.logger.log(`Retrieving all features`);
        // Get all features and return them
        return this.feature.getAll('id', 'ASC');
    }
    /**
   * Get paginated features
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns An object containing the paginated features and the total number of features
   */ async getFeaturesPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving features, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        // Get features paginated and return them if they exist
        return await this.feature.getFeaturesPaginated(page, limit, orderBy, order, searchQuery);
    }
    /**
   * Update feature
   * @param id - The ID of the feature
   * @param data - The new data for the feature
   * @returns A success message
   */ async updateFeature(id, data) {
        const { name, icon } = data;
        this.logger.log(`Updating feature with ID ${id}`);
        // Convert icon from base64 to buffer
        const iconAsBuffer = Buffer.from(icon, 'base64');
        // Update the feature
        await this.feature.update(id, {
            name,
            icon: iconAsBuffer
        });
        // Send a success response
        return {
            message: 'Feature updated successfully'
        };
    }
    /**
   * Delete feature
   * @param id - The ID of the feature
   * @returns A message indicating the success of the delete
   */ async deleteFeature(id) {
        this.logger.log(`Deleting feature with ID ${id}`);
        // Delete the feature
        await this.feature.remove(id);
        // Send a success response
        return {
            message: 'Feature deleted successfully'
        };
    }
};
FeatureService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gamesfeaturesservice.GamesFeaturesService === "undefined" ? Object : _gamesfeaturesservice.GamesFeaturesService
    ])
], FeatureService);

//# sourceMappingURL=feature.service.js.map