// NestJS
import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, ILike, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

// Services
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';

// Entities
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Game } from '@repositories/sql/games/game.entity';

// Types
import type {
  Game as GameType,
  ImageEntry,
  PlatformEntry,
  SystemRequirementEntry,
  ThumbnailsEntry,
  VideoEntry,
} from '@repositories/sql/games/game.entity';
import type { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import type { GameLanguage as GameLanguageType } from '../games-languages/game-language.entity';

@Injectable()
export class GamesService {
  private readonly relations: FindOptionsRelations<GameType> = {};

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
      tags: true,
      pricing: true,
    };
  }

  /**
   * Retrieves all games.
   * @param {string} orderBy - The property to order by.
   * @param {string} order - The order to use.
   * @return {Promise<GameType[]>} A Promise that resolves to an array of game entities.
   */
  public async getAll(orderBy: 'id' | 'name' | 'releaseDate', order: 'ASC' | 'DESC'): Promise<GameType[]> {
    this.logger.log(`Retrieving all games from the database`);

    // Retrieve all games
    const games = await this.gameRepository.find({ order: { [orderBy]: order } });

    // Return the games
    return games;
  }

  /**
   * Retrieves a game by its ID.
   * @param {number} id - The ID of the game to retrieve.
   * @return {Promise<GameType>} A Promise that resolves to the game entity.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   */
  public async getById(id: number): Promise<GameType> {
    this.logger.log(`Retrieving game with ID ${id} from the database`);

    // Retrieve the game by ID
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: {
        developers: true,
        publishers: true,
        tags: true,
        pricing: true,
        features: true,
        languages: true,
      },
    });

    // Throw a NotFoundException if the game is not found
    if (!game) throw new NotFoundException(`Game with ID ${id} not found`);

    // Return the game
    return game;
  }

  /**
   * Retrieves games by their IDs.
   * @param {number[]} ids - The IDs of the games to retrieve.
   * @return {Promise<GameType[]>} A Promise that resolves to an array of game entities.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   */
  public async getByIds(ids: number[]): Promise<GameType[]> {
    this.logger.log(`Retrieving games with IDs ${ids.length > 0 ? ids : 'none'} from the database`);

    // Retrieve the games by IDs
    const games = await this.gameRepository.find({ where: { id: In(ids) }, relations: this.relations });

    // Throw a NotFoundException if any of the games are not found
    if (games.length !== ids.length) {
      const missingIds = ids.filter((id) => !games.some((game) => game.id === id));
      throw new NotFoundException(`Games with IDs ${missingIds} not found`);
    }

    // Return the games
    return games;
  }

  /**
   * Retrieves games by their name.
   * @param {string} name - The name of the games to retrieve.
   * @return {Promise<GameType[]>} A Promise that resolves to an array of game entities.
   */
  public async getByName(name: string): Promise<GameType> {
    this.logger.log(`Retrieving game with name ${name} from the database`);

    // Retrieve the game by name
    const games = await this.gameRepository.findOne({ where: { name }, relations: this.relations });

    // Throw a NotFoundException if the game is not found
    if (!games) throw new NotFoundException(`Game with name ${name} not found`);

    // Return the game
    return games;
  }

  /**
   * Gets paginated games.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated games.
   */
  public async getGamesPaginated(
    page: number,
    limit: number,
    orderBy:
      | 'id'
      | 'name'
      | 'discountPrice'
      | 'basePrice'
      | 'discountPercentage'
      | 'offerType'
      | 'discountStartDate'
      | 'discountEndDate',
    order: 'ASC' | 'DESC',
    discount: boolean,
    searchQuery?: { name?: string },
    admin?: boolean,
  ): Promise<{ items: Game[]; total: number; totalPages: number }> {
    this.logger.log(`Getting games paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    // Create a where clause based on the search query
    const where: FindOptionsWhere<Game> = {};
    if (discount) {
      if (admin) {
        where.pricing = { discount: true, discountEndDate: MoreThanOrEqual(new Date()) };
      } else {
        where.pricing = {
          discount: true,
          discountEndDate: MoreThanOrEqual(new Date()),
          discountStartDate: LessThanOrEqual(new Date()),
        };
      }
    }
    if (searchQuery?.name) where.name = ILike(`%${searchQuery.name}%`);

    const orderOptions: FindOptionsOrder<Game> = {};
    if (orderBy === 'id') orderOptions.id = order;
    if (orderBy === 'name') orderOptions.name = order;
    if (orderBy === 'discountPrice') orderOptions.pricing = { discountPrice: order };
    if (orderBy === 'basePrice') orderOptions.pricing = { basePrice: order };
    if (orderBy === 'discountPercentage') orderOptions.pricing = { discountPercentage: order };
    if (orderBy === 'offerType') orderOptions.pricing = { offerType: order };
    if (orderBy === 'discountStartDate') orderOptions.pricing = { discountStartDate: order };
    if (orderBy === 'discountEndDate') orderOptions.pricing = { discountEndDate: order };

    // Set skipCheckDiscount to true for admin
    if (admin) GamePricing.skipDiscountCheck = true;

    // Get the paginated games
    const [items, total] = await this.gameRepository.findAndCount({
      where,
      order: orderOptions,
      relations: { pricing: true },
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    // Reset after fetching to avoid affecting other queries
    if (admin) GamePricing.skipDiscountCheck = false;

    // Calculate the total number of pages
    const totalPages = Math.ceil(total / limit);

    // Return the paginated games and total number of pages
    return { items, total, totalPages };
  }

  /**
   * Creates a new game.
   * @param {Game} game - The game entity to be created.
   * @return {Promise<GameType>} A Promise that resolves to the created game entity.
   * @throws `ConflictException` Throws a ConflictException if the game already exists.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the creation fails.
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
      price?: string;
    };
    features: number[];
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
  }): Promise<GameType> {
    this.logger.log(`Creating game with name ${game.name} in the database`);

    // Check if game already exists
    const existingGame = await this.gameRepository.findOne({ where: { name: game.name } });
    if (existingGame) throw new ConflictException(`Game with name ${game.name} already exists`);

    // Get publishers and developers
    const publishers = await this.companiesService.getByIds(game.publishers, 'publisher');
    const developers = await this.companiesService.getByIds(game.developers, 'developer');

    // Get game features
    const features = await this.featuresService.getByIds(game.features);

    // Get game languages
    const gameLanguages = await this.languagesService.getByNameList(game.languages.map((language) => language.name));

    // Create new game tags
    const tags = await this.gamesTagsService.getByIds(game.tags);

    // Create new game entity
    const newGame = new Game();
    newGame.name = game.name;
    newGame.storageName = game.name;
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
    newGame.features = features;
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
    pricing.basePrice = game.pricing.price ?? '0.00';

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
   * @return {Promise<GameType>} A Promise that resolves to the updated game entity.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the update fails.
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
      changedThumbnails?: ThumbnailsEntry;
      deletedScreenshots?: number[];
      deletedVideos?: number[];
      renamedScreenshots?: { oldOrder: number; newOrder: number; link: string }[];
      renamedVideos?: { oldOrder: number; newOrder: number; videoLink: string; posterLink: string }[];
      addedScreenshots?: ImageEntry[];
      addedVideos?: VideoEntry[];
      featuredOrders?: number[];
      tags?: number[];
      pricing?: {
        free?: boolean;
        price?: string;
      };
      features?: number[];
      languages: {
        name: string;
        interface: boolean;
        fullAudio: boolean;
        subtitles: boolean;
      }[];
      featured?: boolean;
      platformEntries?: PlatformEntry;
      link?: string;
      about?: string;
      mature?: boolean;
      matureDescription?: string;
      systemRequirements?: SystemRequirementEntry;
      legal?: string;
    },
  ): Promise<GameType> {
    this.logger.log(`Updating game with ID ${id} in the database`);

    // Get relations
    const relations: FindOptionsRelations<Game> = {
      publishers: !!game.publishers,
      developers: !!game.developers,
      tags: !!game.tags,
      pricing: !!game.pricing,
      features: !!game.features,
      languages: !!game.languages,
    };

    // Check if game exists
    const existingGame = await this.gameRepository.findOne({
      where: { id },
      relations,
    });

    // Throw a not found exception if game does not exist
    if (!existingGame) throw new NotFoundException(`Game with ID ${id} not found`);

    // Get game languages if they are provided
    let gameLanguages: GameLanguageType[] | undefined = [];
    if (game.languages) {
      gameLanguages = await this.languagesService.getByNameList(game.languages.map((language) => language.name));
    }

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
    if (game.features) {
      const features = await this.featuresService.getByIds(game.features);
      existingGame.features = features;
    }
    if (game.languages) {
      existingGame.languages = gameLanguages;
      existingGame.languageSupport = game.languages;
    }
    if (game.featured !== undefined) existingGame.featured = game.featured;
    if (game.changedThumbnails) {
      const filteredThumbnails = Object.fromEntries(
        Object.entries(game.changedThumbnails).filter(([, value]) => value !== undefined),
      );
      existingGame.thumbnailEntries = { ...existingGame.thumbnailEntries, ...filteredThumbnails };
    }
    if (game.deletedScreenshots && game.deletedScreenshots.length > 0) {
      existingGame.imageEntries = existingGame.imageEntries.filter(
        (image) => !game.deletedScreenshots.includes(image.order),
      );
    }
    if (game.deletedVideos && game.deletedVideos.length > 0) {
      existingGame.videoEntries = existingGame.videoEntries.filter(
        (video) => !game.deletedVideos.includes(video.order),
      );
    }
    if (game.renamedScreenshots && game.renamedScreenshots.length > 0) {
      existingGame.imageEntries = existingGame.imageEntries.map((entry) => {
        const newEntry = game.renamedScreenshots.find((renamedEntry) => renamedEntry.oldOrder === entry.order);
        if (!newEntry) return entry;
        return { ...entry, order: newEntry.newOrder, link: newEntry.link };
      });
    }
    if (game.renamedVideos && game.renamedVideos.length > 0) {
      existingGame.videoEntries = existingGame.videoEntries.map((entry) => {
        const newEntry = game.renamedVideos.find((renamedEntry) => renamedEntry.oldOrder === entry.order);
        if (!newEntry) return entry;
        return { ...entry, order: newEntry.newOrder, link: newEntry.videoLink, posterLink: newEntry.posterLink };
      });
    }
    if (game.addedScreenshots && game.addedScreenshots.length > 0)
      existingGame.imageEntries = [...existingGame.imageEntries, ...game.addedScreenshots];
    if (game.addedVideos && game.addedVideos.length > 0)
      existingGame.videoEntries = [...existingGame.videoEntries, ...game.addedVideos];
    if (game.featuredOrders && game.featuredOrders.length > 0) {
      existingGame.imageEntries = existingGame.imageEntries.map((image) => ({
        ...image,
        featured: game.featuredOrders.includes(image.order),
      }));
    }
    if (game.platformEntries) existingGame.platformEntries = game.platformEntries;
    if (game.systemRequirements) existingGame.systemRequirements = game.systemRequirements;

    // Update pricing if provided
    if (game.pricing) {
      if (game.pricing.free !== true && game.pricing.price) {
        existingGame.pricing.free = false;
        existingGame.pricing.basePrice = game.pricing.price;
        existingGame.pricing.price = game.pricing.price;
      }
      if (game.pricing.free === true) {
        existingGame.pricing.free = game.pricing.free;
        existingGame.pricing.basePrice = '0.00';
        existingGame.pricing.price = '0.00';
      }
    }

    // Save the updated game to the database
    const result = await this.gameRepository.save(existingGame);
    if (!result) throw new InternalServerErrorException(`Failed to update game with ID ${id}`);
    return result;
  }

  /**
   * Updates games total sales by 1
   * @param {number} ids - The IDs of the games to be updated.
   * @return {Promise<Game[]>} A Promise that resolves to an array of updated games.
   */
  public async updateSales(ids: number[]): Promise<GameType[]> {
    this.logger.log(`Updating games sales`);

    // Update games sales
    const games = await this.getByIds(ids);

    // Update games sales
    games.forEach((game) => {
      game.totalSales += 1;
    });

    // Save the updated games to the database
    const result = await this.gameRepository.save(games);
    if (!result) throw new InternalServerErrorException(`Failed to update games sales`);
    return result;
  }

  /**
   * Removes a game by its ID.
   * @param {number} id - The ID of the game to be removed.
   * @return {Promise<Game>} A Promise that resolves to the removed game entity.
   * @throws `NotFoundException` Throws a NotFoundException if the game with the specified ID is not found.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */
  public async remove(id: number): Promise<GameType> {
    this.logger.log(`Removing game with ID ${id} from the database`);

    // Check if game exists
    const game = await this.getById(id);
    // Throw a not found exception if game does not exist
    if (!game) throw new NotFoundException(`Game with ID ${id} not found`);

    // Remove the game from the database
    const removedGame = await this.gameRepository.remove(game);

    // Throw an internal server error if the removal fails
    if (!removedGame) throw new InternalServerErrorException('Failed to remove game from the database');

    // Get game pricing id
    const gamePricingId = game.pricing.id;

    // Remove game pricing from the database
    await this.gamesPricingService.remove(gamePricingId);

    // Return the removed game
    return removedGame;
  }

  /**
   * Removes all games from the database.
   * @return {Promise<void>} A Promise that resolves when the removal is complete.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the removal fails.
   */
  public async removeAll(): Promise<void> {
    this.logger.log('Removing all games from the database');

    // Remove all games from the database
    const result = await this.gameRepository.delete({});

    // Throw an internal server error if the removal fails
    if (!result) throw new InternalServerErrorException('Failed to remove games from the database');

    // Remove all game pricing from the database
    await this.gamesPricingService.removeAll();
  }
}
