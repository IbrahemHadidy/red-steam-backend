import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { MailerModule } from '@nestjs-modules/mailer';
import { NodeMailerModule } from '@services/node-mailer/node-mailer.module';
import { GamesFeaturesModule } from '@repositories/sql/games-features/games-features.module';
import { GamesPricingModule } from '@repositories/sql/games-pricing/games-pricing.module';
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { GamesModule } from '@repositories/sql/games/games.module';

// Services
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { GamesService } from '@repositories/sql/games/games.service';

// Entities
import { Game } from '@repositories/sql/games/game.entity';
import { Review } from '@repositories/sql/reviews/review.entity';
import { User } from '@repositories/sql/users/user.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';

describe('NodeMailerService', () => {
  let mailer: NodeMailerService;
  let logger: Logger;
  let loggerSpy: jest.SpyInstance;
  
  let game: Game;
  let game2: Game;
  let gamesService: GamesService;

  beforeAll(async () => {
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
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: {
              service: 'gmail',
              host: 'smtp.gmail.com',
              secure: false, // Set to true if using SSL/TLS
              auth: {
                user: configService.get<string>('EMAIL_USER'),
                pass: configService.get<string>('EMAIL_PASSWORD'),
              },
            },
          }),
          inject: [ConfigService],
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
        NodeMailerModule,
      ],
      providers: [NodeMailerService, Logger, ConfigService,GamesPricingService, GamesService, CompaniesService, GamesFeaturesService, GamesTagsService, Logger],
    }).compile();

    gamesService = module.get<GamesService>(GamesService);
    mailer = module.get<NodeMailerService>(NodeMailerService);
    logger = module.get<Logger>(Logger);

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
  });

  beforeEach(() => {
    loggerSpy = jest.spyOn(logger, 'log');
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  describe('sendVerificationEmail', () => {
    it('should send the verification email', async () => {
      const email = 'w9GhsdgawtgkI@example.com';
      const username = 'testuser';
      const verificationToken = 'verificationToken';

      await mailer.sendVerificationEmail(email, username, verificationToken);
      expect(loggerSpy).toHaveBeenCalledWith(`Verification email sent to ${email}`);
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send the password reset email', async () => {
      const email = 'w9GhsdgawtgkI@example.com';
      const username = 'testuser';
      const resetToken = 'resetToken';

      await mailer.sendPasswordResetEmail(email, username, resetToken);
      expect(loggerSpy).toHaveBeenCalledWith(`Password reset email sent to ${email}`);
    });
  });

  describe('sendPaymentConfirmationEmail', () => {
    it('should send the payment confirmation email', async () => {
      const email = 'w9GhsdgawtgkI@example.com';
      const data = {
        orderId: 'paymentId',
        accountName: 'accountName',
        games: [game, game2],
      };

      await mailer.sendPaymentConfirmationEmail(email, data);
      expect(loggerSpy).toHaveBeenCalledWith(`Payment confirmation email sent to ${email}`);
    });
  });
});
