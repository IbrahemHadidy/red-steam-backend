import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';

@Injectable()
export class CompaniesService {
  private readonly relations: string[];

  constructor(
    private readonly logger: Logger,
    
    @InjectRepository(Publisher, 'sql')
    private readonly publisherRepository: Repository<Publisher>,

    @InjectRepository(Developer, 'sql')
    private readonly developerRepository: Repository<Developer>,
  ) {
    this.relations = ['games'];
  }

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
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const company = await repository.findOne({ where: { [checkBy]: checkValue } });
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
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const company = await repository.findOne({ where: { [updateType]: value } });
    if (company)
      throw new ConflictException(`${type.charAt(0).toUpperCase() + type.slice(1)} ${updateType} already exists`);
  }

  /**
   * Checks if the website is valid.
   * @param website - The website to check.
   * @throws {BadRequestException} If the website is not valid.
   */
  private async checkValidWebsite(website: string): Promise<void> {
    const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (!website.match(urlRegex)) throw new BadRequestException('Invalid website URL');
  }

  /**
   * Retrieves all companies.
   * @param type - The type of the companies (publishers or developers).
   * @returns A list of companies.
   */
  public async getAll(sortBy: 'id' | 'name' | 'website', sortOrder: 'asc' | 'desc', type: 'publishers' | 'developers'): Promise<Publisher[] | Developer[]> {
    // Log the retrieval of all publishers/developers from the database
    this.logger.log(`Retrieving all ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);
    const repository = type === 'publishers' ? this.publisherRepository : this.developerRepository;
    const companies = repository.find({ relations: this.relations, order: { [sortBy]: sortOrder } });
    return companies;
  }

  /**
   * Retrieves a company by ID.
   * @param id - The ID of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The retrieved company.
   * @throws {NotFoundException} If the company is not found.
   */
  public async getById(id: number, type: 'publisher' | 'developer'): Promise<Publisher | Developer> {
    // Log the retrieval of a publisher/developer from the database
    this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with ID ${id} from the database`);
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const company = await repository.findOne({ where: { id }, relations: this.relations });
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
    return company;
  }

  /**
   * Retrieves multiple companies by IDs.
   * @param ids - The IDs of the companies.
   * @param type - The type of the companies (publisher or developer).
   * @returns The retrieved companies.
   * @throws {NotFoundException} If any of the companies are not found.
   */
  public async getByIds(ids: number[], type: 'publisher' | 'developer'): Promise<Publisher[] | Developer[]> {
    // Log the retrieval of multiple publishers/developers from the database
    this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with IDs ${ids} from the database`);

    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const companies = await repository.find({ where: { id: In(ids) }, relations: this.relations });
    if (companies.length !== ids.length) {
      const missingIds = ids.filter((id) => !companies.some((company) => company.id === id));
      throw new NotFoundException(
        `${type.charAt(0).toUpperCase() + type.slice(1)} not found: ${missingIds.join(', ')}`,
      );
    }
    return companies;
  }

  /**
   * Retrieves a company by name.
   * @param name - The name of the company.
   * @param type - The type of the company (publisher or developer).
   * @returns The retrieved company.
   * @throws {NotFoundException} If the company is not found.
   */
  public async getByName(name: string, type: 'publisher' | 'developer'): Promise<Publisher | Developer> {
    // Log the retrieval of a publisher/developer from the database
    this.logger.log(`Retrieving ${type.charAt(0).toUpperCase() + type.slice(1)} with name ${name} from the database`);

    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const company = await repository.findOne({ where: { name }, relations: this.relations });
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
    return company;
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
  ): Promise<Publisher | Developer> {
    // Log the creation of a publisher/developer in the database
    this.logger.log(`Creating a new ${type.charAt(0).toUpperCase() + type.slice(1)} in the database`);

    // Check if the company name or website already exists
    await this.checkValueIsUnique('name', company.name, type);
    await this.checkValueIsUnique('website', company.website, type);
    await this.checkValidWebsite(company.website);

    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const newCompany = repository.create({ name: company.name, website: company.website });
    if (!newCompany) throw new InternalServerErrorException('Failed to create company');

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
  ): Promise<Publisher | Developer> {
    // Log the update of a publisher/developer in the database
    this.logger.log(`Updating ${type.charAt(0).toUpperCase() + type.slice(1)} in the database`);

    await this.checkCompanyExists('id', id, type);
    await this.checkValueIsUnique(updateType, value, type);

    if (updateType === 'website') {
      await this.checkValidWebsite(value);
    }

    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const company = await this.getById(id, type);
    company[updateType] = value;

    const updatedCompany = await repository.save(company);
    if (!updatedCompany) {
      throw new InternalServerErrorException(`Failed to update ${type} in the database`);
    }
    return updatedCompany;
  }

  /**
   * Deletes a company.
   * @param id - The ID of the company.
   * @param type - The type of the company (publisher or developer).
   * @throws {NotFoundException} If the company is not found.
   */
  public async remove(id: number, type: 'publisher' | 'developer'): Promise<void> {
    // Log the removal of a publisher/developer from the database
    this.logger.log(`Removing ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);

    // Check if company exists
    await this.checkCompanyExists('id', id, type);

    // Delete company
    const repository = type === 'publisher' ? this.publisherRepository : this.developerRepository;
    const result = await repository.delete(id);
    if (!result.affected) {
      throw new InternalServerErrorException(`Failed to delete ${type} from the database`);
    }
  }

  /**
   * Removes all companies from the database.
   * @param type - The type of the companies (publishers or developers).
   * @throws {InternalServerErrorException} If the removal fails.
   */
  public async removeAll(type: 'publishers' | 'developers'): Promise<void> {
    // Log the removal of all publishers/developers from the database
    this.logger.log(`Removing all ${type.charAt(0).toUpperCase() + type.slice(1)} from the database`);
    
    const repository = type === 'publishers' ? this.publisherRepository : this.developerRepository;

    // Attempt to delete all records
    const result = await repository.delete({});
    if (result.affected === undefined)
      throw new InternalServerErrorException(`Failed to remove ${type} from the database`);
  }
}
