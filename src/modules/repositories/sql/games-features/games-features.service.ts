// NestJS
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

// Entities
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';

// Types
import { GameFeature as GameFeatureType } from '@repositories/sql/games-features/game-feature.entity';

@Injectable()
export class GamesFeaturesService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(GameFeature, 'sql')
    private readonly gameFeatureRepository: Repository<GameFeature>,
  ) {}

  /**
   * Gets all features.
   * @returns A promise that resolves to an array of features.
   */
  public async getAll(orderBy: 'id' | 'name', order: 'ASC' | 'DESC'): Promise<GameFeatureType[]> {
    this.logger.log('Getting all features');

    // Get all features
    const features = await this.gameFeatureRepository.find({ order: { [orderBy]: order } });

    // Return the features
    return features;
  }

  /**
   * Gets a feature by its ID.
   * @param id - The ID of the feature to retrieve.
   * @returns A promise that resolves to the retrieved feature.
   * @throws `NotFoundException` If the feature is not found.
   */
  public async getById(id: number): Promise<GameFeatureType> {
    this.logger.log(`Getting feature with ID ${id}`);

    // Get the feature by its ID
    const feature = await this.gameFeatureRepository.findOne({ where: { id } });

    // Throw a NotFoundException if the feature is not found
    if (!feature) throw new NotFoundException(`Feature with ID ${id} not found`);

    // return the feature
    return feature;
  }

  public async getByIds(ids: number[]): Promise<GameFeatureType[]> {
    this.logger.log(`Getting features with IDs ${ids}`);

    // Get the features by their IDs
    const features = await this.gameFeatureRepository.find({ where: { id: In(ids) } });

    // if any feature is not found throw an error
    if (features.length < ids.length) {
      const missingIds = ids.filter((id) => !features.some((feature) => feature.id === id));
      throw new NotFoundException(`Features with IDs ${missingIds} not found`);
    }

    // return the features
    return features;
  }

  /**
   * Gets a feature by its name.
   * @param name - The name of the feature to retrieve.
   * @returns A promise that resolves to the retrieved feature.
   * @throws `NotFoundException` If the feature is not found.
   */
  public async getByName(name: string): Promise<GameFeatureType> {
    this.logger.log(`Getting feature with name ${name}`);

    // Get the feature by its name
    const feature = await this.gameFeatureRepository.findOne({ where: { name } });

    // Throw a NotFoundException if the feature is not found
    if (!feature) throw new NotFoundException(`Feature with name ${name} not found`);

    // return the feature
    return feature;
  }

  /**
   * Gets paginated features.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated features.
   */
  public async getFeaturesPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { name?: string },
  ): Promise<{ items: GameFeatureType[]; total: number; totalPages: number }> {
    this.logger.log(`Getting features paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    // Create a where clause based on the search query
    const where: FindOptionsWhere<GameFeatureType> = {};
    if (searchQuery?.name) {
      where.name = ILike(`%${searchQuery.name}%`);
    }

    // Get the paginated features
    const [items, total] = await this.gameFeatureRepository.findAndCount({
      where,
      order: { [orderBy]: order },
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(total / limit);

    // Return the paginated features and total number of pages
    return { items, total, totalPages };
  }

  /**
   * Creates a new feature.
   * @param feature - An object containing the name and icon of the feature.
   * @returns A promise that resolves to the created feature.
   * @throws `InternalServerErrorException` If the feature could not be created.
   */
  public async create(feature: { name: string; icon: Buffer }): Promise<GameFeatureType> {
    this.logger.log(`Creating feature with name ${feature.name}`);

    // Check if the feature already exists with the same name
    const existingFeature = await this.gameFeatureRepository.findOne({ where: { name: feature.name } });
    if (existingFeature) throw new ConflictException(`Feature with name ${feature.name} already exists`);

    // Create the new feature
    const newFeature = this.gameFeatureRepository.create({
      name: feature.name,
      icon: feature.icon,
    });

    // Save the new feature
    const createdFeature = await this.gameFeatureRepository.save(newFeature);

    // Throw an InternalServerErrorException if the feature could not be created
    if (!createdFeature) throw new InternalServerErrorException('Failed to create feature');

    // Return the created feature
    return createdFeature;
  }

  /**
   * Updates an existing feature.
   * @param id - The ID of the feature to update.
   * @param feature - The updated feature data.
   * @returns A promise that resolves to the updated feature.
   * @throws `NotFoundException` If the feature is not found.
   * @throws `InternalServerErrorException` If no data is provided to update.
   */
  public async update(id: number, feature: { name?: string; icon?: Buffer }): Promise<GameFeatureType> {
    this.logger.log(`Updating feature with ID ${id}`);

    // Find the existing feature by its ID
    const existingFeature = await this.gameFeatureRepository.findOne({ where: { id } });

    // Throw a NotFoundException if the feature does not exist
    if (!existingFeature) throw new NotFoundException(`Feature with ID ${id} not found`);

    // Throw an InternalServerErrorException if no data to update
    if (feature.name === undefined && feature.icon === undefined)
      throw new InternalServerErrorException('No valid data provided for updating');

    // Update the existing feature with the new values
    if (feature.name !== undefined) existingFeature.name = feature.name;
    if (feature.icon !== undefined) existingFeature.icon = feature.icon;

    // Save the updated feature entity
    const updatedFeature = await this.gameFeatureRepository.save(existingFeature);

    // Return the updated feature
    return updatedFeature;
  }

  /**
   * Removes a feature by its ID.
   * @param {number} id - The ID of the feature to remove.
   * @returns A promise that resolves to the removed feature.
   * @throws `NotFoundException` If the feature is not found.
   * @throws `InternalServerErrorException` If the feature could not be removed.
   */
  public async remove(id: number): Promise<GameFeatureType> {
    this.logger.log(`Removing feature with ID ${id}`);

    // Find the feature by its ID
    const feature = await this.gameFeatureRepository.findOne({ where: { id } });

    // Throw a NotFoundException if the feature does not exist
    if (!feature) throw new NotFoundException(`Feature with ID ${id} not found`);

    // Remove the feature
    const result = await this.gameFeatureRepository.remove(feature);

    // Throw an InternalServerErrorException if the feature could not be removed
    if (!result) throw new InternalServerErrorException('Failed to remove feature');

    // Return the removed feature
    return result;
  }

  /**
   * Removes all features.
   * @throws `InternalServerErrorException` If the features could not be removed.
   */
  public async removeAll(): Promise<void> {
    this.logger.log('Removing all features');

    // Remove all features
    const result = await this.gameFeatureRepository.delete({});

    // Throw an InternalServerErrorException if the features could not be removed
    if (result === undefined) throw new InternalServerErrorException('Failed to remove features');
  }
}
