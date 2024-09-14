import { Logger, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig } from '@test/integration-setup';

// Modules
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
import { SearchService } from '@repositories/sql/games/search.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { UsersService } from '@repositories/sql/users/users.service';
import { DropboxService } from '@services/dropbox/dropbox.service';

// Entities
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GameLanguage } from '@repositories/sql/games-languages/game-language.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { Game } from '@repositories/sql/games/game.entity';
import { User } from '@repositories/sql/users/user.entity';

describe('GameService', () => {
  let searchService: SearchService;
  let gamesService: GamesService;
  let usersService: UsersService;
  let companiesService: CompaniesService;
  let gamesFeaturesService: GamesFeaturesService;
  let gamesLanguagesService: GamesLanguagesService;
  let gamesTagsService: GamesTagsService;
  let reviewsService: ReviewsService;

  let game1: Game;
  let game2: Game;
  let game3: Game;
  let game4: Game;
  let game5: Game;
  let game6: Game;

  let user1: User;
  let user2: User;
  let user3: User;
  let user4: User;
  let user5: User;
  let user6: User;

  let dev1: Developer;
  let dev2: Developer;
  let dev3: Developer;
  let dev4: Developer;
  let dev5: Developer;
  let dev6: Developer;

  let pub1: Publisher;
  let pub2: Publisher;
  let pub3: Publisher;
  let pub4: Publisher;
  let pub5: Publisher;
  let pub6: Publisher;

  let feature1: GameFeature;
  let feature2: GameFeature;
  let feature3: GameFeature;
  let feature4: GameFeature;
  let feature5: GameFeature;
  let feature6: GameFeature;

  let language1: GameLanguage;
  let language2: GameLanguage;
  let language3: GameLanguage;
  let language4: GameLanguage;
  let language5: GameLanguage;
  let language6: GameLanguage;

  let tag1: GameTag;
  let tag2: GameTag;
  let tag3: GameTag;
  let tag4: GameTag;
  let tag5: GameTag;
  let tag6: GameTag;
  let tag7: GameTag;
  let tag8: GameTag;
  let tag9: GameTag;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(environmentConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'sql',
          useFactory: async (configService: ConfigService) => getSqlTypeOrmConfig(configService),
        }),
        UsersModule,
        GamesModule,
        ReviewsModule,
      ],
      providers: [
        SearchService,
        UsersService,
        GamesService,
        CompaniesService,
        GamesFeaturesService,
        GamesPricingService,
        GamesTagsService,
        GamesLanguagesService,
        ReviewsService,
        DropboxService,
        Logger,
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    usersService = module.get<UsersService>(UsersService);
    gamesService = module.get<GamesService>(GamesService);
    gamesFeaturesService = module.get<GamesFeaturesService>(GamesFeaturesService);
    gamesLanguagesService = module.get<GamesLanguagesService>(GamesLanguagesService);
    gamesTagsService = module.get<GamesTagsService>(GamesTagsService);
    companiesService = module.get<CompaniesService>(CompaniesService);
    reviewsService = module.get<ReviewsService>(ReviewsService);

    // Create some test users
    user1 = await usersService.create({
      username: 'test user 1',
      email: 'test@test.com',
      password: 'password',
      country: 'test',
    });

    user2 = await usersService.create({
      username: 'test user 2',
      email: 'test2@test.com',
      password: 'password',
      country: 'test',
    });

    user3 = await usersService.create({
      username: 'test user 3',
      email: 'test3@test.com',
      password: 'password',
      country: 'test',
    });

    user4 = await usersService.create({
      username: 'test user 4',
      email: 'test4@test.com',
      password: 'password',
      country: 'test',
    });

    user5 = await usersService.create({
      username: 'test user 5',
      email: 'test5@test.com',
      password: 'password',
      country: 'test',
    });

    user6 = await usersService.create({
      username: 'test user 6',
      email: 'test6@test.com',
      password: 'password',
      country: 'test',
    });

    // Create some test tags
    tag1 = await gamesTagsService.create('Test Tag 1');
    tag2 = await gamesTagsService.create('Test Tag 2');
    tag3 = await gamesTagsService.create('Test Tag 3');
    tag4 = await gamesTagsService.create('Test Tag 4');
    tag5 = await gamesTagsService.create('Test Tag 5');
    tag6 = await gamesTagsService.create('Test Tag 6');
    tag7 = await gamesTagsService.create('Test Tag 7');
    tag8 = await gamesTagsService.create('Test Tag 8');
    tag9 = await gamesTagsService.create('Test Tag 9');

    // Create some test developers
    dev1 = await companiesService.create(
      {
        name: 'Test Developer 1',
        website: 'https://test1.com',
      },
      'developer',
    );

    dev2 = await companiesService.create(
      {
        name: 'Test Developer 2',
        website: 'https://test2.com',
      },
      'developer',
    );

    dev3 = await companiesService.create(
      {
        name: 'Test Developer 3',
        website: 'https://test3.com',
      },
      'developer',
    );

    dev4 = await companiesService.create(
      {
        name: 'Test Developer 4',
        website: 'https://test4.com',
      },
      'developer',
    );

    dev5 = await companiesService.create(
      {
        name: 'Test Developer 5',
        website: 'https://test5.com',
      },
      'developer',
    );

    dev6 = await companiesService.create(
      {
        name: 'Test Developer 6',
        website: 'https://test6.com',
      },
      'developer',
    );

    // Create some test publishers
    pub1 = await companiesService.create(
      {
        name: 'Test Publisher 1',
        website: 'https://test1.com',
      },
      'publisher',
    );

    pub2 = await companiesService.create(
      {
        name: 'Test Publisher 2',
        website: 'https://test2.com',
      },
      'publisher',
    );

    pub3 = await companiesService.create(
      {
        name: 'Test Publisher 3',
        website: 'https://test3.com',
      },
      'publisher',
    );

    pub4 = await companiesService.create(
      {
        name: 'Test Publisher 4',
        website: 'https://test4.com',
      },
      'publisher',
    );

    pub5 = await companiesService.create(
      {
        name: 'Test Publisher 5',
        website: 'https://test5.com',
      },
      'publisher',
    );

    pub6 = await companiesService.create(
      {
        name: 'Test Publisher 6',
        website: 'https://test6.com',
      },
      'publisher',
    );

    // Create some test game features
    feature1 = await gamesFeaturesService.create({
      name: 'Test Feature 1',
      icon: Buffer.from('test icon 1', 'utf-8'),
    });

    feature2 = await gamesFeaturesService.create({
      name: 'Test Feature 2',
      icon: Buffer.from('test icon 2', 'utf-8'),
    });

    feature3 = await gamesFeaturesService.create({
      name: 'Test Feature 3',
      icon: Buffer.from('test icon 3', 'utf-8'),
    });

    feature4 = await gamesFeaturesService.create({
      name: 'Test Feature 4',
      icon: Buffer.from('test icon 4', 'utf-8'),
    });

    feature5 = await gamesFeaturesService.create({
      name: 'Test Feature 5',
      icon: Buffer.from('test icon 5', 'utf-8'),
    });

    feature6 = await gamesFeaturesService.create({
      name: 'Test Feature 6',
      icon: Buffer.from('test icon 6', 'utf-8'),
    });

    // Create some languages
    language1 = await gamesLanguagesService.create('Test Language 1');
    language2 = await gamesLanguagesService.create('Test Language 2');
    language3 = await gamesLanguagesService.create('Test Language 3');
    language4 = await gamesLanguagesService.create('Test Language 4');
    language5 = await gamesLanguagesService.create('Test Language 5');
    language6 = await gamesLanguagesService.create('Test Language 6');

    // Create some test games
    game1 = await gamesService.create({
      name: 'Test Game 1',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2022-01-01'),
      publishers: [pub1.id, pub2.id],
      developers: [dev1.id, dev2.id],
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
      tags: [tag1.id, tag2.id, tag3.id],
      pricing: {
        free: false,
        discount: false,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-10-30'),
        offerType: 'SPECIAL PROMOTION',
      },
      gamesFeatures: [feature1.id, feature2.id, feature3.id, feature4.id],
      languages: [
        { name: language1.name, interface: true, fullAudio: true, subtitles: true },
        { name: language2.name, interface: true, fullAudio: true, subtitles: true },
        { name: language3.name, interface: true, fullAudio: true, subtitles: true },
        { name: language4.name, interface: true, fullAudio: true, subtitles: true },
        { name: language5.name, interface: true, fullAudio: true, subtitles: true },
        { name: language6.name, interface: true, fullAudio: true, subtitles: true },
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
    });

    game2 = await gamesService.create({
      name: 'Test Game 2',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2022-01-02'),
      publishers: [pub2.id, pub3.id],
      developers: [dev2.id, dev3.id],
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
      tags: [tag1.id, tag2.id, tag3.id, tag7.id],
      pricing: {
        free: false,
        discount: false,
        basePrice: 10,
        discountPrice: 5,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-11-30'),
        offerType: 'WEEKEND DEAL',
      },
      gamesFeatures: [feature2.id, feature3.id, feature4.id, feature5.id],
      languages: [
        { name: language1.name, interface: true, fullAudio: true, subtitles: true },
        { name: language2.name, interface: true, fullAudio: true, subtitles: false },
        { name: language3.name, interface: true, fullAudio: false, subtitles: true },
        { name: language6.name, interface: true, fullAudio: true, subtitles: true },
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
    });

    game3 = await gamesService.create({
      name: 'Test Game 3',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2023-05-12'),
      publishers: [pub3.id, pub4.id],
      developers: [dev3.id, dev4.id],
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
      tags: [tag6.id, tag2.id, tag3.id],
      pricing: {
        free: false,
        discount: true,
        basePrice: 50,
        discountPrice: 15,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-11-30'),
        offerType: 'WEEKEND DEAL',
      },
      gamesFeatures: [feature5.id, feature6.id, feature4.id, feature3.id],
      languages: [
        { name: language1.name, interface: true, fullAudio: true, subtitles: true },
        { name: language2.name, interface: true, fullAudio: true, subtitles: true },
        { name: language3.name, interface: true, fullAudio: true, subtitles: true },
        { name: language4.name, interface: true, fullAudio: true, subtitles: true },
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
    });

    game4 = await gamesService.create({
      name: 'Test Game 4',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2023-11-12'),
      publishers: [pub4.id, pub5.id],
      developers: [dev4.id, dev5.id],
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
      tags: [tag5.id, tag3.id, tag6.id, tag8.id],
      pricing: {
        free: false,
        discount: false,
        basePrice: 50,
        discountPrice: 15,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-11-30'),
        offerType: 'WEEKEND DEAL',
      },
      gamesFeatures: [feature2.id, feature3.id, feature4.id],
      languages: [
        { name: language1.name, interface: true, fullAudio: true, subtitles: true },
        { name: language4.name, interface: true, fullAudio: true, subtitles: false },
        { name: language5.name, interface: true, fullAudio: false, subtitles: true },
        { name: language6.name, interface: true, fullAudio: false, subtitles: true },
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
    });

    game5 = await gamesService.create({
      name: 'Test Game 5',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2024-01-22'),
      publishers: [pub5.id, pub6.id],
      developers: [dev5.id, dev6.id],
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
      tags: [tag1.id, tag2.id, tag3.id, tag4.id, tag5.id, tag6.id],
      pricing: {
        free: false,
        discount: true,
        basePrice: 80,
        discountPrice: 35,
        discountStartDate: new Date(),
        discountEndDate: new Date('2024-11-30'),
        offerType: 'SPECIAL PROMOTION',
      },
      gamesFeatures: [feature1.id, feature5.id, feature3.id, feature6.id],
      languages: [
        { name: language6.name, interface: true, fullAudio: true, subtitles: true },
        { name: language5.name, interface: true, fullAudio: true, subtitles: true },
        { name: language4.name, interface: true, fullAudio: false, subtitles: true },
      ],
      platformEntries: {
        win: true,
        mac: true,
      },
      link: 'Test Link',
      about: 'Test About',
      mature: true,
      matureDescription: 'Test Mature Description',
      systemRequirements: {
        mini: {},
        recommended: {},
      },
      legal: 'Test Legal',
    });

    game6 = await gamesService.create({
      name: 'Test Game 6',
      category: 'Test Category',
      description: 'Test Description',
      releaseDate: new Date('2024-05-22'),
      featured: false,
      publishers: [pub1.id, pub2.id],
      developers: [dev1.id, dev2.id],
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
      tags: [tag1.id, tag2.id, tag3.id, tag4.id, tag9.id],
      pricing: {
        free: true,
      },
      gamesFeatures: [feature2.id, feature3.id, feature4.id],
      languages: [{ name: language1.name, interface: true, fullAudio: true, subtitles: true }],
      platformEntries: {
        win: true,
        mac: true,
      },
      link: 'Test Link',
      about: 'Test About',
      mature: true,
      matureDescription: 'Test Mature Description',
      systemRequirements: {
        mini: {},
        recommended: {},
      },
      legal: 'Test Legal',
    });

    // update game 6 to be featured
    game6 = await gamesService.update(game6.id, { featured: true });

    // Create some test reviews
    // game 1 has 3 reviews (1 positive, 2 negative)
    await reviewsService.create({
      userId: user1.id,
      gameId: game1.id,
      positive: true,
      content: 'Test Content 1',
    });

    await reviewsService.create({
      userId: user2.id,
      gameId: game1.id,
      positive: false,
      content: 'Test Content 2',
    });

    await reviewsService.create({
      userId: user3.id,
      gameId: game1.id,
      positive: false,
      content: 'Test Content 3',
    });

    // game 2 has 6 reviews (3 positive, 3 negative)
    await reviewsService.create({
      userId: user1.id,
      gameId: game2.id,
      positive: true,
      content: 'Test Content 1',
    });

    await reviewsService.create({
      userId: user2.id,
      gameId: game2.id,
      positive: true,
      content: 'Test Content 4',
    });

    await reviewsService.create({
      userId: user3.id,
      gameId: game2.id,
      positive: true,
      content: 'Test Content 5',
    });

    await reviewsService.create({
      userId: user4.id,
      gameId: game2.id,
      positive: false,
      content: 'Test Content 6',
    });

    await reviewsService.create({
      userId: user5.id,
      gameId: game2.id,
      positive: false,
      content: 'Test Content 7',
    });

    await reviewsService.create({
      userId: user6.id,
      gameId: game2.id,
      positive: false,
      content: 'Test Content 8',
    });

    // game 3 has 0 reviews

    // game 4 has 1 review (1 positive)
    await reviewsService.create({
      userId: user1.id,
      gameId: game4.id,
      positive: true,
      content: 'Test Content 1',
    });

    // game 5 has 2 reviews (2 positive)
    await reviewsService.create({
      userId: user1.id,
      gameId: game5.id,
      positive: true,
      content: 'Test Content 1',
    });

    await reviewsService.create({
      userId: user2.id,
      gameId: game5.id,
      positive: true,
      content: 'Test Content 2',
    });

    // game 6 has 5 reviews (3 positive, 2 negative)
    await reviewsService.create({
      userId: user1.id,
      gameId: game6.id,
      positive: true,
      content: 'Test Content 1',
    });

    await reviewsService.create({
      userId: user2.id,
      gameId: game6.id,
      positive: true,
      content: 'Test Content 2',
    });

    await reviewsService.create({
      userId: user3.id,
      gameId: game6.id,
      positive: true,
      content: 'Test Content 3',
    });

    await reviewsService.create({
      userId: user4.id,
      gameId: game6.id,
      positive: false,
      content: 'Test Content 4',
    });

    await reviewsService.create({
      userId: user5.id,
      gameId: game6.id,
      positive: false,
      content: 'Test Content 5',
    });
  });

  afterAll(async () => {
    await reviewsService.removeAll();
    await gamesService.removeAll();
    await usersService.removeAll();
    await gamesFeaturesService.removeAll();
    await gamesLanguagesService.removeAll();
    await gamesTagsService.removeAll();
    await companiesService.removeAll('developers');
    await companiesService.removeAll('publishers');
  });

  describe('getByPartialName', () => {
    it('should return 6 games with partial name', async () => {
      const games = await searchService.getByPartialName('Test Game');

      // Assertions
      expect(games.length).toBe(6);
    });
    it('should return 1 game with partial name', async () => {
      const games = await searchService.getByPartialName('Test Game 3');

      // Assertions
      expect(games.length).toBe(1);
      expect(games[0].name).toBe(game3.name);
    });

    it('throw NotFoundException when no games found', async () => {
      await expect(searchService.getByPartialName('No Game Found')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByParameters', () => {
    describe('searchData', () => {
      it('should return games filtered by partial name', async () => {
        const games = await searchService.getByParameters({ partialName: 'Test Game' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.name.includes('Test Game'))).toBe(true);
      });

      it('should return games filtered by max price', async () => {
        const games = await searchService.getByParameters({ maxPrice: 40 });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        const gamePrice = (game: Game) => {
          const pricing = game.pricing;
          if (pricing.discount) {
            return pricing.discountPrice;
          } else {
            return pricing.basePrice;
          }
        };
        expect(games.every((game) => gamePrice(game) <= 40)).toBe(true);
      });

      it('should return games filtered by tags', async () => {
        const games = await searchService.getByParameters({ tags: [tag1.id, tag2.id] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.tags.some((tag) => [tag1.name, tag2.name].includes(tag.name)))).toBe(true);
      });

      it('should return games filtered by excluded tags', async () => {
        const games = await searchService.getByParameters({ excludeTags: [tag1.id, tag2.id] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => !game.tags.some((tag) => [tag1.name, tag2.name].includes(tag.name)))).toBe(true);
      });

      it('should return games filtered by paid games', async () => {
        const games = await searchService.getByParameters({ paid: true });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.pricing.free === false)).toBe(true);
      });

      it('should return games filtered by offers', async () => {
        const games = await searchService.getByParameters({ offers: true });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.pricing.discount === true)).toBe(true);
      });

      it('should return games filtered by platform', async () => {
        const games = await searchService.getByParameters({ platforms: ['win'] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.platformEntries.win)).toBe(true);
      });

      it('should return games filtered by publishers', async () => {
        const games = await searchService.getByParameters({ publishers: [pub1.id] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.publishers.some((pub) => pub.name === pub1.name))).toBe(true);
      });

      it('should return games filtered by developers', async () => {
        const games = await searchService.getByParameters({ developers: [dev1.id] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.developers.some((dev) => dev.name === dev1.name))).toBe(true);
      });

      it('should return ganes filtered by games features', async () => {
        const games = await searchService.getByParameters({ features: [feature1.id] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.gamesFeatures.some((feature) => feature.name === feature1.name))).toBe(true);
      });

      it('should return games filtered by games languages', async () => {
        const games = await searchService.getByParameters({ languages: [language1.id] });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.languages.some((lang) => lang.name === language1.name))).toBe(true);
      });

      it('should return games filtered by featured games', async () => {
        const games = await searchService.getByParameters({ featured: true });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.featured === true)).toBe(true);
      });

      it('should return games with mature games excluded', async () => {
        const games = await searchService.getByParameters({ excludeMature: true });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(games.every((game) => game.mature === false)).toBe(true);
      });

      it('should return games filtered by multiple parameters', async () => {
        const games = await searchService.getByParameters({
          tags: [tag1.id, tag2.id],
          developers: [dev1.id],
          publishers: [pub1.id],
        });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        expect(
          games.every(
            (game) =>
              game.tags.some((tag) => tag.name === 'Test Tag 1') &&
              game.developers.some((dev) => dev.name === 'Test Developer 1') &&
              game.publishers.some((pub) => pub.name === 'Test Publisher 1'),
          ),
        ).toBe(true);
      });
    });

    describe('sorting', () => {
      it('should sort games by name', async () => {
        const games = await searchService.getByParameters({ sort: 'name' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        for (let i = 0; i < games.length - 1; i++) {
          expect(games[i].name.localeCompare(games[i + 1].name)).toBeLessThanOrEqual(0);
        }
      });

      it('should sort games by lowest price', async () => {
        const games = await searchService.getByParameters({ sort: 'lowestPrice' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        for (let i = 0; i < games.length - 1; i++) {
          expect(games[i].pricing.price).toBeLessThanOrEqual(games[i + 1].pricing.price);
        }
      });

      it('should sort games by highest price', async () => {
        const games = await searchService.getByParameters({ sort: 'highestPrice' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        for (let i = 0; i < games.length - 1; i++) {
          expect(games[i].pricing.price).toBeGreaterThanOrEqual(games[i + 1].pricing.price);
        }
      });

      it('should sort games by release date', async () => {
        const games = await searchService.getByParameters({ sort: 'releaseDate' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        for (let i = 0; i < games.length - 1; i++) {
          expect(games[i].releaseDate.getTime()).toBeGreaterThanOrEqual(games[i + 1].releaseDate.getTime());
        }
      });

      it('should sort games by reviews', async () => {
        const games = await searchService.getByParameters({ sort: 'reviews' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        for (let i = 0; i < games.length - 1; i++) {
          expect(games[i].averageRating).toBeGreaterThanOrEqual(games[i + 1].averageRating);
        }
      });

      it('should sort games by relevance', async () => {
        const games = await searchService.getByParameters({ sort: 'relevance' });

        // Assertions
        expect(games.length).toBeGreaterThan(0);
        for (let i = 0; i < games.length - 1; i++) {
          expect(games[i].reviewsCount).toBeGreaterThanOrEqual(games[i + 1].reviewsCount);
        }
      });
    });
  });

  describe('getByUserTags', () => {
    it('should return games by tags', async () => {
      // Add tags to games
      await gamesService.update(game1.id, { tags: [tag1.id] });
      await gamesService.update(game2.id, { tags: [tag1.id, tag2.id] });
      await gamesService.update(game3.id, { tags: [tag1.id, tag2.id, tag3.id] });
      await gamesService.update(game4.id, { tags: [tag1.id, tag2.id, tag3.id, tag4.id] });
      await gamesService.update(game5.id, { tags: [tag1.id, tag2.id, tag3.id, tag4.id, tag5.id] });
      await gamesService.update(game6.id, { tags: [tag1.id, tag2.id, tag3.id, tag4.id, tag5.id, tag6.id] });

      const result = await searchService.getByUserTags([tag1.id, tag2.id, tag3.id, tag4.id, tag5.id, tag6.id]);

      // Assertions
      expect(result).toHaveLength(6);
      expect(result[0].tags).toHaveLength(6); // game6 with 6 tags
      expect(result[1].tags).toHaveLength(5); // game5 with 5 tags
      expect(result[2].tags).toHaveLength(4); // game4 with 4 tags
      expect(result[3].tags).toHaveLength(3); // game3 with 3 tags
      expect(result[4].tags).toHaveLength(2); // game2 with 2 tags
      expect(result[5].tags).toHaveLength(1); // game1 with 1 tag
    });
  });
});
