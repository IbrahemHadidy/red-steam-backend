// NestJS
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

// Entities
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';

// Types
import { Developer as DeveloperType, Publisher as PublisherType } from '@repositories/sql/companies/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(Publisher, 'sql')
    private readonly publisherRepository: Repository<Publisher>,

    @InjectRepository(Developer, 'sql')
    private readonly developerRepository: Repository<Developer>,
  ) {}

  /**
   * Checks if a company with the given property exists.
   * @param checkBy - The property to check (id, name, or website).
   * @param checkValue - The value to check.
   * @param type - The type of the company (publisher or developer).
   * @throws {NotFoundException} If the company is not found.
   */
  private async checkCompanyExists(
    checkBy: 'id' | 'name' | 'website',
    checkValue: number | string,
    type: 'publisher' | 'developer',
  ): Promise<void> {
    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Check if company exists
    const company = await repository.findOne({ where: { [checkBy]: checkValue } });

    // Throw a not found exception if company does not exist
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
  }

  /**
   * Checks if a value is unique.
   * @param updateType - The type of the update (name or website).
   * @param value - The value to check.
   * @param type - The type of the company (publisher or developer).
   * @throws {ConflictException} If the value is not unique.
   */
  private async checkValueIsUnique(
    updateType: 'name' | 'website',
    value: string,
    type: 'publisher' | 'developer',
  ): Promise<void> {
    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Check if value is unique
    const company = await repository.findOne({ where: { [updateType]: value } });

    // Throw a conflict exception if value is not unique
    if (company)
      throw new ConflictException(`${type.charAt(0).toUpperCase() + type.slice(1)} ${updateType} already exists`);
  }

  /**
   * Checks if the website is valid.
   * @param website - The website to check.
   * @throws {BadRequestException} If the website is not valid.
   */
  private async checkValidWebsite(website: string): Promise<void> {
    // Regular expression to match a valid website URL
    const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

    // Throw a bad request exception if the website is not valid
    if (!website.match(urlRegex)) throw new BadRequestException('Invalid website URL');
  }

  /**
   * Retrieves all companies.
   * @param type - The type of the companies (publishers or developers).
   * @returns A list of companies.
   */
  public async getAll(
    sortBy: 'id' | 'name' | 'website',
    sortOrder: 'asc' | 'desc',
    type: 'publishers' | 'developers',
  ): Promise<(PublisherType | DeveloperType)[]> {
    this.logger.log(`Retrieving all ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);

    // Get the repository based on the type
    const repository = type === 'publishers' ? this.publisherRepository : this.developerRepository;

    // Find all companies
    const companies = repository.find({ order: { [sortBy]: sortOrder } });

    // Return the list of companies
    return companies;
  }

  /**
   * Retrieves a company by ID.
   * @param id - The ID of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The retrieved company.
   * @throws {NotFoundException} If the company is not found.
   */
  public async getById(id: number, type: 'publisher' | 'developer'): Promise<DeveloperType | PublisherType> {
    this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with ID ${id} from the database`);

    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Find the company by ID
    const company = await repository.findOne({ where: { id } });

    // Throw a not found exception if the company is not found
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);

    // Return the company
    return company;
  }

  /**
   * Retrieves multiple companies by IDs.
   * @param ids - The IDs of the companies.
   * @param type - The type of the companies (publisher or developer).
   * @returns The retrieved companies.
   * @throws {NotFoundException} If any of the companies are not found.
   */
  public async getByIds(ids: number[], type: 'publisher' | 'developer'): Promise<(PublisherType | DeveloperType)[]> {
    this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with IDs ${ids} from the database`);

    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Find the companies by IDs
    const companies = await repository.find({ where: { id: In(ids) } });

    // Throw a not found exception if any of the companies are not found
    if (companies.length !== ids.length) {
      const missingIds = ids.filter((id) => !companies.some((company) => company.id === id));
      throw new NotFoundException(
        `${type.charAt(0).toUpperCase() + type.slice(1)} not found: ${missingIds.join(', ')}`,
      );
    }

    // Return the companies
    return companies;
  }

  /**
   * Retrieves a company by name.
   * @param name - The name of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The retrieved company.
   * @throws {NotFoundException} If the company is not found.
   */
  public async getByName(name: string, type: 'publisher' | 'developer'): Promise<DeveloperType | PublisherType> {
    this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with name ${name} from the database`);

    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Find the company by name
    const company = await repository.findOne({ where: { name } });

    // Throw a not found exception if the company is not found
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
    return company;
  }

  /**
   * Gets paginated companies.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @param {string} orderBy - The field to order by.
   * @param {('ASC' | 'DESC')} order - The order direction.
   * @param {('publisher' | 'developer')} type - The type of companies to retrieve
   * @param {{name?: string; website?: string}} searchQuery - The search query.
   * @returns {Promise<{ items: (PublisherType | DeveloperType)[], total: number, totalPages: number }>} A promise that resolves to the paginated companies.
   */
  public async getCompaniesPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name' | 'website',
    order: 'ASC' | 'DESC',
    type: 'publisher' | 'developer',
    searchQuery?: { name?: string; website?: string },
  ): Promise<{ items: (PublisherType | DeveloperType)[]; total: number; totalPages: number }> {
    this.logger.log(`Getting ${type}s paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Build the where clause
    const where: FindOptionsWhere<Publisher | Developer> = {};
    if (searchQuery.name) {
      where.name = ILike(`%${searchQuery.name}%`);
    }
    if (searchQuery.website) {
      where.website = ILike(`%${searchQuery.website}%`);
    }

    // Find and count the companies
    const [items, total] = await repository.findAndCount({
      where,
      order: { [orderBy]: order },
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(total / limit);

    this.logger.log(`Found ${total} ${type}s in the database`);

    // Return the paginated companies
    return { items, total, totalPages };
  }

  /**
   * Creates a new company.
   * @param name - The name of the company.
   * @param website - The website of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The created company.
   * @throws {ConflictException} If the company name or website already exists.
   */
  public async create(
    company: { name: string; website: string },
    type: 'publisher' | 'developer',
  ): Promise<PublisherType | DeveloperType> {
    this.logger.log(`Creating a new ${type.charAt(0).toUpperCase() + type.slice(1)} in the database`);

    // Check if the company name or website already exists
    await this.checkValueIsUnique('name', company.name, type);
    await this.checkValueIsUnique('website', company.website, type);

    // Check if the url is valid
    await this.checkValidWebsite(company.website);

    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Create and save the new company
    const newCompany = repository.create({ name: company.name, website: company.website });

    // Save the new company
    if (!newCompany) throw new InternalServerErrorException('Failed to create company');

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
   * @throws {NotFoundException} If the company is not found.
   * @throws {ConflictException} If the update value already exists.
   * @throws {BadRequestException} If the update value is invalid.
   */
  public async update(
    id: number,
    updateType: 'name' | 'website',
    value: string,
    type: 'publisher' | 'developer',
  ): Promise<PublisherType | DeveloperType> {
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
    if (!updatedCompany) throw new InternalServerErrorException(`Failed to update ${type} in the database`);

    // Return the updated company
    return updatedCompany;
  }

  /**
   * Deletes a company.
   * @param id - The ID of the company.
   * @param type - The type of the company (publisher or developer).
   * @throws {NotFoundException} If the company is not found.
   */
  public async remove(id: number, type: 'publisher' | 'developer'): Promise<void> {
    this.logger.log(`Removing ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);

    // Check if company exists
    await this.checkCompanyExists('id', id, type);

    // Get the repository based on the type
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;

    // Attempt to delete the company
    const result = await repository.delete(id);

    // Throw an exception if the company was not deleted
    if (!result.affected) throw new InternalServerErrorException(`Failed to delete ${type} from the database`);
  }

  /**
   * Removes all companies from the database.
   * @param type - The type of the companies (publishers or developers).
   * @throws {InternalServerErrorException} If the removal fails.
   */
  public async removeAll(type: 'publishers' | 'developers'): Promise<void> {
    this.logger.log(`Removing all ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);

    // Get the repository based on the type
    const repository = type === 'publishers' ? this.publisherRepository : this.developerRepository;

    // Attempt to delete all records
    const result = await repository.delete({});

    // Throw an exception if the removal fails
    if (result.affected === undefined)
      throw new InternalServerErrorException(`Failed to remove ${type} from the database`);
  }
}
