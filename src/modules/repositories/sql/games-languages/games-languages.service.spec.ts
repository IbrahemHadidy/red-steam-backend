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
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';
import { Game } from '@repositories/sql/games/game.entity';

describe('gamesLanguagesService', () => {
  let gameLanguage: GameLanguage;
  let gameLanguage2: GameLanguage;
  let game: Game;
  let game2: Game;
  let gamesService: GamesService;
  let gamesLanguagesService: GamesLanguagesService;

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
    gamesLanguagesService = module.get<GamesLanguagesService>(GamesLanguagesService);

    gameLanguage = await gamesLanguagesService.create('Lang1');
    gameLanguage2 = await gamesLanguagesService.create('Lang2');

    game = await gamesService.create({
      name: 'Test Game 1',
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
      languages: [
        { name: gameLanguage.name, interface: true, fullAudio: true, subtitles: true },
        { name: gameLanguage2.name, interface: true, fullAudio: false, subtitles: true },
      ],
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
      name: 'Test Game 2',
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
      languages: [
        { name: gameLanguage.name, interface: true, fullAudio: true, subtitles: false },
        { name: gameLanguage2.name, interface: true, fullAudio: false, subtitles: false },
      ],
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
    await gamesLanguagesService.removeAll();
    await gamesService.removeAll();
  });

  describe('getAll', () => {
    it('should return an array of game languages', async () => {
      const gameLanguages = await gamesLanguagesService.getAll('name', 'ASC');
      expect(gameLanguages.length).toEqual(2);
      expect(game.languages[0]).toEqual(expect.objectContaining({ name: 'Lang1' }));
      expect(game.languages[1]).toEqual(expect.objectContaining({ name: 'Lang2' }));
      expect(game2.languages[0]).toEqual(expect.objectContaining({ name: 'Lang1' }));
      expect(game2.languages[1]).toEqual(expect.objectContaining({ name: 'Lang2' }));
    });
  });

  describe('getById', () => {
    it('should return the game languages with the given id', async () => {
      const foundGameLanguage = await gamesLanguagesService.getById(gameLanguage.id);
      expect(foundGameLanguage).toEqual(expect.objectContaining({ name: 'Lang1' }));
      expect(gameLanguage);
    });

    it('should throw an error if the game language does not exist', async () => {
      await expect(gamesLanguagesService.getById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByName', () => {
    it('should return the game langauge with the given name', async () => {
      const foundGameLanguage = await gamesLanguagesService.getByName('Lang1');
      expect(foundGameLanguage).toEqual(expect.objectContaining({ name: 'Lang1' }));
    });

    it('should throw an error if the game language does not exist', async () => {
      await expect(gamesLanguagesService.getByName('Lang6')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getLanguagesPaginated', () => {
    it('should return an array of game tags sorted by name', async () => {
      const gameLanguages = await gamesLanguagesService.getLanguagesPaginated(0, 10, 'name', 'ASC');
      expect(gameLanguages.items.length).toEqual(2);
      expect(gameLanguages.items[0].name).toEqual('Test1');
      expect(gameLanguages.items[1].name).toEqual('Test2');
    });

    it('should return an array of game tags sorted by id', async () => {
      const gameLanguages = await gamesLanguagesService.getLanguagesPaginated(0, 10, 'id', 'ASC');
      expect(gameLanguages.items.length).toEqual(2);
      expect(gameLanguages.items[0].id).toEqual(gameLanguage.id);
      expect(gameLanguages.items[1].id).toEqual(gameLanguage2.id);
    });

    it('should return values with the given search', async () => {
      const gameLanguages = await gamesLanguagesService.getLanguagesPaginated(0, 10, 'name', 'ASC', { name: 'Test2' });
      expect(gameLanguages.items.length).toEqual(1);
      expect(gameLanguages.items[0].name).toEqual('Test2');
    });
  });

  describe('create', () => {
    it('should create a new game language', async () => {
      const createdGameLanguage = await gamesLanguagesService.create('Lang6');
      expect(createdGameLanguage).toEqual(expect.objectContaining({ name: 'Lang6' }));
    });

    it('should throw an error if the game language name already exists', async () => {
      await expect(gamesLanguagesService.create('Lang1')).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update the game language with the given id', async () => {
      const updatedGameLanguage = await gamesLanguagesService.update(gameLanguage2.id, 'Lang6');
      expect(updatedGameLanguage).toEqual(expect.objectContaining({ name: 'Lang6' }));
    });

    it('should throw an error if the game language does not exist', async () => {
      await expect(gamesLanguagesService.update(0, 'Lang6')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the game langauge with the given id', async () => {
      const removedGameLanguage = await gamesLanguagesService.remove(gameLanguage.id);
      const changedGame = await gamesService.getById(game.id);
      expect(removedGameLanguage).toEqual(expect.objectContaining({ name: 'Lang1' }));
      expect(changedGame.languages.length).toEqual(1);
    });

    it('should throw an error if the game langauges does not exist', async () => {
      await expect(gamesLanguagesService.remove(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAll', () => {
    it('should remove all game langauges', async () => {
      await gamesLanguagesService.removeAll();
      const gameLanguages = await gamesLanguagesService.getAll('name', 'ASC');
      const changedGame = await gamesService.getById(game.id);
      const changedGame2 = await gamesService.getById(game2.id);
      expect(gameLanguages.length).toEqual(0);
      expect(changedGame.languages.length).toEqual(0);
      expect(changedGame2.languages.length).toEqual(0);
    });
  });
});
