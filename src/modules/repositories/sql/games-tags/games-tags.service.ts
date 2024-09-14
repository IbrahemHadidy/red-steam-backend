// NestJS
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

// Entities
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

// Types
import type { GameTag as GameTagType } from '@repositories/sql/games-tags/game-tag.entity';

@Injectable()
export class GamesTagsService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(GameTag, 'sql')
    private readonly gameTagsRepository: Repository<GameTag>,
  ) {}

  /**
   * Retrieves all game tags.
   * @return A Promise that resolves to an array of game tags.
   */
  public async getAll(orderBy: 'id' | 'name', order: 'ASC' | 'DESC'): Promise<GameTagType[]> {
    this.logger.log(`Retrieving all game tags, order by: ${orderBy}, order: ${order}`);

    // Get all game tags
    const tags = await this.gameTagsRepository.find({ order: { [orderBy]: order } });

    // Return the game tags
    return tags;
  }

  /**
   * Retrieves a game tag by its name.
   * @param name - The name of the game tag to retrieve.
   * @return A Promise that resolves to the retrieved game tag or null if not found.
   */
  public async getByName(name: string): Promise<GameTagType> {
    this.logger.log(`Retrieving game tag with name ${name}`);

    // Get the game tag by name
    const tag = await this.gameTagsRepository.findOne({ where: { name } });

    // Return the game tag
    return tag;
  }

  /**
   * Retrieves multiple game tags by their names.
   * @param names - The names of the game tags to retrieve.
   * @return A Promise that resolves to an array of retrieved game tags.
   */
  public async getByNameList(names: string[]): Promise<GameTagType[]> {
    this.logger.log(`Retrieving game tags with names ${names}`);

    // Get the game tags by names
    const tags = await this.gameTagsRepository.find({ where: { name: In(names) } });

    // Return the game tags
    return tags;
  }

  /**
   * Retrieves a game tag by its ID.
   * @param id - The ID of the game tag to retrieve.
   * @return A Promise that resolves to the retrieved game tag or null if not found.
   */
  public async getById(id: number): Promise<GameTagType> {
    this.logger.log(`Retrieving game tag with ID ${id}`);

    // Get the game tag by ID
    const tag = await this.gameTagsRepository.findOne({ where: { id } });

    // If the game tag is not found, throw a NotFoundException
    if (!tag) throw new NotFoundException(`Game tag with ID ${id} not found`);

    // Return the game tag
    return tag;
  }

  /**
   * Retrieves multiple game tags by their IDs.
   * @param ids - The IDs of the game tags to retrieve.
   */
  public async getByIds(ids: number[]): Promise<GameTagType[]> {
    this.logger.log(`Retrieving game tags with IDs ${ids}`);

    // Get the game tags by IDs
    const tags = await this.gameTagsRepository.find({ where: { id: In(ids) } });

    // If any of the game tags are not found, throw a NotFoundException
    if (tags.length !== ids.length) {
      const missingIds = ids.filter((id) => !tags.some((tag) => tag.id === id));
      throw new NotFoundException(`Game tags with IDs ${missingIds} not found`);
    }

    // Return the game tags
    return tags;
  }

  /**
   * Gets paginated tags.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated tags.
   */
  public async getTagsPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { name?: string },
  ): Promise<{ items: GameTagType[]; total: number; totalPages: number }> {
    this.logger.log(`Getting tags paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    // Create the where clause
    const where: FindOptionsWhere<GameTagType> = {};
    if (searchQuery?.name) {
      where.name = ILike(`%${searchQuery.name}%`);
    }

    // Get the paginated tags
    const [items, total] = await this.gameTagsRepository.findAndCount({
      where,
      order: { [orderBy]: order },
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(total / limit);

    // Return the paginated tags and total number of pages
    return { items, total, totalPages };
  }

  /**
   * Creates a new game tag.
   * @param name - The name of the new game tag.
   * @return A Promise that resolves to the created game tag.
   * @throws `ConflictException` if the game tag already exists.
   * @throws `InternalServerErrorException` if the creation fails.
   */
  public async create(name: string): Promise<GameTagType> {
    this.logger.log(`Creating new game tag: ${name}`);

    // Check if the game tag already exists
    const existingTag = await this.getByName(name);

    // If the game tag already exists, throw a ConflictException
    if (existingTag) throw new ConflictException(`Game tag ${name} already exists`);

    // Create the new game tag
    const newTag = new GameTag();
    newTag.name = name;

    // Save the new game tag
    return this.gameTagsRepository.save(newTag);
  }

  /**
   * Updates a game tag by its ID.
   * @param id - The ID of the game tag to update.
   * @param name - The new name of the game tag.
   * @return A Promise that resolves to the updated game tag.
   * @throws `NotFoundException` Throws a NotFoundException if the game tag with the specified ID is not found.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the update fails.
   * @throws `ConflictException` Throws a ConflictException if the new name conflicts with an existing game tag.
   */
  public async update(id: number, name: string): Promise<GameTagType> {
    this.logger.log(`Updating game tag with ID ${id}`);

    // Check if the game tag exists
    const tag = await this.getById(id);

    // Check if the new name conflicts with an existing game tag
    const existingTag = await this.getByName(name);

    // If the new name conflicts with an existing game tag, throw a ConflictException
    if (existingTag && existingTag.id !== id) throw new ConflictException(`Game tag ${name} already exists`);

    // Update the game tag
    tag.name = name;

    // Save the updated game tag
    return this.gameTagsRepository.save(tag);
  }

  /**
   * Removes a game tag by its ID.
   * @param id - The ID of the game tag to remove.
   * @return A Promise that resolves to the removed game tag.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */
  public async removeById(id: number): Promise<GameTagType> {
    this.logger.log(`Removing game tag with ID ${id}`);

    // Check if the game tag exists
    const tag = await this.getById(id);

    // Remove the game tag
    const removedTag = await this.gameTagsRepository.remove(tag);

    // If the removal fails, throw an InternalServerErrorException
    if (!removedTag)
      throw new InternalServerErrorException(`Failed to remove game tag with ID ${id} from the database`);

    // Return the removed game tag
    return removedTag;
  }

  /**
   * Removes multiple game tags by their IDs.
   * @param ids - The IDs of the game tags to remove.
   * @return A Promise that resolves to an array of removed game tags.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */
  public async removeByIds(ids: number[]): Promise<GameTagType[]> {
    this.logger.log(`Removing game tags with IDs ${ids}`);

    // Check if the game tags exist
    const tags = await this.getByIds(ids);

    // Remove the game tags
    const removedTags = await this.gameTagsRepository.remove(tags);

    // If the removal fails, throw an InternalServerErrorException
    if (removedTags.length === 0)
      throw new InternalServerErrorException(`Failed to remove game tags with IDs ${ids} from the database`);

    // Return the removed game tags
    return removedTags;
  }

  /**
   * Removes a game tag by its name.
   * @param name - The name of the game tag to remove.
   * @return A Promise that resolves to the removed game tag.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */
  public async removeByName(name: string): Promise<GameTagType> {
    this.logger.log(`Removing game tag with name ${name}`);

    // Check if the game tag exists
    const tag = await this.getByName(name);

    // Remove the game tag
    const removedTag = await this.gameTagsRepository.remove(tag);

    // If the removal fails, throw an InternalServerErrorException
    if (!removedTag) throw new InternalServerErrorException(`Failed to remove game tag ${name} from the database`);

    // Return the removed game tag
    return removedTag;
  }

  /**
   * Removes multiple game tags by their names.
   * @param names - The names of the game tags to remove.
   * @return A Promise that resolves to an array of removed game tags.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */
  public async removeByNameList(names: string[]): Promise<GameTagType[]> {
    this.logger.log(`Removing game tags with names ${names}`);

    // Check if the game tags exist
    const tags = await this.getByNameList(names);

    // Remove the game tags
    const removedTags = await this.gameTagsRepository.remove(tags);

    // If the removal fails, throw an InternalServerErrorException
    if (removedTags.length === 0)
      throw new InternalServerErrorException(`Failed to remove game tags ${names} from the database`);

    // Return the removed game tags
    return removedTags;
  }

  /**
   * Deletes all game tags from the database.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the deletion fails.
   */
  public async removeAll(): Promise<void> {
    this.logger.log('Deleting all game tags');

    // Delete all game tags
    const result = await this.gameTagsRepository.delete({});

    // If the deletion fails, throw an InternalServerErrorException
    if (result.affected === undefined)
      throw new InternalServerErrorException('Failed to delete game tags from the database');
  }
}
