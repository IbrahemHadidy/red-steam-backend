import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, In, Repository } from 'typeorm';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import {
  Game,
  ImageEntry,
  PlatformEntry,
  SystemRequirementEntry,
  VideoEntry,
  ThumbnailsEntry,
} from '@repositories/sql/games/game.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';

@Injectable()
export class GamesService {
  private readonly relations: FindOptionsRelations<Game> = {};

  constructor(
    private readonly logger: Logger,
    @InjectRepository(Game, 'sql')
    private readonly gameRepository: Repository<Game>,
    private readonly companiesService: CompaniesService,
    private readonly featuresService: GamesFeaturesService,
    private readonly languagesService: GamesLanguagesService,
    private readonly gamesPricingService: GamesPricingService,
    private readonly gamesTagsService: GamesTagsService,
  ) {
    this.relations = {
      developers: true,
      publishers: true,
      tags: true,
      pricing: true,
      reviews: true,
      gamesFeatures: true,
      languages: true,
    };
  }

  /**
   * Retrieves all games.
   * @param {string} orderBy - The property to order by.
   * @param {string} order - The order to use.
   * @return {Promise<Game[]>} A Promise that resolves to an array of game entities.
   */
  public async getAll(orderBy: 'id' | 'name' | 'releaseDate', order: 'ASC' | 'DESC'): Promise<Game[]> {
    // Log the retrieval of all games
    this.logger.log(`Retrieving all games from the database`);

    const games = await this.gameRepository.find({ relations: this.relations, order: { [orderBy]: order } });
    return games;
  }

  /**
   * Retrieves a game by its ID.
   * @param {number} id - The ID of the game to retrieve.
   * @return {Promise<Game>} A Promise that resolves to the game entity.
   * @throws {NotFoundException} Throws a NotFoundException if the game with the specified ID is not found.
   */
  public async getById(id: number): Promise<Game> {
    // Log the retrieval of a game
    this.logger.log(`Retrieving game with ID ${id} from the database`);

    const game = await this.gameRepository.findOne({ where: { id }, relations: this.relations });
    if (!game) throw new NotFoundException(`Game with ID ${id} not found`);
    return game;
  }

  /**
   * Retrieves games by their IDs.
   * @param {number[]} ids - The IDs of the games to retrieve.
   * @return {Promise<Game[]>} A Promise that resolves to an array of game entities.
   * @throws {NotFoundException} Throws a NotFoundException if the game with the specified ID is not found.
   */
  public async getByIds(ids: number[]): Promise<Game[]> {
    const games = await this.gameRepository.find({ where: { id: In(ids) }, relations: this.relations });
    if (!games) throw new NotFoundException(`Games with ids ${ids} not found`);
    return games;
  }

  /**
   * Retrieves games by their name.
   * @param {string} name - The name of the games to retrieve.
   * @return {Promise<Game[]>} A Promise that resolves to an array of game entities.
   */
  public async getByName(name: string): Promise<Game> {
    // Log the retrieval of a game
    this.logger.log(`Retrieving game with name ${name} from the database`);

    const games = await this.gameRepository.findOne({ where: { name }, relations: this.relations });
    if (!games) throw new NotFoundException(`Game with name ${name} not found`);
    return games;
  }

