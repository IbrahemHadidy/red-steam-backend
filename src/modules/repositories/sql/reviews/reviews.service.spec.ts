import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig } from '@test/integration-setup';
import { randomUUID } from 'crypto';

// Modules
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { GamesLanguagesModule } from '@repositories/sql/games-languages/games-languages.module';
import { GamesPricingModule } from '@repositories/sql/games-pricing/games-pricing.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';
import { UsersModule } from '@repositories/sql/users/users.module';

// Services
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesService } from '@repositories/sql/games/games.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { UsersService } from '@repositories/sql/users/users.service';

// Entities
import { Game } from '@repositories/sql/games/game.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';

describe('gamesService', () => {
  let game: Game;
  let game2: Game;
  let game3: Game;
  let user: User;
  let user2: User;
  let user3: User;
  let review: Review;
  let review2: Review;
  let review3: Review;
  let review4: Review;
  let gamesService: GamesService;
  let usersService: UsersService;
  let reviewsService: ReviewsService;

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
        UsersModule,
        ReviewsModule,
      ],
      providers: [
        GamesPricingService,
        GamesService,
        CompaniesService,
        GamesFeaturesService,
        GamesLanguagesService,
        GamesTagsService,
        UsersService,
        ReviewsService,
        Logger,
      ],
    }).compile();

    gamesService = module.get<GamesService>(GamesService);
    usersService = module.get<UsersService>(UsersService);
    reviewsService = module.get<ReviewsService>(ReviewsService);

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

    game3 = await gamesService.create({
      name: 'Test Game3',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2022-01-03'),
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

    user = await usersService.create({
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      country: 'test',
    });

    user2 = await usersService.create({
      username: 'test2',
      email: 'test2@test.com',
      password: 'password',
      country: 'test',
    });

    user3 = await usersService.create({
      username: 'test3',
      email: 'test3@test.com',
      password: 'password',
      country: 'test',
    });

    review = await reviewsService.create({
      userId: user.id,
      gameId: game.id,
      positive: true,
      content: 'Test Content',
    });

    review2 = await reviewsService.create({
      userId: user.id,
      gameId: game2.id,
      positive: false,
      content: 'Test Content 2',
    });

    review3 = await reviewsService.create({
      userId: user2.id,
      gameId: game.id,
      positive: false,
      content: 'Test Content 3',
    });

    review4 = await reviewsService.create({
      userId: user2.id,
      gameId: game2.id,
      positive: true,
      content: 'Test Content 4',
    });
  });

  afterEach(async () => {
    await reviewsService.removeAll();
    await gamesService.removeAll();
    await usersService.removeAll();
  });

  describe('getAll', () => {
    it('should return all reviews', async () => {
      const reviews = await reviewsService.getAll('date', 'DESC');

      // Assertions
      expect(reviews.length).toBe(4);
    });
  });

  describe('getAllPositive', () => {
    it('should return all positive reviews', async () => {
      const reviews = await reviewsService.getAllPositive('date', 'DESC');

      // Assertions
      expect(reviews.length).toBe(2);
    });
  });

  describe('getAllNegative', () => {
    it('should return all negative reviews', async () => {
      const reviews = await reviewsService.getAllNegative('date', 'DESC');

      // Assertions
      expect(reviews.length).toBe(2);
    });
  });

  describe('getById', () => {
    it('should return review by id', async () => {
      const result = await reviewsService.getById(review.id);

      // Assertions
      expect(result.id).toBe(review.id);
    });

    it('should throw NotFoundException if review does not exist', async () => {
      await expect(reviewsService.getById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByGameId', () => {
    it('should return all reviews by game id', async () => {
      const result = await reviewsService.getByGameId(game.id, 'all', 'newest');

      // Assertions
      expect(result.length).toBe(2);
    });

    it('should return all positive reviews by game id', async () => {
      const result = await reviewsService.getByGameId(game.id, 'positive', 'newest');

      // Assertions
      expect(result.length).toBe(1);
    });

    it('should return all negative reviews by game id', async () => {
      const result = await reviewsService.getByGameId(game.id, 'negative', 'newest');

      // Assertions
      expect(result.length).toBe(1);
    });
  });

  describe('getByUserId', () => {
    it('should return all reviews by user id', async () => {
      const result = await reviewsService.getByUserId(user.id, 'all', 'newest');

      // Assertions
      expect(result.length).toBe(2);
    });

    it('should return all positive reviews by user id', async () => {
      const result = await reviewsService.getByUserId(user.id, 'positive', 'newest');

      // Assertions
      expect(result.length).toBe(1);
    });

    it('should return all negative reviews by user id', async () => {
      const result = await reviewsService.getByUserId(user.id, 'negative', 'newest');

      // Assertions
      expect(result.length).toBe(1);
    });
  });

  describe('getReviewsPaginated', () => {
    it('should return an array of game reviews sorted by id', async () => {
      const reviews = await reviewsService.getReviewsPaginated(0, 10, 'id', 'ASC');
      expect(reviews.items.length).toEqual(4);
      expect(reviews.items[0].id).toEqual(review.id);
      expect(reviews.items[1].id).toEqual(review2.id);
      expect(reviews.items[2].id).toEqual(review3.id);
      expect(reviews.items[3].id).toEqual(review4.id);
    });

    it('should return an array of game reviews sorted by username', async () => {
      const reviews = await reviewsService.getReviewsPaginated(0, 10, 'username', 'ASC');
      expect(reviews.items.length).toEqual(4);
      expect(reviews.items[0].user.username).toEqual('test');
      expect(reviews.items[1].user.username).toEqual('test');
      expect(reviews.items[2].user.username).toEqual('test2');
      expect(reviews.items[3].user.username).toEqual('test2');
    });

    it('should return an array of game reviews sorted by gameName', async () => {
      const reviews = await reviewsService.getReviewsPaginated(0, 10, 'gameName', 'ASC');
      expect(reviews.items.length).toEqual(4);
      expect(reviews.items[0].game.name).toEqual('Test Game');
      expect(reviews.items[1].game.name).toEqual('Test Game');
      expect(reviews.items[2].game.name).toEqual('Test Game2');
      expect(reviews.items[3].game.name).toEqual('Test Game2');
    });

    it('should return an array of game reviews sorted by positive', async () => {
      const reviews = await reviewsService.getReviewsPaginated(0, 10, 'rating', 'ASC');
      expect(reviews.items.length).toEqual(4);
      expect(reviews.items[2].positive).toEqual(true);
      expect(reviews.items[3].positive).toEqual(true);
      expect(reviews.items[0].positive).toEqual(false);
      expect(reviews.items[1].positive).toEqual(false);
    });

    it('should return values with the given search', async () => {
      const reviews = await reviewsService.getReviewsPaginated(0, 10, 'content', 'ASC', { content: 'Test Content 3' });
      expect(reviews.items.length).toEqual(1);
      expect(reviews.items[0].content).toEqual('Test Content 3');
    });
  });

  describe('create', () => {
    it('should create a review', async () => {
      const result = await reviewsService.create({
        userId: user3.id,
        gameId: game3.id,
        positive: true,
        content: 'Test Content',
      });

      // Assertions
      expect(result.id).toBeDefined();
    });

    it('should throw ConflictException if user already reviewed the game', async () => {
      await expect(
        reviewsService.create({
          userId: user.id,
          gameId: game.id,
          positive: true,
          content: 'Test Content',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const result = await reviewsService.update(review2.id, {
        positive: true,
        content: 'Test Content Updated',
      });

      // Assertions
      expect(result.content).toBe('Test Content Updated');
      expect(result.positive).toBe(true);
    });

    it('should throw NotFoundException if review does not exist', async () => {
      await expect(
        reviewsService.update(999, {
          positive: true,
          content: 'Test Content Updated',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      const result = await reviewsService.remove(review3.id);
      const result2 = await reviewsService.remove(review4.id);

      // Assertions
      expect(result).toEqual(expect.objectContaining({ id: review3.id, content: 'Test Content 3', positive: false }));
      expect(result2).toEqual(expect.objectContaining({ id: review4.id, content: 'Test Content 4', positive: true }));
    });

    it('should throw NotFoundException if review does not exist', async () => {
      await expect(reviewsService.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAllUserReviews', () => {
    it('should remove all reviews by user', async () => {
      await reviewsService.removeAllUserReviews(user.id);
      const allReviews = await reviewsService.getByUserId(user.id, 'all', 'newest');

      // Assertions
      expect(allReviews).toEqual([]);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      await expect(reviewsService.removeAllUserReviews(randomUUID())).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAllGameReviews', () => {
    it('should remove all reviews by game', async () => {
      await reviewsService.removeAllGameReviews(game.id);
      const allReviews = await reviewsService.getByGameId(game.id, 'all', 'newest');

      // Assertions
      expect(allReviews).toEqual([]);
    });

    it('should throw NotFoundException if game does not exist', async () => {
      await expect(reviewsService.removeAllGameReviews(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAll', () => {
    it('should remove all reviews', async () => {
      await reviewsService.removeAll();
      const allReviews = await reviewsService.getAll('date', 'DESC');

      // Assertions
      expect(allReviews).toEqual([]);
    });
  });
});
