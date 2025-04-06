// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LanguageService", {
    enumerable: true,
    get: function() {
        return LanguageService;
    }
});
const _common = require("@nestjs/common");
const _gameslanguagesservice = require("../../repositories/sql/games-languages/games-languages.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LanguageService = class LanguageService {
    constructor(logger, language){
        this.logger = logger;
        this.language = language;
    }
    /**
   * Create a new language
   * @param data - The name and website of the language
   * @returns A message indicating the success of the creation
   */ async createLanguage(data) {
        const { name } = data;
        this.logger.log(`Creating tag with name ${name}`);
        // Create the language
        await this.language.create(name);
        // Send a success response
        return {
            message: 'Language created successfully'
        };
    }
    /**
   * Get Language by ID
   * @param id
   * @returns The language
   */ async getLanguage(id) {
        this.logger.log(`Retrieving language with ID ${id}`);
        // Send the response
        return this.language.getById(id);
    }
    /**
   * Get languages by IDs
   * @param ids
   * @returns An array of languages
   */ async getLanguages(ids) {
        this.logger.log(`Retrieving languages with IDs ${ids}`);
        // Send the response
        return this.language.getByIds(ids);
    }
    /**
   * Get all languages
   * @return An array of all languages
   */ async getAllLanguages() {
        this.logger.log(`Retrieving all languages`);
        // Send the response
        return this.language.getAll('id', 'ASC');
    }
    /**
   * Get paginated languages
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated languages
   */ async getLanguagesPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving languages, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        return await this.language.getLanguagesPaginated(page, limit, orderBy, order, searchQuery);
    }
    /**
   * Update language
   * @param id - The ID of the language
   * @param data - The new data for the language
   * @returns The updated language
   */ async updateLanguage(id, data) {
        const { name } = data;
        this.logger.log(`Updating language with ID ${id}`);
        // Update the language
        await this.language.update(id, name);
        // Send a success message
        return {
            message: 'Language updated successfully'
        };
    }
    /**
   * Delete language
   * @param id - The ID of the language
   * @returns `Promise<{ message: string }>` A message indicating the success of the delete
   */ async deleteLanguage(id) {
        this.logger.log(`Deleting language with ID ${id}`);
        // Delete the language
        await this.language.remove(id);
        // Send a success message
        return {
            message: 'Language deleted successfully'
        };
    }
};
LanguageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gameslanguagesservice.GamesLanguagesService === "undefined" ? Object : _gameslanguagesservice.GamesLanguagesService
    ])
], LanguageService);

//# sourceMappingURL=language.service.js.map