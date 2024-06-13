import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { Game } from '@repositories/sql/games/game.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

describe('gamesTagsService', () => {
  let publisher1: Publisher;
  let publisher2: Publisher;
  let developer1: Developer;
  let developer2: Developer;
  let companiesService: CompaniesService;

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
        CompaniesModule,
      ],
      providers: [CompaniesService, Logger],
    }).compile();

    companiesService = module.get<CompaniesService>(CompaniesService);

    publisher1 = await companiesService.create(
      { name: 'publisher 1', website: 'https://www.publisher1.com' },
      'publisher',
    );
    publisher2 = await companiesService.create(
      { name: 'publisher 2', website: 'https://www.publisher2.com' },
      'publisher',
    );

    developer1 = await companiesService.create(
      { name: 'developer 1', website: 'https://www.developer1.com' },
      'developer',
    );
    developer2 = await companiesService.create(
      { name: 'developer 2', website: 'https://www.developer2.com' },
      'developer',
    );
  });

  afterEach(async () => {
    await companiesService.removeAll('developers');
    await companiesService.removeAll('publishers');
  });

  describe('getAll', () => {
    it('should return an array of publishers', async () => {
      const publishers = await companiesService.getAll('id', 'asc', 'publishers');
      expect(publishers.length).toEqual(2);
    });

    it('should return an array of developers', async () => {
      const developers = await companiesService.getAll('id', 'asc', 'developers');
      expect(developers.length).toEqual(2);
    });
  });

  describe('getById', () => {
    it('should return the publisher with the given id', async () => {
      const foundPublisher = await companiesService.getById(publisher1.id, 'publisher');
      expect(foundPublisher).toEqual(expect.objectContaining({ name: publisher1.name, website: publisher1.website }));
    });

    it('should return the developer with the given id', async () => {
      const foundDeveloper = await companiesService.getById(developer1.id, 'developer');
      expect(foundDeveloper).toEqual(expect.objectContaining({ name: developer1.name, website: developer1.website }));
    });
  });

  describe('getByName', () => {
    it('should return the publisher with the given name', async () => {
      const foundPublisher = await companiesService.getByName(publisher1.name, 'publisher');
      expect(foundPublisher).toEqual(expect.objectContaining({ name: publisher1.name, website: publisher1.website }));
    });

    it('should return the developer with the given name', async () => {
      const foundDeveloper = await companiesService.getByName(developer1.name, 'developer');
      expect(foundDeveloper).toEqual(expect.objectContaining({ name: developer1.name, website: developer1.website }));
    });
  });

  describe('create', () => {
    it('should create a new publisher', async () => {
      const createdPublisher = await companiesService.create(
        { name: 'publisher 3', website: 'https://www.publisher3.com' },
        'publisher',
      );
      expect(createdPublisher.name).toEqual('publisher 3');
    });

    it('should create a new developer', async () => {
      const createdDeveloper = await companiesService.create(
        { name: 'developer 3', website: 'https://www.developer3.com' },
        'developer',
      );
      expect(createdDeveloper.name).toEqual('developer 3');
    });

    it('should throw an error if the name already exists', async () => {
      await expect(
        companiesService.create({ name: 'publisher 1', website: 'https://www.publisher11.com' }, 'publisher'),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw an error if the website already exists', async () => {
      await expect(
        companiesService.create({ name: 'publisher 11', website: 'https://www.publisher1.com' }, 'publisher'),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw an error if website is not valid', async () => {
      await expect(
        companiesService.create({ name: 'publisher 11', website: 'www.publisher1.com' }, 'publisher'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update the name of the publisher with the given id', async () => {
      const updatedPublisher = await companiesService.update(publisher1.id, 'name', 'publisher 1 updated', 'publisher');
      expect(updatedPublisher.name).toEqual('publisher 1 updated');
    });

    it('should update the name of the developer with the given id', async () => {
      const updatedDeveloper = await companiesService.update(developer1.id, 'name', 'developer 1 updated', 'developer');
      expect(updatedDeveloper.name).toEqual('developer 1 updated');
    });

    it('should update the website of the publisher with the given id', async () => {
      const updatedPublisher = await companiesService.update(
        publisher1.id,
        'website',
        'https://www.publisher1updated.com',
        'publisher',
      );
      expect(updatedPublisher.website).toEqual('https://www.publisher1updated.com');
    });

    it('should update the website of the developer with the given id', async () => {
      const updatedDeveloper = await companiesService.update(
        developer1.id,
        'website',
        'https://www.developer1updated.com',
        'developer',
      );
      expect(updatedDeveloper.website).toEqual('https://www.developer1updated.com');
    });
  });

  describe('delete', () => {
    it('should delete the publisher with the given id', async () => {
      await companiesService.remove(publisher2.id, 'publisher');
      const publishers = await companiesService.getAll('id', 'asc', 'publishers');
      expect(publishers.length).toEqual(1);
    });

    it('should delete the developer with the given id', async () => {
      await companiesService.remove(developer2.id, 'developer');
      const developers = await companiesService.getAll('id', 'asc', 'developers');
      expect(developers.length).toEqual(1);
    });
  });

  describe('removeAll', () => {
    it('should remove all publishers', async () => {
      await companiesService.removeAll('publishers');
      const publishers = await companiesService.getAll('id', 'asc', 'publishers');
      expect(publishers.length).toEqual(0);
    });

    it('should remove all developers', async () => {
      await companiesService.removeAll('developers');
      const developers = await companiesService.getAll('id', 'asc', 'developers');
      expect(developers.length).toEqual(0);
    });
  });
});
