import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { GameLanguage } from './game-language.entity';
import { Game } from '../games/game.entity';

@Injectable()
export class GamesLanguagesService {
  private readonly relations: FindOptionsRelations<GameLanguage>;

  constructor(
    private readonly logger: Logger,
    @InjectRepository(GameLanguage, 'sql')
    private readonly gamesLanguageRepository: Repository<GameLanguage>,
    @InjectRepository(Game, 'sql')
    private readonly gamesRepository: Repository<Game>,
  ) {
    this.relations = { games: true };
  }
  /**
   * Get all languages
   * @param sortBy Sort by
   * @param sortOrder Sort order
   * @returns {Promise<GameLanguage[]>} Promise that resolves to an array of languages
   */
  public async getAll(sortBy: 'id' | 'name', sortOrder: 'ASC' | 'DESC'): Promise<GameLanguage[]> {
    // Log the initiation of the language retrieval process
    this.logger.log(`Retrieving all languages with sort order ${sortOrder} and sort by ${sortBy}`);

    const languages = await this.gamesLanguageRepository.find({
      relations: this.relations,
      order: { [sortBy]: sortOrder },
    });

    return languages;
  }

  /**
   * Get language by ID
   * @param id Language ID
   * @returns {Promise<GameLanguage>} Promise that resolves to a language
   * @throws {NotFoundException} If language not found
   */
  public async getById(id: number): Promise<GameLanguage> {
    // Log the initiation of the language retrieval process
    this.logger.log(`Retrieving language with ID ${id}`);

    const language = await this.gamesLanguageRepository.findOne({ where: { id }, relations: this.relations });
    if (!language) throw new NotFoundException(`Language with ID ${id} not found`);
    return language;
  }

  /**
   * Get languages by IDs
   * @param ids Language IDs
   * @returns {Promise<GameLanguage[]>} Promise that resolves to an array of languages
   * @throws {NotFoundException} If language not found
   */
  public async getByIds(ids: number[]): Promise<GameLanguage[]> {
    // Log the initiation of the language retrieval process
    this.logger.log(`Retrieving languages with IDs ${ids}`);

    const languages = await this.gamesLanguageRepository.find({ where: { id: In(ids) }, relations: this.relations });
    if (!languages) throw new NotFoundException(`Languages with IDs ${ids} not found`);
    return languages;
  }

  /**
   * Get language by name
   * @param name Language name
   * @returns {Promise<GameLanguage>} Promise that resolves to a language
   * @throws {NotFoundException} If language not found
   */
  public async getByName(name: string): Promise<GameLanguage> {
    // Log the initiation of the language retrieval process
    this.logger.log(`Retrieving language with name ${name}`);

    const language = await this.gamesLanguageRepository.findOne({ where: { name }, relations: this.relations });
    if (!language) throw new NotFoundException(`Language with name ${name} not found`);
    return language;
  }

  /**
   * Get languages by names
   * @param names Language names
   * @returns {Promise<GameLanguage[]>} Promise that resolves to an array of languages
   * @throws {NotFoundException} If language not found
   */
  public async getByNameList(names: string[]): Promise<GameLanguage[]> {
    // Log the initiation of the language retrieval process
    this.logger.log(`Retrieving languages with names ${names}`);

    const languages = await this.gamesLanguageRepository.find({
      where: { name: In(names) },
      relations: this.relations,
    });
    if (!languages) throw new NotFoundException(`Languages with names ${names} not found`);
    return languages;
  }

