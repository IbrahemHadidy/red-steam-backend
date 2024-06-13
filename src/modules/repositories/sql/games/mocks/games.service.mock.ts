import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  Game,
  ImageEntry,
  PlatformEntry,
  SystemRequirementEntry,
  VideoEntry,
  ThumbnailsEntry,
} from '@repositories/sql/games/game.entity';
import { GamesService } from '@repositories/sql/games/games.service';
import { CompaniesServiceMock } from '@repositories/sql/companies/mocks/companies.service.mock';
import { GamesFeaturesServiceMock } from '@repositories/sql/games-features/mocks/games-features.service.mock';
import { GamesTagsServiceMock } from '@repositories/sql/games-tags/mocks/games-tags.service.mock';

export class GamesServiceMock implements Partial<GamesService> {
  public games: Game[] = [];
  private companiesService: CompaniesServiceMock;
  private gamesFeaturesService: GamesFeaturesServiceMock;
  private gamesTagsService: GamesTagsServiceMock;

  constructor() {
    this.companiesService = new CompaniesServiceMock();
    this.gamesFeaturesService = new GamesFeaturesServiceMock();
    this.gamesTagsService = new GamesTagsServiceMock();
  }

  public async getAll(orderBy: 'id' | 'name' | 'releaseDate', order: 'ASC' | 'DESC'): Promise<Game[]> {
    return this.games.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'ASC' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'ASC' ? 1 : -1;
      return 0;
    });
  }

  public async getById(id: number): Promise<Game> {
    const game = this.games.find((game) => game.id === id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  public async getByName(name: string): Promise<Game> {
    const game = this.games.find((game) => game.name === name);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  public async create(game: {
    name: string;
    category: string;
    description: string;
    releaseDate: Date;
    publishers: number[];
    developers: number[];
    thumbnailEntries: ThumbnailsEntry;
    imageEntries: ImageEntry[];
    videoEntries: VideoEntry[];
    tags: number[];
    pricing: {
      free: boolean;
      discount: boolean;
      basePrice: number;
      discountPrice: number;
      discountStartDate: Date;
      discountEndDate: Date;
      offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
    };
    gamesFeatures: number[];
    platformEntries: PlatformEntry;
    link: string;
    about: string;
    mature: boolean;
    matureDescription: string;
    systemRequirements: SystemRequirementEntry;
    legal: string;
  }): Promise<Game> {
    // Check if game already exists
    if (this.games.find((existingGame) => existingGame.name === game.name)) {
      throw new ConflictException(`Game with name ${game.name} already exists`);
    }

    const newGame = new Game();
    Object.assign(newGame, game);
    this.games.push(newGame);
    return newGame;
  }

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
      gameFeatures?: number[];
      platformEntries?: PlatformEntry;
      link?: string;
      about?: string;
      mature?: boolean;
      matureDescription?: string;
      systemRequirements?: SystemRequirementEntry;
      legal?: string;
    },
  ): Promise<Game> {
    const existingGame = await this.getById(id);

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

    if (game.gameFeatures) {
      const gameFeatures = await this.gamesFeaturesService.getByIds(game.gameFeatures);
      existingGame.gamesFeatures = gameFeatures;
    }

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
      if (game.pricing.discountPrice) existingGame.pricing.discountPrice = game.pricing.discountPrice;
      if (game.pricing.discountStartDate) existingGame.pricing.discountStartDate = game.pricing.discountStartDate;
      if (game.pricing.discountEndDate) existingGame.pricing.discountEndDate = game.pricing.discountEndDate;
      if (game.pricing.offerType) existingGame.pricing.offerType = game.pricing.offerType;
    }

    return existingGame;
  }

  public async remove(id: number): Promise<Game> {
    const index = this.games.findIndex((game) => game.id === id);
    if (index === -1) throw new NotFoundException('Game not found');
    const removedGame = this.games.splice(index, 1)[0];
    return removedGame;
  }

  public async removeAll(): Promise<void> {
    this.games = [];
  }
}
