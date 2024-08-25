import { Injectable, Logger } from '@nestjs/common';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import type { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';

@Injectable()
export class LanguageService {
  constructor(
    private readonly logger: Logger,
    private readonly language: GamesLanguagesService,
  ) {}

  /**
   * Create a new language
   * @param data - The name and website of the language
   */
  public async createLanguage(data: { name: string }): Promise<{ message: string }> {
    const { name } = data;
    this.logger.log(`Creating tag with name ${name}`);
    await this.language.create(name);
    return { message: 'Language created successfully' };
  }

  /**
   * Get Language by ID
   * @param id
   * @returns The language
   */
  public async getLanguage(id: number) {
    this.logger.log(`Retrieving language with ID ${id}`);
    return this.language.getById(id);
  }

  /**
   * Get languages by IDs
   * @param ids
   * @returns An array of languages
   */
  public async getLanguages(ids: number[]) {
    this.logger.log(`Retrieving languages with IDs ${ids}`);
    return this.language.getByIds(ids);
  }

  /**
   * Get all languages
   * @returns An array of all languages
   */
  public async getAllLanguages() {
    this.logger.log(`Retrieving all languages`);
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
   * @returns The total number of languages
   */
  public async getLanguagesPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery: { name?: string; website?: string },
  ): Promise<{ items: GameLanguage[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving languages, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`,
    );
    return await this.language.getLanguagesPaginated(page, limit, orderBy, order, searchQuery);
  }

  /**
   * Update language
   * @param id - The ID of the language
   * @param data - The new data for the language
   * @returns The updated language
   */
  public async updateLanguage(id: number, data: { name?: string; icon?: string }): Promise<{ message: string }> {
    const { name } = data;
    this.logger.log(`Updating language with ID ${id}`);
    await this.language.update(id, name);
    return { message: 'Language updated successfully' };
  }

  /**
   * Delete language
   * @param id - The ID of the language
   * @returns A message indicating the success of the delete
   */
  public async deleteLanguage(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting language with ID ${id}`);
    await this.language.remove(id);

    return { message: 'Language deleted successfully' };
  }
}
