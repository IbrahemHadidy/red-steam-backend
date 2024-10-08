import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig } from '@test/integration-setup';

// Games Features Module and Service
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';

// Entities
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';

describe('gamesTagsService', () => {
  let gameFeature: GameFeature;
  let gameFeature2: GameFeature;
  let testIconBuffer: Buffer;
  let testIconBuffer2: Buffer;
  let testIconBuffer3: Buffer;
  let featuresService: GamesFeaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(environmentConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'sql',
          useFactory: async (configService: ConfigService) => getSqlTypeOrmConfig(configService),
        }),
        GamesFeaturesModule,
      ],
      providers: [GamesFeaturesService, Logger],
    }).compile();

    featuresService = module.get<GamesFeaturesService>(GamesFeaturesService);

    testIconBuffer = Buffer.from('test-icon-data');
    testIconBuffer2 = Buffer.from('test-icon-data2');
    testIconBuffer3 = Buffer.from('test-icon-data3');

    gameFeature = await featuresService.create({ name: 'Test1', icon: testIconBuffer });
    gameFeature2 = await featuresService.create({ name: 'Test2', icon: testIconBuffer2 });
  });

  afterEach(async () => {
    await featuresService.removeAll();
  });

  describe('getAll', () => {
    it('should return an array of game features', async () => {
      const gameFeatures = await featuresService.getAll('name', 'ASC');
      expect(gameFeatures.length).toEqual(2);
    });
  });

  describe('getById', () => {
    it('should return the game feature with the given id', async () => {
      const foundGameFeature = await featuresService.getById(gameFeature.id);
      expect(foundGameFeature).toEqual(expect.objectContaining({ name: 'Test1' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(featuresService.getById(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByName', () => {
    it('should return the game feature with the given name', async () => {
      const foundGameFeature = await featuresService.getByName('Test1');
      expect(foundGameFeature).toEqual(expect.objectContaining({ name: 'Test1' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(featuresService.getByName('Test3')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFeaturesPaginated', () => {
    it('should return an array of game features sorted by name', async () => {
      const gameFeatures = await featuresService.getFeaturesPaginated(0, 10, 'name', 'ASC');
      expect(gameFeatures.items.length).toEqual(2);
      expect(gameFeatures.items[0].name).toEqual('Test1');
      expect(gameFeatures.items[1].name).toEqual('Test2');
    });

    it('should return an array of game features sorted by id', async () => {
      const gameFeatures = await featuresService.getFeaturesPaginated(0, 10, 'id', 'ASC');
      expect(gameFeatures.items.length).toEqual(2);
      expect(gameFeatures.items[0].id).toEqual(gameFeature.id);
      expect(gameFeatures.items[1].id).toEqual(gameFeature2.id);
    });

    it('should return values with the given search', async () => {
      const gameFeatures = await featuresService.getFeaturesPaginated(0, 10, 'name', 'ASC', { name: 'Test2' });
      expect(gameFeatures.items.length).toEqual(1);
      expect(gameFeatures.items[0].name).toEqual('Test2');
    });
  });

  describe('create', () => {
    it('should create a new game feature', async () => {
      const createdGameFeature = await featuresService.create({ name: 'Test3', icon: testIconBuffer2 });
      expect(createdGameFeature).toEqual(expect.objectContaining({ name: 'Test3' }));
    });

    it('should throw an error if the game feature name already exists', async () => {
      await expect(featuresService.create({ name: 'Test1', icon: testIconBuffer })).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update the game feature with the given id', async () => {
      const updatedGameFeature = await featuresService.update(gameFeature2.id, {
        name: 'Test3',
        icon: testIconBuffer3,
      });
      expect(updatedGameFeature).toEqual(expect.objectContaining({ name: 'Test3' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(featuresService.update(0, { name: 'Test3', icon: testIconBuffer })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if no name or description is provided', async () => {
      await expect(featuresService.update(gameFeature.id, {})).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('remove', () => {
    it('should remove the game feature with the given id', async () => {
      const removedGameFeature = await featuresService.remove(gameFeature.id);
      expect(removedGameFeature).toEqual(expect.objectContaining({ name: 'Test1' }));
    });

    it('should throw an error if the game feature does not exist', async () => {
      await expect(featuresService.remove(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAll', () => {
    it('should remove all game features', async () => {
      await featuresService.removeAll();
      const gameFeatures = await featuresService.getAll('name', 'ASC');
      expect(gameFeatures.length).toEqual(0);
    });
  });
});
