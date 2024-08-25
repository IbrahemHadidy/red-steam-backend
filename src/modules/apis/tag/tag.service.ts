import { Injectable, Logger } from '@nestjs/common';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import type { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

@Injectable()
export class TagService {
  constructor(
    private readonly logger: Logger,
    private readonly tag: GamesTagsService,
  ) {}

  /**
   * Create a new tag
   * @param data - The name and website of the tag
   */
  public async createTag(data: { name: string }): Promise<{ message: string }> {
    const { name } = data;
    this.logger.log(`Creating tag with name ${name}`);
    await this.tag.create(name);
    return { message: 'Tag created successfully' };
  }

  /**
   * Get Tag by ID
   * @param id
   * @returns The tag
   */
  public async getTag(id: number) {
    this.logger.log(`Retrieving tag with ID ${id}`);
    return this.tag.getById(id);
  }

  /**
   * Get tags by IDs
   * @param ids
   * @returns An array of tags
   */
  public async getTags(ids: number[]) {
    this.logger.log(`Retrieving tags with IDs ${ids}`);
    return this.tag.getByIds(ids);
  }

  /**
   * Get all tags
   * @returns An array of all tags
   */
  public async getAllTags() {
    this.logger.log(`Retrieving all tags`);
    return this.tag.getAll('id', 'ASC');
  }

  /**
   * Get paginated tags
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated tags
   * @returns The total number of tags
   */
  public async getTagsPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery: { name?: string },
  ): Promise<{ items: GameTag[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving tags, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`,
    );
    return await this.tag.getTagsPaginated(page, limit, orderBy, order, searchQuery);
  }

  /**
   * Update tag
   * @param id - The ID of the tag
   * @param data - The new data for the tag
   * @returns The updated tag
   */
  public async updateTag(id: number, data: { name?: string; icon?: string }): Promise<{ message: string }> {
    const { name } = data;
    this.logger.log(`Updating tag with ID ${id}`);
    await this.tag.update(id, name);
    return { message: 'tag updated successfully' };
  }

  /**
   * Delete tag
   * @param id - The ID of the tag
   * @returns A message indicating the success of the delete
   */
  public async deleteTag(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting tag with ID ${id}`);
    await this.tag.removeById(id);

    return { message: 'Tag deleted successfully' };
  }
}
