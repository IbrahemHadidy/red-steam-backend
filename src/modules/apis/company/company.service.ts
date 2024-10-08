// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Services
import { CompaniesService } from '@repositories/sql/companies/companies.service';

// Types
import type { Developer, Publisher } from '@repositories/sql/companies/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    private readonly logger: Logger,
    private readonly company: CompaniesService,
  ) {}

  /**
   * Create a new publisher
   * @param data - The name and website of the publisher
   * @return A message indicating the success of the creation
   */
  public async createPublisher(data: { name: string; website: string }): Promise<{ message: string }> {
    const { name, website } = data;
    this.logger.log(`Creating publisher with name ${name} and website ${website}`);

    // Create the publisher
    await this.company.create({ name, website }, 'publisher');

    // Return a success message
    return { message: 'Publisher created successfully' };
  }

  /**
   * Create a new developer
   * @param data - The name and website of the developer
   * @returns A message indicating the success of the creation
   */
  public async createDeveloper(data: { name: string; website: string }): Promise<{ message: string }> {
    const { name, website } = data;
    this.logger.log(`Creating developer with name ${name} and website ${website}`);

    // Create the developer
    await this.company.create({ name, website }, 'developer');

    // Return a success message
    return { message: 'Developer created successfully' };
  }

  /**
   * Get publisher by ID
   * @param id
   * @returns The publisher
   */
  public async getPublisher(id: number): Promise<Publisher> {
    this.logger.log(`Retrieving publisher with ID ${id}`);

    // Get publisher and return it if it exists
    return await this.company.getById(id, 'publisher');
  }

  /**
   * Get developer by ID
   * @param id
   * @returns The developer
   */
  public async getDeveloper(id: number): Promise<Developer> {
    this.logger.log(`Retrieving developer with ID ${id}`);

    // Get developer and return it if it exists
    return await this.company.getById(id, 'developer');
  }

  /**
   * Get publishers by IDs
   * @param ids
   * @return `Promise<Publisher[]>` An array of publishers
   */
  public async getPublishers(ids: number[]): Promise<Publisher[]> {
    this.logger.log(`Retrieving publishers with IDs ${ids}`);

    // Get publishers and return them if they exist
    return await this.company.getByIds(ids, 'publisher');
  }

  /**
   * Get developers by IDs
   * @param ids
   * @returns An array of all developers
   */
  public async getDevelopers(ids: number[]): Promise<Developer[]> {
    this.logger.log(`Retrieving developers with IDs ${ids}`);

    // Get developers and return them if they exist
    return await this.company.getByIds(ids, 'developer');
  }

  /**
   * Get all publishers
   * @returns An array of all publishers
   */
  public async getAllPublishers(): Promise<Publisher[]> {
    this.logger.log(`Retrieving all publishers`);

    // Get publishers and return them
    return await this.company.getAll('id', 'asc', 'publishers');
  }

  /**
   * Get all developers
   * @returns  An array of all developers
   */
  public async getAllDevelopers(): Promise<Developer[]> {
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
   */
  public async getPublishersPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name' | 'website',
    order: 'ASC' | 'DESC',
    searchQuery: { name?: string; website?: string },
  ): Promise<{ items: Publisher[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving publishers, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(
        searchQuery,
      )}`,
    );

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
   */
  public async getDevelopersPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name' | 'website',
    order: 'ASC' | 'DESC',
    searchQuery: { name?: string; website?: string },
  ): Promise<{ items: Developer[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving developers, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(
        searchQuery,
      )}}`,
    );

    // Get developers paginated and return them
    return await this.company.getCompaniesPaginated(page, limit, orderBy, order, 'developer', searchQuery);
  }

  /**
   * Update publisher
   * @param id - The ID of the publisher
   * @param data - The new data for the publisher
   * @returns A message indicating the success of the update
   */
  public async updatePublisher(id: number, data: { name?: string; website?: string }): Promise<{ message: string }> {
    this.logger.log(`Updating publisher with ID ${id}`);

    // Update publisher
    Promise.all([
      data.name && this.company.update(id, 'name', data.name, 'publisher'),
      data.website && this.company.update(id, 'website', data.website, 'publisher'),
    ]);

    // Send a success response
    return { message: 'Publisher updated successfully' };
  }

  /**
   * Update developer
   * @param id - The ID of the developer
   * @param data - The new data for the developer
   * @returns A message indicating the success of the update
   */
  public async updateDeveloper(id: number, data: { name?: string; website?: string }): Promise<{ message: string }> {
    this.logger.log(`Updating developer with ID ${id}`);

    // Update developer
    Promise.all([
      data.name && this.company.update(id, 'name', data.name, 'developer'),
      data.website && this.company.update(id, 'website', data.website, 'developer'),
    ]);

    // Send a success response
    return { message: 'Developer updated successfully' };
  }

  /**
   * Delete publisher
   * @param id - The ID of the publisher
   * @returns A message indicating the success of the delete
   */
  public async deletePublisher(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting publisher with ID ${id}`);

    // Delete publisher
    await this.company.remove(id, 'publisher');

    // Send a success response
    return { message: 'Publisher deleted successfully' };
  }

  /**
   * Delete developer
   * @param id - The ID of the developer
   * @returns A message indicating the success of the delete
   */
  public async deleteDeveloper(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting developer with ID ${id}`);

    // Delete developer
    await this.company.remove(id, 'developer');

    // Send a success response
    return { message: 'Developer deleted successfully' };
  }
}
