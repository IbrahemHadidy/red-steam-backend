import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig } from '@test/integration-setup';

// Game tags Module and Service
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';

// Entities
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

describe('gamesTagsService', () => {
  let testTag: GameTag;
  let testTag2: GameTag;
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
        GamesTagsModule,
      ],
      providers: [GamesTagsService, Logger],
    }).compile();

    gamesTagsService = module.get<GamesTagsService>(GamesTagsService);

    testTag = await gamesTagsService.create('Test');
    testTag2 = await gamesTagsService.create('Test2');
  });

  afterEach(async () => {
    await gamesTagsService.removeAll();
  });

  describe('getAll', () => {
    it('should return an array of game tags', async () => {
      const tags = await gamesTagsService.getAll('name', 'ASC');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('getByName', () => {
    it('should return the game tag with the given name', async () => {
      const tag = await gamesTagsService.getByName('Test');
      expect(tag.name).toEqual('Test');
    });
  });

  describe('getByNameList', () => {
    it('should return the game tags with the given names', async () => {
      const tags = await gamesTagsService.getByNameList(['Test', 'Test2']);

      // Assert
      expect(tags.length).toEqual(2);
      expect(tags[0].name).toEqual('Test');
      expect(tags[1].name).toEqual('Test2');
    });
  });

  describe('getById', () => {
    it('should return the game tag with the given id', async () => {
      const tag = await gamesTagsService.getById(testTag.id);

      // Assert
      expect(tag.name).toEqual(testTag.name);
    });
  });

  describe('getByIds', () => {
    it('should return the game tags with the given ids', async () => {
      const tags = await gamesTagsService.getByIds([testTag.id, testTag2.id]);

      // Assert
      expect(tags[0].name).toEqual(testTag.name);
      expect(tags[1].name).toEqual(testTag2.name);
    });
  });

  describe('getTagsPaginated', () => {
    it('should return an array of game tags sorted by name', async () => {
      const gameTags = await gamesTagsService.getTagsPaginated(0, 10, 'name', 'ASC');
      expect(gameTags.items.length).toEqual(2);
      expect(gameTags.items[0].name).toEqual('Test1');
      expect(gameTags.items[1].name).toEqual('Test2');
    });

    it('should return an array of game tags sorted by id', async () => {
      const gameTags = await gamesTagsService.getTagsPaginated(0, 10, 'id', 'ASC');
      expect(gameTags.items.length).toEqual(2);
      expect(gameTags.items[0].id).toEqual(testTag.id);
      expect(gameTags.items[1].id).toEqual(testTag2.id);
    });

    it('should return values with the given search', async () => {
      const gameTags = await gamesTagsService.getTagsPaginated(0, 10, 'name', 'ASC', { name: 'Test2' });
      expect(gameTags.items.length).toEqual(1);
      expect(gameTags.items[0].name).toEqual('Test2');
    });
  });

  describe('create', () => {
    it('should create a new game tag', async () => {
      const name = 'Test1';
      const createdTag = await gamesTagsService.create(name);

      // Assert
      expect(createdTag.name).toEqual(name);

      // Cleanup
      await gamesTagsService.removeByName(name);
    });

    it('should throw a ConflictException if the game tag already exists', async () => {
      // Assert
      await expect(gamesTagsService.create('Test')).rejects.toThrow(ConflictException);
    });
  });

  describe('removeById', () => {
    it('should remove the game tag with the given id', async () => {
      const createdTag = await gamesTagsService.create('Test3');
      const removedTag = await gamesTagsService.removeById(createdTag.id);

      // Assert
      expect(removedTag.name).toEqual('Test3');
    });
  });

  describe('removeByIds', () => {
    it('should remove the game tags with the given ids', async () => {
      const createdTag = await gamesTagsService.create('Test3');
      const createdTag2 = await gamesTagsService.create('Test4');
      const removedTags = await gamesTagsService.removeByIds([createdTag.id, createdTag2.id]);

      // Assert
      expect(removedTags.length).toEqual(2);
      expect(removedTags[0].name).toEqual('Test3');
      expect(removedTags[1].name).toEqual('Test4');
    });
  });

  describe('removeByName', () => {
    it('should remove the game tag with the given name', async () => {
      const createdTag = await gamesTagsService.create('Test3');
      const removedTag = await gamesTagsService.removeByName(createdTag.name);

      // Assert
      expect(removedTag.name).toEqual('Test3');
    });
  });

  describe('removeByNameList', () => {
    it('should remove the game tags with the given names', async () => {
      const createdTag = await gamesTagsService.create('Test3');
      const createdTag2 = await gamesTagsService.create('Test4');
      const removedTags = await gamesTagsService.removeByNameList([createdTag.name, createdTag2.name]);

      // Assert
      expect(removedTags.length).toEqual(2);
      expect(removedTags[0].name).toEqual('Test3');
      expect(removedTags[1].name).toEqual('Test4');
    });
  });

  describe('removeAll', () => {
    it('should delete all game tags', async () => {
      await gamesTagsService.create('Test3');
      await gamesTagsService.create('Test4');
      await gamesTagsService.removeAll();
      const tags = await gamesTagsService.getAll('name', 'ASC');
      expect(tags.length).toEqual(0);
    });
  });
});
