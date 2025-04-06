// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompanyService", {
    enumerable: true,
    get: function() {
        return CompanyService;
    }
});
const _common = require("@nestjs/common");
const _companiesservice = require("../../repositories/sql/companies/companies.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CompanyService = class CompanyService {
    constructor(logger, company){
        this.logger = logger;
        this.company = company;
    }
    /**
   * Create a new publisher
   * @param data - The name and website of the publisher
   * @return A message indicating the success of the creation
   */ async createPublisher(data) {
        const { name, website } = data;
        this.logger.log(`Creating publisher with name ${name} and website ${website}`);
        // Create the publisher
        await this.company.create({
            name,
            website
        }, 'publisher');
        // Return a success message
        return {
            message: 'Publisher created successfully'
        };
    }
    /**
   * Create a new developer
   * @param data - The name and website of the developer
   * @returns A message indicating the success of the creation
   */ async createDeveloper(data) {
        const { name, website } = data;
        this.logger.log(`Creating developer with name ${name} and website ${website}`);
        // Create the developer
        await this.company.create({
            name,
            website
        }, 'developer');
        // Return a success message
        return {
            message: 'Developer created successfully'
        };
    }
    /**
   * Get publisher by ID
   * @param id
   * @returns The publisher
   */ async getPublisher(id) {
        this.logger.log(`Retrieving publisher with ID ${id}`);
        // Get publisher and return it if it exists
        return await this.company.getById(id, 'publisher');
    }
    /**
   * Get developer by ID
   * @param id
   * @returns The developer
   */ async getDeveloper(id) {
        this.logger.log(`Retrieving developer with ID ${id}`);
        // Get developer and return it if it exists
        return await this.company.getById(id, 'developer');
    }
    /**
   * Get publishers by IDs
   * @param ids
   * @return `Promise<Publisher[]>` An array of publishers
   */ async getPublishers(ids) {
        this.logger.log(`Retrieving publishers with IDs ${ids}`);
        // Get publishers and return them if they exist
        return await this.company.getByIds(ids, 'publisher');
    }
    /**
   * Get developers by IDs
   * @param ids
   * @returns An array of all developers
   */ async getDevelopers(ids) {
        this.logger.log(`Retrieving developers with IDs ${ids}`);
        // Get developers and return them if they exist
        return await this.company.getByIds(ids, 'developer');
    }
    /**
   * Get all publishers
   * @returns An array of all publishers
   */ async getAllPublishers() {
        this.logger.log(`Retrieving all publishers`);
        // Get publishers and return them
        return await this.company.getAll('id', 'asc', 'publishers');
    }
    /**
   * Get all developers
   * @returns  An array of all developers
   */ async getAllDevelopers() {
        this.logger.log(`Retrieving all developers`);
        // Get developers and return them
        return await this.company.getAll('id', 'asc', 'developers');
    }
    /**
   * Get paginated publishers
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated publishers and the total number of publishers
   */ async getPublishersPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving publishers, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        // Get publishers paginated and return them
        return await this.company.getCompaniesPaginated(page, limit, orderBy, order, 'publisher', searchQuery);
    }
    /**
   * Get paginated developers
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated developers and the total number of developers
   */ async getDevelopersPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving developers, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}}`);
        // Get developers paginated and return them
        return await this.company.getCompaniesPaginated(page, limit, orderBy, order, 'developer', searchQuery);
    }
    /**
   * Update publisher
   * @param id - The ID of the publisher
   * @param data - The new data for the publisher
   * @returns A message indicating the success of the update
   */ async updatePublisher(id, data) {
        this.logger.log(`Updating publisher with ID ${id}`);
        // Update publisher
        Promise.all([
            data.name && this.company.update(id, 'name', data.name, 'publisher'),
            data.website && this.company.update(id, 'website', data.website, 'publisher')
        ]);
        // Send a success response
        return {
            message: 'Publisher updated successfully'
        };
    }
    /**
   * Update developer
   * @param id - The ID of the developer
   * @param data - The new data for the developer
   * @returns A message indicating the success of the update
   */ async updateDeveloper(id, data) {
        this.logger.log(`Updating developer with ID ${id}`);
        // Update developer
        Promise.all([
            data.name && this.company.update(id, 'name', data.name, 'developer'),
            data.website && this.company.update(id, 'website', data.website, 'developer')
        ]);
        // Send a success response
        return {
            message: 'Developer updated successfully'
        };
    }
    /**
   * Delete publisher
   * @param id - The ID of the publisher
   * @returns A message indicating the success of the delete
   */ async deletePublisher(id) {
        this.logger.log(`Deleting publisher with ID ${id}`);
        // Delete publisher
        await this.company.remove(id, 'publisher');
        // Send a success response
        return {
            message: 'Publisher deleted successfully'
        };
    }
    /**
   * Delete developer
   * @param id - The ID of the developer
   * @returns A message indicating the success of the delete
   */ async deleteDeveloper(id) {
        this.logger.log(`Deleting developer with ID ${id}`);
        // Delete developer
        await this.company.remove(id, 'developer');
        // Send a success response
        return {
            message: 'Developer deleted successfully'
        };
    }
};
CompanyService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _companiesservice.CompaniesService === "undefined" ? Object : _companiesservice.CompaniesService
    ])
], CompanyService);

//# sourceMappingURL=company.service.js.map