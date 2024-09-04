import { BadRequestException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig, getMongoTypeOrmConfig } from '@test/integration-setup';

// Modules
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { NodeMailerModule } from '@services/node-mailer/node-mailer.module';

// Services
import { AuthService } from '@apis/user/auth/auth.service';
import { PaymentService } from '@apis/user/payment/payment.service';
import { DropboxService } from '@services/dropbox/dropbox.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { PaypalService } from '@services/paypal/paypal.service';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { UsersService } from '@repositories/sql/users/users.service';
import { GamesService } from '@repositories/sql/games/games.service';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';

// Entities
import { Game } from '@repositories/sql/games/game.entity';
import { User } from '@repositories/sql/users/user.entity';

describe('PaymentService', () => {
  let data: { userData: User; refreshToken: string; accessToken: string; message?: string };
  let game1: Game;
  let game2: Game;
  let authService: AuthService;
  let paymentService: PaymentService;
  let usersService: UsersService;
  let gamesService: GamesService;
  let tokenBlacklistService: TokenBlacklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(environmentConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'sql',
          useFactory: async (configService: ConfigService) => getSqlTypeOrmConfig(configService),
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => getMongoTypeOrmConfig(configService),
        }),
        UsersModule,
        GamesTagsModule,
        NodeMailerModule,
        TokenBlacklistModule,
        ReviewsModule,
      ],
      providers: [
        AuthService,
        PaypalService,
        CompaniesService,
        GamesFeaturesService,
        GamesLanguagesService,
        GamesPricingService,
        GamesTagsService,
        PaymentService,
        JwtService,
        UsersService,
        GamesService,
        NodeMailerService,
        ConfigService,
        TokenBlacklistService,
        DropboxService,
        Logger,
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    gamesService = module.get<GamesService>(GamesService);
    tokenBlacklistService = module.get<TokenBlacklistService>(TokenBlacklistService);
    paymentService = module.get<PaymentService>(PaymentService);
    authService = module.get<AuthService>(AuthService);

    // register a user and login to get data sample for testing
    await authService.signup({
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      country: 'test',
    });
    data = await authService.login({
      identifier: 'test',
      password: 'password',
      rememberMe: true,
    });
    await usersService.verify(data.userData.id);
    data = await authService.login({
      identifier: 'test',
      password: 'password',
      rememberMe: true,
    });

    game1 = await gamesService.create({
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
        price: 5,
      },
      gamesFeatures: [],
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
      featured: false
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
        price: 5,
      },
      gamesFeatures: [],
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
      featured: false
    });
  });

  afterEach(async () => {
    await usersService.removeAll();
    await gamesService.removeAll();
    await tokenBlacklistService.clearAll();
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      // Call createOrder function
      const result = await paymentService.createOrder({
        userId: data.userData.id,
        totalPrice: 10.0,
        cartItems: [game1.id, game2.id],
      });

      // Assertions
      expect(result).toEqual({
        orderId: expect.any(String),
        approvalUrl: expect.any(String),
        orderData: {
          userId: data.userData.id,
          totalPrice: 10.0,
          cartItems: [game1.id, game2.id],
        },
      });
    });

    it('should throw an BadRequestException if some games are in library', async () => {
      // Add games to library
      await usersService.addItemsToLibrary(data.userData.id, [game1.id]);
      // Call createOrder function
      await expect(
        paymentService.createOrder({
          userId: data.userData.id,
          totalPrice: 10.0,
          cartItems: [game1.id, game2.id],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('captureOrder', () => {
    it('should capture an order successfully', async () => {
      // Create an order
      const order = await paymentService.createOrder({
        userId: data.userData.id,
        totalPrice: 10.0,
        cartItems: [game1.id, game2.id],
      });

      // Get approval URL
      const approvalUrl = order.approvalUrl;

      // Log the approval URL and wait for manual approval
      console.log(
        '\x1b[33m%s\x1b[0m',
        `
                \x1b[33m╔═══════════════════════════════════════════════════════════════════════╗
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mPlease manually approve the order by visiting the following URL:\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ║  \x1b[34m\x1b[1m${approvalUrl}\x1b[0m\x1b[33m   ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[4mUse the following credentials for approval:\x1b[0m\x1b[33m                          ║
                ║  \x1b[1mBuyer Email:\x1b[0m \x1b[32msb-gc21b29998568@business.example.com\x1b[33m                   ║
                ║  \x1b[1mBuyer Password:\x1b[0m \x1b[32m';>7GL;d\x1b[33m                                             ║
                ║                                                                       ║
                ║  \x1b[1m\x1b[31mYou have 1 minute to approve the order, else the test will fail.\x1b[0m\x1b[33m     ║
                ║                                                                       ║
                ╚═══════════════════════════════════════════════════════════════════════╝\x1b[0m
        `,
      );

      // Wait for manual approval (adjust the timeout as necessary)
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 1 minute

      // Call captureOrder function
      const result = await paymentService.captureOrder({
        orderId: order.orderId,
        userId: data.userData.id,
        cartItems: [game1.id, game2.id],
      });

      // Assertions
      expect(result).toEqual({
        status: expect.any(String),
        orderId: expect.any(String),
        payerName: expect.any(String),
      });
    }, 90000);
  });
});
