// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompaniesService", {
    enumerable: true,
    get: function() {
        return CompaniesService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _companyentity = require("./company.entity");
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
let CompaniesService = class CompaniesService {
    constructor(logger, publisherRepository, developerRepository){
        this.logger = logger;
        this.publisherRepository = publisherRepository;
        this.developerRepository = developerRepository;
    }
    /**
   * Retrieves all companies.
   * @param type - The type of the companies (publishers or developers).
   * @returns A list of companies.
   */ async getAll(sortBy, sortOrder, type) {
        this.logger.log(`Retrieving all ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);
        // Get the repository based on the type
        const repository = type === 'publishers' ? this.publisherRepository : this.developerRepository;
        // Find all companies
        const companies = repository.find({
            order: {
                [sortBy]: sortOrder
            }
        });
        // Return the list of companies
        return companies;
    }
    /**
   * Retrieves a company by ID.
   * @param id - The ID of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The retrieved company.
   * @throws `NotFoundException` If the company is not found.
   */ async getById(id, type) {
        this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with ID ${id} from the database`);
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Find the company by ID
        const company = await repository.findOne({
            where: {
                id
            }
        });
        // Throw a not found exception if the company is not found
        if (!company) throw new _common.NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
        // Return the company
        return company;
    }
    /**
   * Retrieves multiple companies by IDs.
   * @param ids - The IDs of the companies.
   * @param type - The type of the companies (publisher or developer).
   * @returns The retrieved companies.
   * @throws `NotFoundException` If any of the companies are not found.
   */ async getByIds(ids, type) {
        this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with IDs ${ids} from the database`);
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Find the companies by IDs
        const companies = await repository.find({
            where: {
                id: (0, _typeorm1.In)(ids)
            }
        });
        // Throw a not found exception if any of the companies are not found
        if (companies.length !== ids.length) {
            const missingIds = ids.filter((id)=>!companies.some((company)=>company.id === id));
            throw new _common.NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found: ${missingIds.join(', ')}`);
        }
        // Return the companies
        return companies;
    }
    /**
   * Retrieves a company by name.
   * @param name - The name of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The retrieved company.
   * @throws `NotFoundException` If the company is not found.
   */ async getByName(name, type) {
        this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with name ${name} from the database`);
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Find the company by name
        const company = await repository.findOne({
            where: {
                name
            }
        });
        // Throw a not found exception if the company is not found
        if (!company) throw new _common.NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
        return company;
    }
    /**
   * Gets paginated companies.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param type - The type of companies to retrieve
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated companies.
   */ async getCompaniesPaginated(page, limit, orderBy, order, type, searchQuery) {
        this.logger.log(`Getting ${type}s paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Build the where clause
        const where = {};
        if (searchQuery.name) {
            where.name = (0, _typeorm1.ILike)(`%${searchQuery.name}%`);
        }
        if (searchQuery.website) {
            where.website = (0, _typeorm1.ILike)(`%${searchQuery.website}%`);
        }
        // Find and count the companies
        const [items, total] = await repository.findAndCount({
            where,
            order: {
                [orderBy]: order
            },
            skip: Math.max((page - 1) * limit, 0),
            take: limit
        });
        // Calculate the total number of pages
        const totalPages = Math.ceil(total / limit);
        this.logger.log(`Found ${total} ${type}s in the database`);
        // Return the paginated companies
        return {
            items,
            total,
            totalPages
        };
    }
    /**
   * Creates a new company.
   * @param name - The name of the company.
   * @param website - The website of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The created company.
   * @throws `ConflictException` If the company name or website already exists.
   */ async create(company, type) {
        this.logger.log(`Creating a new ${type.charAt(0).toUpperCase() + type.slice(1)} in the database`);
        // Check if the company name or website already exists
        await this.checkValueIsUnique('name', company.name, type);
        await this.checkValueIsUnique('website', company.website, type);
        // Check if the url is valid
        await this.checkValidWebsite(company.website);
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Create and save the new company
        const newCompany = repository.create({
            name: company.name,
            website: company.website
        });
        // Save the new company
        if (!newCompany) throw new _common.InternalServerErrorException('Failed to create company');
        // Return the new company
        return repository.save(newCompany);
    }
    /**
   * Updates a company.
   * @param id - The ID of the company.
   * @param updateType - The type of the update (name or website).
   * @param value - The new value of the update.
   * @param type - The type of the company (publisher or developer).
   * @returns The updated company.
   * @throws `NotFoundException` If the company is not found.
   * @throws `ConflictException` If the update value already exists.
   * @throws `BadRequestException` If the update value is invalid.
   */ async update(id, updateType, value, type) {
        this.logger.log(`Updating ${type.charAt(0).toUpperCase() + type.slice(1)} in the database`);
        const company = await this.getById(id, type);
        // Check if the company exists
        await this.checkCompanyExists('id', id, type);
        // Check if the update value is unique and website is valid
        if (updateType === 'name' && value !== company.name) await this.checkValueIsUnique(updateType, value, type);
        if (updateType === 'website' && value !== company.website) await this.checkValueIsUnique(updateType, value, type);
        if (updateType === 'website') {
            await this.checkValidWebsite(value);
        }
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Update the company
        company[updateType] = value;
        // Save the updated company
        const updatedCompany = await repository.save(company);
        // Throw an exception if the company was not updated
        if (!updatedCompany) throw new _common.InternalServerErrorException(`Failed to update ${type} in the database`);
        // Return the updated company
        return updatedCompany;
    }
    /**
   * Deletes a company.
   * @param id - The ID of the company.
   * @param type - The type of the company (publisher or developer).
   * @throws `NotFoundException` If the company is not found.
   */ async remove(id, type) {
        this.logger.log(`Removing ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);
        // Check if company exists
        await this.checkCompanyExists('id', id, type);
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Attempt to delete the company
        const result = await repository.delete(id);
        // Throw an exception if the company was not deleted
        if (!result.affected) throw new _common.InternalServerErrorException(`Failed to delete ${type} from the database`);
    }
    /**
   * Removes all companies from the database.
   * @param type - The type of the companies (publishers or developers).
   * @throws `InternalServerErrorException` If the removal fails.
   */ async removeAll(type) {
        this.logger.log(`Removing all ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);
        // Get the repository based on the type
        const repository = type === 'publishers' ? this.publisherRepository : this.developerRepository;
        // Attempt to delete all records
        const result = await repository.delete({});
        // Throw an exception if the removal fails
        if (result.affected === undefined) throw new _common.InternalServerErrorException(`Failed to remove ${type} from the database`);
    }
    /**
   * Checks if a company with the given property exists.
   * @param checkBy - The property to check (id, name, or website).
   * @param checkValue - The value to check.
   * @param type - The type of the company (publisher or developer).
   * @throws `NotFoundException` If the company is not found.
   */ async checkCompanyExists(checkBy, checkValue, type) {
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Check if company exists
        const company = await repository.findOne({
            where: {
                [checkBy]: checkValue
            }
        });
        // Throw a not found exception if company does not exist
        if (!company) throw new _common.NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
    }
    /**
   * Checks if a value is unique.
   * @param updateType - The type of the update (name or website).
   * @param value - The value to check.
   * @param type - The type of the company (publisher or developer).
   * @throws `ConflictException` If the value is not unique.
   */ async checkValueIsUnique(updateType, value, type) {
        // Get the repository based on the type
        const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
        // Check if value is unique
        const company = await repository.findOne({
            where: {
                [updateType]: value
            }
        });
        // Throw a conflict exception if value is not unique
        if (company) throw new _common.ConflictException(`${type.charAt(0).toUpperCase() + type.slice(1)} ${updateType} already exists`);
    }
    /**
   * Checks if the website is valid.
   * @param website - The website to check.
   * @throws `BadRequestException` If the website is not valid.
   */ async checkValidWebsite(website) {
        // Regular expression to match a valid website URL
        const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        // Throw a bad request exception if the website is not valid
        if (!website.match(urlRegex)) throw new _common.BadRequestException('Invalid website URL');
    }
};
CompaniesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_companyentity.Publisher, 'sql')),
    _ts_param(2, (0, _typeorm.InjectRepository)(_companyentity.Developer, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CompaniesService);

//# sourceMappingURL=companies.service.js.map