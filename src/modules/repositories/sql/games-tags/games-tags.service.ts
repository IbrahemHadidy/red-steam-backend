import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

@Injectable()
export class GamesTagsService {
  private readonly relations: string[];

  constructor(
    private readonly logger: Logger,
    @InjectRepository(GameTag, 'sql')
    private readonly gameTagsRepository: Repository<GameTag>,
  ) {
    this.relations = ['games', 'users'];
  }

  /**
   * Creates a new game tag.
   * @param {string} name - The name of the new game tag.
   * @return {Promise<GameTag>} A Promise that resolves to the created game tag.
   * @throws {ConflictException} Throws a ConflictException if the game tag already exists.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the creation fails.
   */
  public async create(name: string): Promise<GameTag> {
    // Log the initiation of creating a new game tag
    this.logger.log(`Creating new game tag: ${name}`);

    const existingTag = await this.getByName(name);
    if (existingTag) throw new ConflictException(`Game tag ${name} already exists`);
    const newTag = new GameTag();
    newTag.name = name;
    return this.gameTagsRepository.save(newTag);
  }

  /**
   * Retrieves all game tags.
   * @return {Promise<GameTag[]>} A Promise that resolves to an array of game tags.
   */
  public async getAll(orderBy: 'id' | 'name', order: 'ASC' | 'DESC'): Promise<GameTag[]> {
    // Log the initiation of retrieving all game tags
    this.logger.log(`Retrieving all game tags, order by: ${orderBy}, order: ${order}`);

    const tags = await this.gameTagsRepository.find({ relations: this.relations, order: { [orderBy]: order } });
    return tags;
  }

  /**
   * Retrieves a game tag by its name.
   * @param {string} name - The name of the game tag to retrieve.
   * @return {Promise<GameTag>} A Promise that resolves to the retrieved game tag or null if not found.
   */
  public async getByName(name: string): Promise<GameTag> {
    // Log the initiation of retrieving a game tag by its name
    this.logger.log(`Retrieving game tag with name ${name}`);

    const tag = await this.gameTagsRepository.findOne({ where: { name }, relations: this.relations });
    return tag;
  }

  /**
   * Retrieves multiple game tags by their names.
   * @param {string[]} names - The names of the game tags to retrieve.
   * @return {Promise<GameTag[]>} A Promise that resolves to an array of retrieved game tags.
   */
  public async getByNameList(names: string[]): Promise<GameTag[]> {
    // Log the initiation of retrieving multiple game tags by their names
    this.logger.log(`Retrieving game tags with names ${names}`);

    const tags = await this.gameTagsRepository.find({ where: { name: In(names) }, relations: this.relations });
    return tags;
  }

  /**
   * Retrieves a game tag by its ID.
   * @param {number} id - The ID of the game tag to retrieve.
   * @return {Promise<GameTag>} A Promise that resolves to the retrieved game tag or null if not found.
   */
  public async getById(id: number): Promise<GameTag> {
    // Log the initiation of retrieving a game tag by its ID
    this.logger.log(`Retrieving game tag with ID ${id}`);

    const tag = await this.gameTagsRepository.findOne({ where: { id }, relations: this.relations });
    if (!tag) throw new NotFoundException(`Game tag with ID ${id} not found`);
    return tag;
  }

  /**
   * Retrieves multiple game tags by their IDs.
   * @param {number[]} ids - The IDs of the game tags to retrieve.
   */
  public async getByIds(ids: number[]): Promise<GameTag[]> {
    // Log the initiation of retrieving multiple game tags by their IDs
    this.logger.log(`Retrieving game tags with IDs ${ids}`);

    const tags = await this.gameTagsRepository.find({ where: { id: In(ids) }, relations: this.relations });
    if (tags.length !== ids.length) {
      const missingIds = ids.filter((id) => !tags.some((tag) => tag.id === id));
      throw new NotFoundException(`Game tags with IDs ${missingIds} not found`);
    }
    return tags;
  }

  /**
   * Removes a game tag by its ID.
   * @param {number} id - The ID of the game tag to remove.
   * @return {Promise<GameTag>} A Promise that resolves to the removed game tag.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async removeById(id: number): Promise<GameTag> {
    // Log the initiation of removing a game tag by its ID
    this.logger.log(`Removing game tag with ID ${id}`);

    const tag = await this.getById(id);
    const removedTag = await this.gameTagsRepository.remove(tag);
    if (!removedTag)
      throw new InternalServerErrorException(`Failed to remove game tag with ID ${id} from the database`);
    return removedTag;
  }

  /**
   * Removes multiple game tags by their IDs.
   * @param {number[]} ids - The IDs of the game tags to remove.
   * @return {Promise<GameTag[]>} A Promise that resolves to an array of removed game tags.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async removeByIds(ids: number[]): Promise<GameTag[]> {
    // Log the initiation of removing multiple game tags by their IDs
    this.logger.log(`Removing game tags with IDs ${ids}`);

    const tags = await this.getByIds(ids);
    const removedTags = await this.gameTagsRepository.remove(tags);
    if (removedTags.length === 0)
      throw new InternalServerErrorException(`Failed to remove game tags with IDs ${ids} from the database`);
    return removedTags;
  }

  /**
   * Removes a game tag by its name.
   * @param {string} name - The name of the game tag to remove.
   * @return {Promise<GameTag>} A Promise that resolves to the removed game tag.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async removeByName(name: string): Promise<GameTag> {
    // Log the initiation of removing a game tag by its name
    this.logger.log(`Removing game tag with name ${name}`);

    const tag = await this.getByName(name);
    const removedTag = await this.gameTagsRepository.remove(tag);
    if (!removedTag) throw new InternalServerErrorException(`Failed to remove game tag ${name} from the database`);
    return removedTag;
  }

  /**
   * Removes multiple game tags by their names.
   * @param {string[]} names - The names of the game tags to remove.
   * @return {Promise<GameTag[]>} A Promise that resolves to an array of removed game tags.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async removeByNameList(names: string[]): Promise<GameTag[]> {
    // Log the initiation of removing multiple game tags by their names
    this.logger.log(`Removing game tags with names ${names}`);

    const tags = await this.getByNameList(names);
    const removedTags = await this.gameTagsRepository.remove(tags);
    if (removedTags.length === 0)
      throw new InternalServerErrorException(`Failed to remove game tags ${names} from the database`);
    return removedTags;
  }

  /**
   * Deletes all game tags from the database.
   * @return {Promise<void>} A Promise that resolves when the deletion is complete.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the deletion fails.
   */
  public async removeAll(): Promise<void> {
    // Log the initiation of deleting all game tags
    this.logger.log('Deleting all game tags');
    
    const result = await this.gameTagsRepository.delete({});
    if (result.affected === undefined)
      throw new InternalServerErrorException('Failed to delete game tags from the database');
  }
}
