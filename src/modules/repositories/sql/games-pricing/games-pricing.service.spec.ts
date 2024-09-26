import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig } from '@test/integration-setup';

// Modules
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { GamesLanguagesModule } from '@repositories/sql/games-languages/games-languages.module';
import { GamesPricingModule } from '@repositories/sql/games-pricing/games-pricing.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { GamesModule } from '@repositories/sql/games/games.module';

// Services
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesService } from '@repositories/sql/games/games.service';

// Entities
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Game } from '@repositories/sql/games/game.entity';

describe('gamePricingService', () => {
  let game: Game;
  let game2: Game;
  let gamePricing: GamePricing;
  let gamePricing2: GamePricing;
  let gamesService: GamesService;
  let gamesPricingService: GamesPricingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(environmentConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'sql',
          useFactory: async (configService: ConfigService) => getSqlTypeOrmConfig(configService),
        }),
        GamesPricingModule,
        GamesModule,
        CompaniesModule,
        GamesLanguagesModule,
        GamesFeaturesModule,
        GamesTagsModule,
      ],
      providers: [
        GamesPricingService,
        GamesService,
        CompaniesService,
        GamesLanguagesService,
        GamesFeaturesService,
        GamesTagsService,
        Logger,
      ],
    }).compile();

    gamesService = module.get<GamesService>(GamesService);
    gamesPricingService = module.get<GamesPricingService>(GamesPricingService);

    game = await gamesService.create({
      name: 'Test Game',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date(),
      publishers: [],
      developers: [],
      thumbnailEntries: {
        mainImage: null,
        backgroundImage: null,
        menuImg: null,
        horizontalHeaderImage: null,
        verticalHeaderImage: null,
        smallHeaderImage: null,
        searchImage: null,
        tabImage: null,
      },
      imageEntries: [],
      videoEntries: [],
      tags: [],
      pricing: {
        free: false,
        discount: false,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-10-30'),
        offerType: 'SPECIAL PROMOTION',
      },
      features: [],
      languages: [],
      platformEntries: {
        win: true,
        mac: false,
      },
      link: 'Test Link',
      about: 'Test About',
      mature: false,
      matureDescription: 'Test Mature Description',
      systemRequirements: {
        mini: {},
        recommended: {},
      },
      legal: 'Test Legal',
    });

    game2 = await gamesService.create({
      name: 'Test Game2',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date(),
      publishers: [],
      developers: [],
      thumbnailEntries: {
        mainImage: null,
        backgroundImage: null,
        menuImg: null,
        horizontalHeaderImage: null,
        verticalHeaderImage: null,
        smallHeaderImage: null,
        searchImage: null,
        tabImage: null,
      },
      imageEntries: [],
      videoEntries: [],
      tags: [],
      pricing: {
        free: false,
        discount: false,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-11-30'),
        offerType: 'WEEKEND DEAL',
      },
      features: [],
      languages: [],
      platformEntries: {
        win: true,
        mac: false,
      },
      link: 'Test Link',
      about: 'Test About',
      mature: false,
      matureDescription: 'Test Mature Description',
      systemRequirements: {
        mini: {},
        recommended: {},
      },
      legal: 'Test Legal',
    });

    gamePricing = game.pricing;
    gamePricing2 = game2.pricing;
  });

  afterEach(async () => {
    await gamesService.removeAll();
  });

  describe('getAll', () => {
    it('should return all pricings', async () => {
      const pricings = await gamesPricingService.getAll('id', 'ASC');

      // Assertions
      expect(pricings.length).toBe(2);
    });
  });

  describe('getById', () => {
    it('should return the pricing with the given id', async () => {
      const pricing = await gamesPricingService.getById(gamePricing.id);

      // Assertions
      expect(pricing.id).toBe(gamePricing.id);
    });

    it('should throw NotFoundException if pricing is not found', async () => {
      await expect(gamesPricingService.getById(9999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByGameId', () => {
    it('should return the pricing with the given game id', async () => {
      const pricing = await gamesPricingService.getByGameId(game.id);

      // Assertions
      expect(pricing.id).toBe(gamePricing.id);
    });

    it('should throw NotFoundException if pricing is not found', async () => {
      await expect(gamesPricingService.getByGameId(9999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getGamesByPricing', () => {
    it('should return the games with the given pricing options', async () => {
      const games = await gamesPricingService.getGamesByPricing({
        free: false,
        discount: false,
        sortBy: 'basePrice',
        sortOrder: 'ASC',
        minPrice: 0,
        maxPrice: 100,
        skip: 0,
        take: 10,
      });

      // Assertions
      expect(games.length).toBe(2);
    });

    it('should throw BadRequestException if game is free and discounted', async () => {
      await expect(
        gamesPricingService.getGamesByPricing({
          free: true,
          discount: true,
          sortBy: 'basePrice',
          sortOrder: 'ASC',
          minPrice: 0,
          maxPrice: 100,
          skip: 0,
          take: 10,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('should create a new game pricing', async () => {
      const pricing = await gamesPricingService.create({
        free: false,
        basePrice: 10,
        discount: true,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-12-31'),
        offerType: 'SPECIAL PROMOTION',
        game: new Game(),
      });

      // Assertions
      expect(pricing).toEqual(
        expect.objectContaining({
          free: false,
          basePrice: 10,
          discountPrice: 5,
          discountEndDate: new Date('2024-12-31'),
          offerType: 'SPECIAL PROMOTION',
        }),
      );
    });
  });

  describe('update', () => {
    it('should update the game pricing with the given id', async () => {
      const updatedPricing = await gamesPricingService.update(gamePricing2.id, {
        free: true,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-12-31'),
        offerType: 'SPECIAL PROMOTION',
      });

      // Assertions
      expect(updatedPricing).toEqual(
        expect.objectContaining({
          free: true,
          basePrice: 0,
        }),
      );
    });

    it('should throw NotFoundException if game pricing is not found', async () => {
      await expect(
        gamesPricingService.update(9999, {
          free: true,
          basePrice: 10,
          discountPrice: 5,
          discountStartDate: new Date(),
          discountEndDate: new Date('2024-12-31'),
          offerType: 'SPECIAL PROMOTION',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the game pricing with the given id', async () => {
      await gamesService.remove(game.id);
      const pricings = await gamesPricingService.getAll('id', 'ASC');

      // Assertions
      expect(pricings.length).toBe(1);
    });

    it('should throw NotFoundException if game pricing is not found', async () => {
      await expect(gamesPricingService.remove(9999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAll', () => {
    it('should remove all game pricings', async () => {
      await gamesService.removeAll();
      const pricings = await gamesPricingService.getAll('id', 'ASC');

      // Assertions
      expect(pricings.length).toBe(0);
    });
  });
});
