import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
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
import { Game } from '@repositories/sql/games/game.entity';

describe('gamesService', () => {
  let game: Game;
  let game2: Game;
  let gamesService: GamesService;
  let gamesTagsService: GamesTagsService;

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
        GamesFeaturesModule,
        GamesLanguagesModule,
        GamesTagsModule,
      ],
      providers: [
        CompaniesService,
        GamesFeaturesService,
        GamesPricingService,
        GamesTagsService,
        GamesService,
        GamesLanguagesService,
        Logger,
      ],
    }).compile();

    gamesService = module.get<GamesService>(GamesService);
    gamesTagsService = module.get<GamesTagsService>(GamesTagsService);

    game = await gamesService.create({
      name: 'Test Game',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2022-01-01'),
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
        price: 10,
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
      featured: false,
    });

    game2 = await gamesService.create({
      name: 'Test Game2',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2022-01-02'),
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
        price: 10,
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
      featured: false,
    });
  });

  afterEach(async () => {
    await gamesService.removeAll();
    await gamesTagsService.removeAll();
  });

  describe('getAll', () => {
    it('should return all games', async () => {
      const games = await gamesService.getAll('id', 'ASC');
      expect(games).toHaveLength(2);
    });
  });

  describe('getById', () => {
    it('should return game by id', async () => {
      const result = await gamesService.getById(game.id);

      // Assertions
      expect(result).toEqual(
        expect.objectContaining({
          id: game.id,
          name: game.name,
          category: game.category,
          description: game.description,
          releaseDate: game.releaseDate,
          publishers: [],
          developers: [],
          thumbnailEntries: game.thumbnailEntries,
          imageEntries: [],
          videoEntries: [],
          tags: [],
          pricing: expect.objectContaining({
            free: game.pricing.free,
            discount: game.pricing.discount,
            basePrice: game.pricing.basePrice,
            discountPrice: game.pricing.discountPrice,
            discountStartDate: game.pricing.discountStartDate,
            discountEndDate: game.pricing.discountEndDate,
            discountPercentage: game.pricing.discountPercentage,
            offerType: game.pricing.offerType,
          }),
          platformEntries: game.platformEntries,
          link: game.link,
          about: game.about,
          mature: game.mature,
          matureDescription: game.matureDescription,
          systemRequirements: game.systemRequirements,
          legal: game.legal,
          averageRating: game.averageRating,
          reviewsCount: game.reviewsCount,
          reviews: [],
        }),
      );
    });

    it('should throw NotFoundException if game is not found', async () => {
      await expect(gamesService.getById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByName', () => {
    it('should return game by name', async () => {
      const result = await gamesService.getByName(game.name);

      // Assertions
      expect(result).toEqual(
        expect.objectContaining({
          id: game.id,
          name: game.name,
          category: game.category,
          description: game.description,
          releaseDate: game.releaseDate,
          publishers: [],
          developers: [],
          thumbnailEntries: game.thumbnailEntries,
          imageEntries: [],
          videoEntries: [],
          tags: [],
          pricing: expect.objectContaining({
            free: game.pricing.free,
            discount: game.pricing.discount,
            basePrice: game.pricing.basePrice,
            discountPrice: game.pricing.discountPrice,
            discountStartDate: game.pricing.discountStartDate,
            discountEndDate: game.pricing.discountEndDate,
            discountPercentage: game.pricing.discountPercentage,
            offerType: game.pricing.offerType,
          }),
          platformEntries: game.platformEntries,
          link: game.link,
          about: game.about,
          mature: game.mature,
          matureDescription: game.matureDescription,
          systemRequirements: game.systemRequirements,
          legal: game.legal,
          averageRating: game.averageRating,
          reviewsCount: game.reviewsCount,
          reviews: [],
        }),
      );
    });

    it('should throw NotFoundException if game is not found', async () => {
      await expect(gamesService.getByName('Test Game3')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create new game', async () => {
      const newGame = await gamesService.create({
        name: 'Test Game3',
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
          price: 100,
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
        featured: false,
      });

      // Assertions
      expect(newGame).toEqual(
        expect.objectContaining({
          name: 'Test Game3',
          pricing: expect.objectContaining({ basePrice: expect.any(Number) }),
        }),
      );
    });

    it('should throw ConflictException if game already exists', async () => {
      await expect(
        gamesService.create({
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
            price: 10,
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
          featured: false,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update game', async () => {
      const updatedGame = await gamesService.update(game2.id, {
        name: 'Test Game3',
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

      // Assertions
      expect(updatedGame).toEqual(
        expect.objectContaining({
          name: 'Test Game3',
          pricing: expect.objectContaining({ basePrice: expect.any(Number) }),
        }),
      );
    });

    it('should throw NotFoundException if game does not exist', async () => {
      await expect(
        gamesService.update(99999, {
          name: 'Test Game3',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateSales', () => {
    it('should update game sales', async () => {
      const updatedGame = await gamesService.updateSales([game2.id, game.id]);

      // Assertions
      expect(updatedGame).toEqual(
        expect.objectContaining([
          {
            name: game2.name,
            totalSales: 1,
          },
          {
            name: game.name,
            totalSales: 1,
          },
        ]),
      );
    });
  });

  describe('remove', () => {
    it('should remove the game with the given id', async () => {
      const removedGame = await gamesService.remove(game.id);

      // Assertions
      expect(removedGame).toEqual(
        expect.objectContaining({
          name: 'Test Game',
          pricing: expect.objectContaining({ basePrice: expect.any(Number) }),
        }),
      );
    });
  });

  describe('removeAll', () => {
    it('should remove all games', async () => {
      await gamesService.removeAll();
      const allGames = await gamesService.getAll('name', 'ASC');

      // Assertions
      expect(allGames).toEqual([]);
    });
  });
});
