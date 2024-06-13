import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GamesService } from '@repositories/sql/games/games.service';
import { GamesModule } from '@repositories/sql/games/games.module';
import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { Game } from '@repositories/sql/games/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesPricingModule } from '@repositories/sql/games-pricing/games-pricing.module';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';

describe('gamesService', () => {
  let game: Game;
  let game2: Game;
  let tag: GameTag;
  let tag2: GameTag;
  let gamesService: GamesService;
  let gamesTagsService: GamesTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
            `src/common/configs/environments/.env.${process.env.NODE_ENV}.local`,
            `src/common/configs/environments/.env.${process.env.NODE_ENV}`,
            'src/common/configs/environments/.env',
          ],
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'sql',
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get<string>('POSTGRESQL_URI'),
            entities: [Publisher, Developer, GameFeature, GamePricing, GameTag, Review, User, Game],
            synchronize: true,
            autoLoadEntities: true,
          }),
        }),
        GamesPricingModule,
        GamesModule,
        CompaniesModule,
        GamesFeaturesModule,
        GamesTagsModule,
      ],
      providers: [GamesPricingService, GamesService, CompaniesService, GamesFeaturesService, GamesTagsService, Logger],
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
        discount: false,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-10-30'),
        offerType: 'SPECIAL PROMOTION',
      },
      gamesFeatures: [],
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
        discount: false,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-11-30'),
        offerType: 'WEEKEND DEAL',
      },
      gamesFeatures: [],
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

    tag = await gamesTagsService.create('Test Tag');
    tag2 = await gamesTagsService.create('Test Tag2');
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
          reviews: [],
        }),
      );
    });

    it('should throw NotFoundException if game is not found', async () => {
      await expect(gamesService.getByName('Test Game3')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByTags', () => {
    it('should return games by tags', async () => {
      // Add tags to games
      await gamesService.update(game.id, { tags: [tag.id, tag2.id] });
      await gamesService.update(game2.id, { tags: [tag.id, tag2.id] });

      const result = await gamesService.getByTags([tag.id, tag2.id]);

      // Assertions
      expect(result).toHaveLength(2);
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
          discount: false,
          basePrice: 10,
          discountPrice: 5,
          discountStartDate: new Date(),
          discountEndDate: new Date('2024-10-30'),
          offerType: 'SPECIAL PROMOTION',
        },
        gamesFeatures: [],
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
      expect(newGame).toEqual(
        expect.objectContaining({
          name: 'Test Game3',
          pricing: expect.objectContaining({ discountEndDate: new Date('2024-10-30') }),
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
            discount: false,
            basePrice: 10,
            discountPrice: 5,
            discountStartDate: new Date(),
            discountEndDate: new Date('2024-10-30'),
            offerType: 'SPECIAL PROMOTION',
          },
          gamesFeatures: [],
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
        gamesFeatures: [],
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
          pricing: expect.objectContaining({ discountEndDate: new Date('2024-10-30') }),
        }),
      );
    });

    it('should throw NotFoundException if game does not exist', async () => {
      await expect(gamesService.update(99999, {
        name: 'Test Game3',
      })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the game with the given id', async () => {
      const removedGame = await gamesService.remove(game.id);

      // Assertions
      expect(removedGame).toEqual(
        expect.objectContaining({
          name: 'Test Game',
          pricing: expect.objectContaining({ discountEndDate: new Date('2024-10-30') }),
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
