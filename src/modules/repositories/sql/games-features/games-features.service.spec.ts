import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { Game } from '@repositories/sql/games/game.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';

describe('gamesTagsService', () => {
  let gameFeature: GameFeature;
  let gameFeature2: GameFeature;
  let gamesFeaturesService: GamesFeaturesService;

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
        GamesFeaturesModule,
      ],
      providers: [GamesFeaturesService, Logger],
    }).compile();

    gamesFeaturesService = module.get<GamesFeaturesService>(GamesFeaturesService);

    gameFeature = await gamesFeaturesService.create({ name: 'Test1', description: 'Test1desc' });
    gameFeature2 = await gamesFeaturesService.create({ name: 'Test2', description: 'Test2desc' });
  });

  afterEach(async () => {
    await gamesFeaturesService.removeAll();
  });

  describe('getAll', () => {
    it('should return an array of game features', async () => {
      const gameFeatures = await gamesFeaturesService.getAll('name', 'ASC');
      expect(gameFeatures.length).toEqual(2);
    });
  });

  describe('getById', () => {
    it('should return the game feature with the given id', async () => {
      const foundGameFeature = await gamesFeaturesService.getById(gameFeature.id);
      expect(foundGameFeature).toEqual(expect.objectContaining({ name: 'Test1' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(gamesFeaturesService.getById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByName', () => {
    it('should return the game feature with the given name', async () => {
      const foundGameFeature = await gamesFeaturesService.getByName('Test1');
      expect(foundGameFeature).toEqual(expect.objectContaining({ name: 'Test1' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(gamesFeaturesService.getByName('Test3')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByDescription', () => {
    it('should return the game feature with the given description', async () => {
      const foundGameFeature = await gamesFeaturesService.getByDescription('Test1desc');
      expect(foundGameFeature).toEqual(expect.objectContaining({ description: 'Test1desc' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(gamesFeaturesService.getByDescription('Test3desc')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new game feature', async () => {
      const createdGameFeature = await gamesFeaturesService.create({ name: 'Test3', description: 'Test3desc' });
      expect(createdGameFeature).toEqual(expect.objectContaining({ name: 'Test3' }));
    });

    it('should throw an error if the game feature name already exists', async () => {
      await expect(gamesFeaturesService.create({ name: 'Test1', description: 'Test3desc' })).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw an error if the game feature description already exists', async () => {
      await expect(gamesFeaturesService.create({ name: 'Test3', description: 'Test1desc' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update the game feature with the given id', async () => {
      const updatedGameFeature = await gamesFeaturesService.update(gameFeature2.id, {
        name: 'Test3',
        description: 'Test3desc',
      });
      expect(updatedGameFeature).toEqual(expect.objectContaining({ name: 'Test3' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(gamesFeaturesService.update(0, { name: 'Test3', description: 'Test3desc' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if no name or description is provided', async () => {
      await expect(gamesFeaturesService.update(gameFeature.id, {})).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove the game feature with the given id', async () => {
      const removedGameFeature = await gamesFeaturesService.remove(gameFeature.id);
      expect(removedGameFeature).toEqual(expect.objectContaining({ name: 'Test1' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(gamesFeaturesService.remove(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAll', () => {
    it('should remove all game features', async () => {
      await gamesFeaturesService.removeAll();
      const gameFeatures = await gamesFeaturesService.getAll('name', 'ASC');
      expect(gameFeatures.length).toEqual(0);
    });
  });
});