  /**
   * Creates a new game.
   * @param {Game} game - The game entity to be created.
   * @return {Promise<Game>} A Promise that resolves to the created game entity.
   * @throws {ConflictException} Throws a ConflictException if the game already exists.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the creation fails.
   */
  public async create(game: {
    name: string;
    category: string;
    description: string;
    releaseDate: Date;
    featured: boolean;
    publishers: number[];
    developers: number[];
    thumbnailEntries: ThumbnailsEntry;
    imageEntries: ImageEntry[];
    videoEntries: VideoEntry[];
    tags: number[];
    pricing: {
      free: boolean;
      price?: number;
    };
    gamesFeatures: number[];
    languages: {
      name: string;
      interface: boolean;
      fullAudio: boolean;
      subtitles: boolean;
    }[];
    platformEntries: PlatformEntry;
    link: string;
    about: string;
    mature: boolean;
    matureDescription: string;
    systemRequirements: SystemRequirementEntry;
    legal: string;
  }): Promise<Game> {
    // Log the creation of a game
    this.logger.log(`Creating game with name ${game.name} in the database`);

    // Check if game already exists
    const existingGame = await this.gameRepository.findOne({ where: { name: game.name } });
    if (existingGame) throw new ConflictException(`Game with name ${game.name} already exists`);

    // Get publishers and developers
    const publishers = await this.companiesService.getByIds(game.publishers, 'publisher');
    const developers = await this.companiesService.getByIds(game.developers, 'developer');

    // Get game features
    const gamesFeatures = await this.featuresService.getByIds(game.gamesFeatures);

    // Get game languages
    const gameLanguages = await this.languagesService.getByNameList(game.languages.map((language) => language.name));

    // Create new game tags
    const tags = await this.gamesTagsService.getByIds(game.tags);

    // Create new game entity
    const newGame = new Game();
    newGame.name = game.name;
    newGame.category = game.category;
    newGame.description = game.description;
    newGame.releaseDate = game.releaseDate;
    newGame.featured = game.featured;
    newGame.publishers = publishers;
    newGame.developers = developers;
    newGame.thumbnailEntries = game.thumbnailEntries;
    newGame.imageEntries = game.imageEntries;
    newGame.videoEntries = game.videoEntries;
    newGame.tags = tags;
    newGame.gamesFeatures = gamesFeatures;
    newGame.languages = gameLanguages;
    newGame.languageSupport = game.languages;
    newGame.platformEntries = game.platformEntries;
    newGame.link = game.link;
    newGame.about = game.about;
    newGame.mature = game.mature;
    newGame.matureDescription = game.matureDescription;
    newGame.systemRequirements = game.systemRequirements;
    newGame.legal = game.legal;

    // Create new game pricing and link it to the saved game
    const pricing = new GamePricing();
    pricing.free = game.pricing.free;
    pricing.basePrice = game.pricing.price;

    // Link the pricing to the game
    newGame.pricing = pricing;
    pricing.game = newGame;

    // Save the new game
    const result = await this.gameRepository.save(newGame);
    if (!result) throw new InternalServerErrorException('Failed to create game');
    return result;
  }

