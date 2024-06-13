import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';

@Injectable()
export class GamesFeaturesService {
  private readonly relations: string[];

  constructor(
    private readonly logger: Logger,
    @InjectRepository(GameFeature, 'sql')
    private readonly gameFeatureRepository: Repository<GameFeature>,
  ) {
    this.relations = ['games'];
  }

  /**
   * Checks if a feature with the given property exists.
   * @param value - The value to check.
   * @param type - The type of the feature (name or description).
   * @throws {ConflictException} If the feature already exists.
   */
  private async checkFeatureExists(value: number | string, type: 'name' | 'description'): Promise<void> {
    const feature = await this.gameFeatureRepository.findOne({ where: { [type]: value } });
    if (feature) throw new ConflictException(`Feature with ${type} ${value} already exists`);
  }

  /**
   * Gets all features.
   * @returns {Promise<GameFeature[]>} A promise that resolves to an array of features.
   */
  public async getAll(orderBy: 'id' | 'name' | 'description', order: 'ASC' | 'DESC'): Promise<GameFeature[]> {
    // Log the initiation of getting all features
    this.logger.log('Getting all features');

    const features = await this.gameFeatureRepository.find({ relations: this.relations, order: { [orderBy]: order } });
    return features;
  }

  /**
   * Gets a feature by its ID.
   * @param {number} id - The ID of the feature to retrieve.
   * @returns {Promise<GameFeature>} A promise that resolves to the retrieved feature.
   * @throws {NotFoundException} If the feature is not found.
   */
  public async getById(id: number): Promise<GameFeature> {
    // Log the initiation of getting a feature by its ID
    this.logger.log(`Getting feature with ID ${id}`);

    const feature = await this.gameFeatureRepository.findOne({ where: { id }, relations: this.relations });
    if (!feature) throw new NotFoundException(`Feature with ID ${id} not found`);
    return feature;
  }

  public async getByIds(ids: number[]): Promise<GameFeature[]> {
    // Log the initiation of getting features by their IDs
    this.logger.log(`Getting features with IDs ${ids}`);

    const features = await this.gameFeatureRepository.find({ where: { id: In(ids) }, relations: this.relations });
    // if any feature is not found throw an error
    if (features.length < ids.length) {
      const missingIds = ids.filter((id) => !features.some((feature) => feature.id === id));
      throw new NotFoundException(`Features with IDs ${missingIds} not found`);
    }
    return features;
  }

  /**
   * Gets a feature by its name.
   * @param {string} name - The name of the feature to retrieve.
   * @returns {Promise<GameFeature>} A promise that resolves to the retrieved feature.
   * @throws {NotFoundException} If the feature is not found.
   */
  public async getByName(name: string): Promise<GameFeature> {
    // Log the initiation of getting a feature by its name
    this.logger.log(`Getting feature with name ${name}`);

    const feature = await this.gameFeatureRepository.findOne({ where: { name } });
    if (!feature) throw new NotFoundException(`Feature with name ${name} not found`);
    return feature;
  }

  /**
   * Gets a feature by its description.
   * @param {string} description - The description of the feature to retrieve.
   * @returns {Promise<GameFeature>} A promise that resolves to the retrieved feature.
   * @throws {NotFoundException} If the feature is not found.
   */
  public async getByDescription(description: string): Promise<GameFeature> {
    // Log the initiation of getting a feature by its description
    this.logger.log(`Getting feature with description ${description}`);

    const feature = await this.gameFeatureRepository.findOne({ where: { description } });
    if (!feature) throw new NotFoundException(`Feature with description ${description} not found`);
    return feature;
  }

  /**
   * Creates a new feature.
   * @param {GameFeature} feature - The feature to create.
   * @returns {Promise<GameFeature>} A promise that resolves to the created feature.
   * @throws {InternalServerErrorException} If the feature could not be created.
   */
  public async create(feature: { name: string; description: string }): Promise<GameFeature> {
    // Log the initiation of creating a new feature
    this.logger.log(`Creating feature with name ${feature.name} and description ${feature.description}`);

    // Check if the feature already exists with the same name
    await this.checkFeatureExists(feature.name, 'name');

    // Check if the feature already exists with the same description
    await this.checkFeatureExists(feature.description, 'description');

    // Save the new feature
    const createdFeature = await this.gameFeatureRepository.save(feature);
    if (!createdFeature) throw new InternalServerErrorException('Failed to create feature');
    return createdFeature;
  }

  /**
   * Updates an existing feature.
   * @param {number} id - The ID of the feature to update.
   * @param {object} feature - The updated feature data.
   * @returns {Promise<GameFeature>} A promise that resolves to the updated feature.
   * @throws {NotFoundException} If the feature is not found.
   * @throws {InternalServerErrorException} If no data is provided to update.
   */
  public async update(id: number, feature: { name?: string; description?: string }): Promise<GameFeature> {
    // Log the initiation of updating an existing feature
    this.logger.log(`Updating feature with ID ${id}`);

    // Find the existing feature by its ID
    const existingFeature = await this.gameFeatureRepository.findOne({ where: { id } });

    // Throw a NotFoundException if the feature does not exist
    if (!existingFeature) throw new NotFoundException(`Feature with ID ${id} not found`);

    // Throw an InternalServerErrorException if no data to update
    if (feature.name === undefined && feature.name === undefined)
      throw new InternalServerErrorException('No valid data provided for updating');

    // Update the existing feature with the new values
    if (feature.name !== undefined) existingFeature.name = feature.name;
    if (feature.description !== undefined) existingFeature.description = feature.description;

    // Save the updated feature entity
    const updatedFeature = await this.gameFeatureRepository.save(existingFeature);
    return updatedFeature;
  }

  /**
   * Removes a feature by its ID.
   * @param {number} id - The ID of the feature to remove.
   * @throws {NotFoundException} If the feature is not found.
   * @throws {InternalServerErrorException} If the feature could not be removed.
   * @returns {Promise<GameFeature>} A promise that resolves to the removed feature.
   */
  public async remove(id: number): Promise<GameFeature> {
    // Log the initiation of removing a feature by its ID
    this.logger.log(`Removing feature with ID ${id}`);

    const feature = await this.gameFeatureRepository.findOne({ where: { id } });
    if (!feature) throw new NotFoundException(`Feature with ID ${id} not found`);
    const result = await this.gameFeatureRepository.remove(feature);
    if (!result) throw new InternalServerErrorException('Failed to remove feature');
    return result;
  }

  /**
   * Removes all features.
   * @throws {InternalServerErrorException} If the features could not be removed.
   */
  public async removeAll(): Promise<void> {
    // Log the initiation of removing all features
    this.logger.log('Removing all features');
    
    const result = await this.gameFeatureRepository.delete({});
    if (result === undefined) throw new InternalServerErrorException('Failed to remove features');
  }
}
