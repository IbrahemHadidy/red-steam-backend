import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { ConflictException, Logger } from '@nestjs/common';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { Game } from '@repositories/sql/games/game.entity';

describe('gamesTagsService', () => {
  let testTag: GameTag;
  let testTag2: GameTag;
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