  /**
   * Gets paginated languages.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @param {string} orderBy - The field to order by.
   * @param {('ASC' | 'DESC')} order - The order direction.
   * @param {({ name?: string })} searchQuery - The search query.
   * @returns {Promise<{ items: GameLanguage[], total: number, totalPages: number }>} A promise that resolves to the paginated languages.
   */
  public async getLanguagesPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { name?: string },
  ): Promise<{ items: GameLanguage[]; total: number; totalPages: number }> {
    this.logger.log(`Getting languages paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    const where: FindOptionsWhere<GameLanguage> = {};

    if (searchQuery?.name) {
      where.name = Like(`%${searchQuery.name}%`);
    }

    const [items, total] = await this.gamesLanguageRepository.findAndCount({
      where,
      relations: this.relations,
      order: { [orderBy]: order },
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return { items, total, totalPages };
  }

  /**
   * Create language
   * @param name Language name
   * @returns {Promise<GameLanguage>} Promise that resolves when the creation is successful
   */
  public async create(name: string): Promise<GameLanguage> {
    // Log the initiation of the language creation process
    this.logger.log(`Creating language with name ${name}`);

    // Check if language already exists
    const existingLanguage = await this.gamesLanguageRepository.findOne({ where: { name: name } });
    if (existingLanguage) throw new ConflictException('Language already exists');

    // Create new game language entity
    const createdLanguage = this.gamesLanguageRepository.create({
      name,
    });

    // Save the language entity
    const result = await this.gamesLanguageRepository.save(createdLanguage);
    if (!result) throw new InternalServerErrorException('Failed to create language');
    return result;
  }

  /**
   * Update language
   * @param id Language ID
   * @param name Language name
   * @returns {Promise<GameLanguage>} Promise that resolves when the update is successful
   * @throws {NotFoundException} If language not found
   */
  public async update(id: number, name: string): Promise<GameLanguage> {
    // Log the initiation of the language update process
    this.logger.log(`Updating language with ID ${id}`);

    // Check if language exists
    const existingLangauge = await this.gamesLanguageRepository.findOne({ where: { id } });
    if (!existingLangauge) throw new NotFoundException(`Language with ID ${id} not found`);

    // Update fields
    existingLangauge.name = name;

    // Save changes
    const result = this.gamesLanguageRepository.save(existingLangauge);
    if (!result) throw new InternalServerErrorException(`Failed to update language with ID ${id}`);
    return result;
  }

  /**
   * Delete language
   * @param id Language ID
   * @returns {Promise<void>} Promise that resolves when the deletion is successful
   * @throws {NotFoundException} If language not found
   * @throws {InternalServerErrorException} If failed to delete
   */
  public async remove(id: number): Promise<GameLanguage> {
    // Log the initiation of the language deletion process
    this.logger.log(`Deleting language with ID ${id}`);

    // Check if language exists
    const existingLanguage = await this.gamesLanguageRepository.findOne({ where: { id } });
    if (!existingLanguage) throw new NotFoundException(`Language with ID ${id} not found`);

    // Retrieve games with the specific language support
    const games = await this.gamesRepository.find({
      where: {
        languageSupport: { name: existingLanguage.name },
      },
      relations: { languages: true },
    });

    // Update the languageSupport field for each game
    for (const game of games) {
      game.languages = game.languages.filter((language) => language.name !== existingLanguage.name);
      game.languageSupport = game.languageSupport.filter((language) => language.name !== existingLanguage.name);
    }
    await this.gamesRepository.save(games);

    // Remove the language from the gamesLanguageRepository
    const result = await this.gamesLanguageRepository.remove(existingLanguage);
    if (!result) throw new InternalServerErrorException(`Failed to delete language with ID ${id}`);

    return result;
  }

  /**
   * Delete all languages
   * @returns {Promise<void>} Promise that resolves when the deletion is successful
   * @throws {InternalServerErrorException} If failed to delete
   */
  public async removeAll(): Promise<void> {
    // Log the initiation of the language deletion process
    this.logger.log('Deleting all languages');

    // Step 1: Remove all languages from all games
    const games = await this.gamesRepository.find({ relations: { languages: true } });
    for (const game of games) {
      game.languages = [];
      game.languageSupport = [];
    }
    await this.gamesRepository.save(games);

    // Step 2: Delete all entries in the gamesLanguage table
    await this.gamesLanguageRepository.delete({});

    // Log the successful completion
    this.logger.log('All languages deleted successfully');
  }
}
