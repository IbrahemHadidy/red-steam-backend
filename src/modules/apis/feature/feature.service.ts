import { Injectable, Logger } from '@nestjs/common';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import type { GameFeature } from '@repositories/sql/games-features/game-feature.entity';

@Injectable()
export class FeatureService {
  constructor(
    private readonly logger: Logger,
    private readonly feature: GamesFeaturesService,
  ) {}

  /**
   * Create a new feature
   * @param data - The name and website of the feature
   */
  public async createFeature(data: { name: string; icon: string }): Promise<{ message: string }> {
    const { name, icon } = data;
    const iconAsBuffer = Buffer.from(icon, 'base64');
    this.logger.log(`Creating feature with name ${name}`);
    await this.feature.create({ name, icon: iconAsBuffer });
    return { message: 'Feature created successfully' };
  }

  /**
   * Get Feature by ID
   * @param id
   * @returns The feature
   */
  public async getFeature(id: number) {
    this.logger.log(`Retrieving feature with ID ${id}`);
    return this.feature.getById(id);
  }

  /**
   * Get features by IDs
   * @param ids
   * @returns An array of features
   */
  public async getFeatures(ids: number[]) {
    this.logger.log(`Retrieving features with IDs ${ids}`);
    return this.feature.getByIds(ids);
  }

  /**
   * Get all features
   * @returns An array of all features
   */
  public async getAllFeatures() {
    this.logger.log(`Retrieving all features`);
    return this.feature.getAll('id', 'ASC');
  }

  /**
   * Get paginated features
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated features
   * @returns The total number of features
   */
  public async getFeaturesPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery: { name?: string },
  ): Promise<{ items: GameFeature[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving features, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`,
    );
    return await this.feature.getFeaturesPaginated(page, limit, orderBy, order, searchQuery);
  }

  /**
   * Update feature
   * @param id - The ID of the feature
   * @param data - The new data for the feature
   * @returns The updated feature
   */
  public async updateFeature(id: number, data: { name?: string; icon?: string }): Promise<{ message: string }> {
    const { name, icon } = data;
    this.logger.log(`Updating feature with ID ${id}`);
    const iconAsBuffer = Buffer.from(icon, 'base64');
    await this.feature.update(id, { name, icon: iconAsBuffer });
    return { message: 'Feature updated successfully' };
  }

  /**
   * Delete feature
   * @param id - The ID of the feature
   * @returns A message indicating the success of the delete
   */
  public async deleteFeature(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting feature with ID ${id}`);
    await this.feature.remove(id);

    return { message: 'Feature deleted successfully' };
  }
}
