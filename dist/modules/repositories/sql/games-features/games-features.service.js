// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesFeaturesService", {
    enumerable: true,
    get: function() {
        return GamesFeaturesService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _gamefeatureentity = require("./game-feature.entity");
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
let GamesFeaturesService = class GamesFeaturesService {
    constructor(logger, gameFeatureRepository){
        this.logger = logger;
        this.gameFeatureRepository = gameFeatureRepository;
    }
    /**
   * Gets all features.
   * @returns A promise that resolves to an array of features.
   */ async getAll(orderBy, order) {
        this.logger.log('Getting all features');
        // Get all features
        const features = await this.gameFeatureRepository.find({
            order: {
                [orderBy]: order
            }
        });
        // Return the features
        return features;
    }
    /**
   * Gets a feature by its ID.
   * @param id - The ID of the feature to retrieve.
   * @returns A promise that resolves to the retrieved feature.
   * @throws `NotFoundException` If the feature is not found.
   */ async getById(id) {
        this.logger.log(`Getting feature with ID ${id}`);
        // Get the feature by its ID
        const feature = await this.gameFeatureRepository.findOne({
            where: {
                id
            }
        });
        // Throw a NotFoundException if the feature is not found
        if (!feature) throw new _common.NotFoundException(`Feature with ID ${id} not found`);
        // return the feature
        return feature;
    }
    /**
   * Gets features by their IDs.
   * @param ids - The IDs of the features to retrieve.
   * @returns A promise that resolves to an array of features.
   * @throws `NotFoundException` If any of the features are not found.
   */ async getByIds(ids) {
        this.logger.log(`Getting features with IDs ${ids}`);
        // Get the features by their IDs
        const features = await this.gameFeatureRepository.find({
            where: {
                id: (0, _typeorm1.In)(ids)
            }
        });
        // if any feature is not found throw an error
        if (features.length < ids.length) {
            const missingIds = ids.filter((id)=>!features.some((feature)=>feature.id === id));
            throw new _common.NotFoundException(`Features with IDs ${missingIds} not found`);
        }
        // return the features
        return features;
    }
    /**
   * Gets a feature by its name.
   * @param name - The name of the feature to retrieve.
   * @returns A promise that resolves to the retrieved feature.
   * @throws `NotFoundException` If the feature is not found.
   */ async getByName(name) {
        this.logger.log(`Getting feature with name ${name}`);
        // Get the feature by its name
        const feature = await this.gameFeatureRepository.findOne({
            where: {
                name
            }
        });
        // Throw a NotFoundException if the feature is not found
        if (!feature) throw new _common.NotFoundException(`Feature with name ${name} not found`);
        // return the feature
        return feature;
    }
    /**
   * Gets paginated features.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated features.
   */ async getFeaturesPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Getting features paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);
        // Create a where clause based on the search query
        const where = {};
        if (searchQuery?.name) {
            where.name = (0, _typeorm1.ILike)(`%${searchQuery.name}%`);
        }
        // Get the paginated features
        const [items, total] = await this.gameFeatureRepository.findAndCount({
            where,
            order: {
                [orderBy]: order
            },
            skip: Math.max((page - 1) * limit, 0),
            take: limit
        });
        // Calculate the total number of pages
        const totalPages = Math.ceil(total / limit);
        // Return the paginated features and total number of pages
        return {
            items,
            total,
            totalPages
        };
    }
    /**
   * Creates a new feature.
   * @param feature - An object containing the name and icon of the feature.
   * @returns A promise that resolves to the created feature.
   * @throws `InternalServerErrorException` If the feature could not be created.
   */ async create(feature) {
        this.logger.log(`Creating feature with name ${feature.name}`);
        // Check if the feature already exists with the same name
        const existingFeature = await this.gameFeatureRepository.findOne({
            where: {
                name: feature.name
            }
        });
        if (existingFeature) throw new _common.ConflictException(`Feature with name ${feature.name} already exists`);
        // Create the new feature
        const newFeature = this.gameFeatureRepository.create({
            name: feature.name,
            icon: feature.icon
        });
        // Save the new feature
        const createdFeature = await this.gameFeatureRepository.save(newFeature);
        // Throw an InternalServerErrorException if the feature could not be created
        if (!createdFeature) throw new _common.InternalServerErrorException('Failed to create feature');
        // Return the created feature
        return createdFeature;
    }
    /**
   * Updates an existing feature.
   * @param id - The ID of the feature to update.
   * @param feature - The updated feature data.
   * @returns A promise that resolves to the updated feature.
   * @throws `NotFoundException` If the feature is not found.
   * @throws `InternalServerErrorException` If no data is provided to update.
   */ async update(id, feature) {
        this.logger.log(`Updating feature with ID ${id}`);
        // Find the existing feature by its ID
        const existingFeature = await this.gameFeatureRepository.findOne({
            where: {
                id
            }
        });
        // Throw a NotFoundException if the feature does not exist
        if (!existingFeature) throw new _common.NotFoundException(`Feature with ID ${id} not found`);
        // Throw an InternalServerErrorException if no data to update
        if (feature.name === undefined && feature.icon === undefined) throw new _common.InternalServerErrorException('No valid data provided for updating');
        // Update the existing feature with the new values
        if (feature.name !== undefined) existingFeature.name = feature.name;
        if (feature.icon !== undefined) existingFeature.icon = feature.icon;
        // Save the updated feature entity
        const updatedFeature = await this.gameFeatureRepository.save(existingFeature);
        // Return the updated feature
        return updatedFeature;
    }
    /**
   * Removes a feature by its ID.
   * @param {number} id - The ID of the feature to remove.
   * @returns A promise that resolves to the removed feature.
   * @throws `NotFoundException` If the feature is not found.
   * @throws `InternalServerErrorException` If the feature could not be removed.
   */ async remove(id) {
        this.logger.log(`Removing feature with ID ${id}`);
        // Find the feature by its ID
        const feature = await this.gameFeatureRepository.findOne({
            where: {
                id
            }
        });
        // Throw a NotFoundException if the feature does not exist
        if (!feature) throw new _common.NotFoundException(`Feature with ID ${id} not found`);
        // Remove the feature
        const result = await this.gameFeatureRepository.remove(feature);
        // Throw an InternalServerErrorException if the feature could not be removed
        if (!result) throw new _common.InternalServerErrorException('Failed to remove feature');
        // Return the removed feature
        return result;
    }
    /**
   * Removes all features.
   * @throws `InternalServerErrorException` If the features could not be removed.
   */ async removeAll() {
        this.logger.log('Removing all features');
        // Remove all features
        const result = await this.gameFeatureRepository.delete({});
        // Throw an InternalServerErrorException if the features could not be removed
        if (result === undefined) throw new _common.InternalServerErrorException('Failed to remove features');
    }
};
GamesFeaturesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_gamefeatureentity.GameFeature, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], GamesFeaturesService);

//# sourceMappingURL=games-features.service.js.map