// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagService", {
    enumerable: true,
    get: function() {
        return TagService;
    }
});
const _common = require("@nestjs/common");
const _gamestagsservice = require("../../repositories/sql/games-tags/games-tags.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TagService = class TagService {
    constructor(logger, tag){
        this.logger = logger;
        this.tag = tag;
    }
    /**
   * Create a new tag
   * @param data - The name and website of the tag
   * @returns A message indicating the success of the creation
   */ async createTag(data) {
        const { name } = data;
        this.logger.log(`Creating tag with name ${name}`);
        // Create the tag
        await this.tag.create(name);
        // Send the response
        return {
            message: 'Tag created successfully'
        };
    }
    /**
   * Get Tag by ID
   * @param id
   * @returns The tag
   */ async getTag(id) {
        this.logger.log(`Retrieving tag with ID ${id}`);
        // Send the response
        return this.tag.getById(id);
    }
    /**
   * Get tags by IDs
   * @param ids
   * @returns An array of tags
   */ async getTags(ids) {
        this.logger.log(`Retrieving tags with IDs ${ids}`);
        // Send the response
        return this.tag.getByIds(ids);
    }
    /**
   * Get all tags
   * @returns An array of all tags
   */ async getAllTags() {
        this.logger.log(`Retrieving all tags`);
        // Send the response
        return this.tag.getAll('id', 'ASC');
    }
    /**
   * Get paginated tags
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated tags and the total number of tags
   */ async getTagsPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving tags, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        // Send the response
        return await this.tag.getTagsPaginated(page, limit, orderBy, order, searchQuery);
    }
    /**
   * Update tag
   * @param id - The ID of the tag
   * @param data - The new data for the tag
   * @returns The updated tag
   */ async updateTag(id, data) {
        const { name } = data;
        this.logger.log(`Updating tag with ID ${id}`);
        // Update the tag
        await this.tag.update(id, name);
        // Send the response
        return {
            message: 'tag updated successfully'
        };
    }
    /**
   * Delete tag
   * @param id - The ID of the tag
   * @returns A message indicating the success of the delete
   */ async deleteTag(id) {
        this.logger.log(`Deleting tag with ID ${id}`);
        // Delete the tag
        await this.tag.removeById(id);
        // Send the response
        return {
            message: 'Tag deleted successfully'
        };
    }
};
TagService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gamestagsservice.GamesTagsService === "undefined" ? Object : _gamestagsservice.GamesTagsService
    ])
], TagService);

//# sourceMappingURL=tag.service.js.map