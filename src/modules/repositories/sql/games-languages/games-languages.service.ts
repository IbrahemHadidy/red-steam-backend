// NestJS
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

// Entities
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';
import { Game } from '@repositories/sql/games/game.entity';

// Types
import { GameLanguage as GameLanguageType } from '@repositories/sql/games-languages/game-language.entity';

@Injectable()
export class GamesLanguagesService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(GameLanguage, 'sql')
    private readonly gamesLanguageRepository: Repository<GameLanguage>,
    @InjectRepository(Game, 'sql')
    private readonly gamesRepository: Repository<Game>,
  ) {}

  /**
   * Get all languages
   * @param sortBy Sort by
   * @param sortOrder Sort order
   * @returns Promise that resolves to an array of languages
   */
  public async getAll(sortBy: 'id' | 'name', sortOrder: 'ASC' | 'DESC'): Promise<GameLanguageType[]> {
    this.logger.log(`Retrieving all languages with sort order ${sortOrder} and sort by ${sortBy}`);

    // Get all languages
    const languages = await this.gamesLanguageRepository.find({
      order: { [sortBy]: sortOrder },
    });

    // Return languages
    return languages;
  }

  /**
   * Get language by ID
   * @param id Language ID
   * @returns Promise that resolves to a language
   * @throws `NotFoundException` If language not found
   */
  public async getById(id: number): Promise<GameLanguageType> {
    this.logger.log(`Retrieving language with ID ${id}`);

    // Get language by ID
    const language = await this.gamesLanguageRepository.findOne({ where: { id } });

    // Throw an exception if the language is not found
    if (!language) throw new NotFoundException(`Language with ID ${id} not found`);

    // Return the language
    return language;
  }

  /**
   * Get languages by IDs
   * @param ids Language IDs
   * @returns Promise that resolves to an array of languages
   * @throws `NotFoundException` If language not found
   */
  public async getByIds(ids: number[]): Promise<GameLanguageType[]> {
    this.logger.log(`Retrieving languages with IDs ${ids}`);

    // Get languages by IDs
    const languages = await this.gamesLanguageRepository.find({ where: { id: In(ids) } });

    // Throw an exception if any of the languages are not found
    if (languages.length < ids.length) {
      const missingIds = ids.filter((id) => !languages.some((language) => language.id === id));
      throw new NotFoundException(`Languages with IDs ${missingIds} not found`);
    }

    // Return the languages
    return languages;
  }

  /**
   * Get language by name
   * @param name Language name
   * @returns Promise that resolves to a language
   * @throws `NotFoundException` If language not found
   */
  public async getByName(name: string): Promise<GameLanguageType> {
    this.logger.log(`Retrieving language with name ${name}`);

    // Get language by name
    const language = await this.gamesLanguageRepository.findOne({ where: { name } });

    // Throw an exception if the language is not found
    if (!language) throw new NotFoundException(`Language with name ${name} not found`);

    // Return the language
    return language;
  }

  /**
   * Get languages by names
   * @param names Language names
   * @returns Promise that resolves to an array of languages
   * @throws `NotFoundException` If language not found
   */
  public async getByNameList(names: string[]): Promise<GameLanguageType[]> {
    this.logger.log(`Retrieving languages with names ${names}`);

    // Get languages by names
    const languages = await this.gamesLanguageRepository.find({
      where: { name: In(names) },
    });

    // Throw an exception if any of the languages are not found
    if (languages.length < names.length) {
      const missingNames = names.filter((name) => !languages.some((language) => language.name === name));
      throw new NotFoundException(`Languages with names ${missingNames} not found`);
    }

    // Return the languages
    return languages;
  }

  /**
   * Gets paginated languages.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated languages.
   */
  public async getLanguagesPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'name',
    order: 'ASC' | 'DESC',
    searchQuery?: { name?: string },
  ): Promise<{ items: GameLanguageType[]; total: number; totalPages: number }> {
    this.logger.log(`Getting languages paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    // Construct the where clause
    const where: FindOptionsWhere<GameLanguageType> = {};
    if (searchQuery?.name) {
      where.name = ILike(`%${searchQuery.name}%`);
    }

    // Get the paginated results
    const [items, total] = await this.gamesLanguageRepository.findAndCount({
      where,
      order: { [orderBy]: order },
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(total / limit);

    // Return the paginated results
    return { items, total, totalPages };
  }

  /**
   * Create language
   * @param name Language name
   * @returns Promise that resolves when the creation is successful
   * @throws `ConflictException` If language already exists
   */
  public async create(name: string): Promise<GameLanguageType> {
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

    // Check if the creation was successful
    if (!result) throw new InternalServerErrorException('Failed to create language');

    // Return the created language
    return result;
  }

  /**
   * Update language
   * @param id Language ID
   * @param name Language name
   * @returns Promise that resolves when the update is successful
   * @throws `NotFoundException` If language not found
   */
  public async update(id: number, name: string): Promise<GameLanguageType> {
    this.logger.log(`Updating language with ID ${id}`);

    // Check if language exists
    const existingLangauge = await this.gamesLanguageRepository.findOne({ where: { id } });
    if (!existingLangauge) throw new NotFoundException(`Language with ID ${id} not found`);

    // Update fields
    existingLangauge.name = name;

    // Save changes
    const result = this.gamesLanguageRepository.save(existingLangauge);

    // Check if the update was successful
    if (!result) throw new InternalServerErrorException(`Failed to update language with ID ${id}`);

    // Return the updated language
    return result;
  }

  /**
   * Delete language
   * @param id Language ID
   * @returns Promise that resolves to the deleted language
   * @throws `NotFoundException` If language not found
   * @throws `InternalServerErrorException` If failed to delete
   */
  public async remove(id: number): Promise<GameLanguageType> {
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

    // Check if the deletion was successful
    if (!result) throw new InternalServerErrorException(`Failed to delete language with ID ${id}`);

    // Return the deleted language
    return result;
  }

  /**
   * Delete all languages
   * @returns Promise that resolves when the deletion is successful
   * @throws `InternalServerErrorException` If failed to delete
   */
  public async removeAll(): Promise<void> {
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