  /**
   * Updates a game by its ID.
   * @param {number} id - The ID of the game to be updated.
   * @param {Game} game - The updated game entity.
   * @return {Promise<Game>} A Promise that resolves to the updated game entity.
   * @throws {NotFoundException} Throws a NotFoundException if the game with the specified ID is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async update(
    id: number,
    game: {
      name?: string;
      category?: string;
      description?: string;
      releaseDate?: Date;
      publishers?: number[];
      developers?: number[];
      thumbnailEntries?: ThumbnailsEntry;
      imageEntries?: ImageEntry[];
      videoEntries?: VideoEntry[];
      tags?: number[];
      pricing?: {
        free?: boolean;
        basePrice?: number;
        discount?: boolean;
        discountPrice?: number;
        discountStartDate?: Date;
        discountEndDate?: Date;
        offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
      };
      gamesFeatures?: number[];
      featured?: boolean;
      platformEntries?: PlatformEntry;
      link?: string;
      about?: string;
      mature?: boolean;
      matureDescription?: string;
      systemRequirements?: SystemRequirementEntry;
      legal?: string;
    },
  ): Promise<Game> {
    // Log the update of a game
    this.logger.log(`Updating game with ID ${id} in the database`);

    const existingGame = await this.gameRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!existingGame) throw new NotFoundException(`Game with ID ${id} not found`);

    // Update fields if they are provided
    if (game.name) existingGame.name = game.name;
    if (game.category) existingGame.category = game.category;
    if (game.description) existingGame.description = game.description;
    if (game.releaseDate) existingGame.releaseDate = game.releaseDate;
    if (game.link) existingGame.link = game.link;
    if (game.about) existingGame.about = game.about;
    if (game.mature) existingGame.mature = game.mature;
    if (game.matureDescription) existingGame.matureDescription = game.matureDescription;
    if (game.legal) existingGame.legal = game.legal;

    // Update related entities
    if (game.publishers) {
      const publishers = await this.companiesService.getByIds(game.publishers, 'publisher');
      existingGame.publishers = publishers;
    }
    if (game.developers) {
      const developers = await this.companiesService.getByIds(game.developers, 'developer');
      existingGame.developers = developers;
    }
    if (game.tags) {
      const tags = await this.gamesTagsService.getByIds(game.tags);
      existingGame.tags = tags;
    }
    if (game.gamesFeatures) {
      const gamesFeatures = await this.featuresService.getByIds(game.gamesFeatures);
      existingGame.gamesFeatures = gamesFeatures;
    }
    if (game.featured) existingGame.featured = game.featured;
    if (game.thumbnailEntries) existingGame.thumbnailEntries = game.thumbnailEntries;
    if (game.imageEntries) existingGame.imageEntries = game.imageEntries;
    if (game.videoEntries) existingGame.videoEntries = game.videoEntries;
    if (game.platformEntries) existingGame.platformEntries = game.platformEntries;
    if (game.systemRequirements) existingGame.systemRequirements = game.systemRequirements;

    // Update pricing if provided
    if (game.pricing) {
      existingGame.pricing.free = game.pricing.free;
      if (game.pricing.basePrice) existingGame.pricing.basePrice = game.pricing.basePrice;
      if (game.pricing.discount) existingGame.pricing.discount = game.pricing.discount;
      if (game.pricing.discountPrice) {
        existingGame.pricing.discountPrice = game.pricing.discountPrice;
        existingGame.pricing.discountPercentage = Math.round(
          (game.pricing.discountPrice / game.pricing.basePrice) * 100,
        );
      }
      if (game.pricing.discountStartDate) existingGame.pricing.discountStartDate = game.pricing.discountStartDate;
      if (game.pricing.discountEndDate) existingGame.pricing.discountEndDate = game.pricing.discountEndDate;
      if (game.pricing.offerType) existingGame.pricing.offerType = game.pricing.offerType;
    }

    // Save the updated game to the database
    const result = await this.gameRepository.save(existingGame);
    if (!result) throw new InternalServerErrorException(`Failed to update game with ID ${id}`);
    return result;
  }

  /**
   * Removes a game by its ID.
   * @param {number} id - The ID of the game to be removed.
   * @return {Promise<Game>} A Promise that resolves to the removed game entity.
   * @throws {NotFoundException} Throws a NotFoundException if the game with the specified ID is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async remove(id: number): Promise<Game> {
    // Log the removal of a game
    this.logger.log(`Removing game with ID ${id} from the database`);

    const game = await this.getById(id);
    if (!game) throw new NotFoundException(`Game with ID ${id} not found`);

    const removedGame = await this.gameRepository.remove(game);
    if (!removedGame) throw new InternalServerErrorException('Failed to remove game from the database');

    // Get game pricing id
    const gamePricingId = game.pricing.id;
    await this.gamesPricingService.remove(gamePricingId);

    return removedGame;
  }

  /**
   * Removes all games from the database.
   * @return {Promise<void>} A Promise that resolves when the removal is complete.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async removeAll(): Promise<void> {
    // Log the removal of all games
    this.logger.log('Removing all games from the database');

    const result = await this.gameRepository.delete({});
    if (!result) throw new InternalServerErrorException('Failed to remove games from the database');
    await this.gamesPricingService.removeAll();
  }
}