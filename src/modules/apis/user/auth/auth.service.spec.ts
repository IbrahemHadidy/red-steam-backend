import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Logger } from '@nestjs/common';
import { environmentConfig, getMongoTypeOrmConfig, getSqlTypeOrmConfig } from '@test/integration-setup';

// Modules
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { NodeMailerModule } from '@services/node-mailer/node-mailer.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';

// Services
import { AuthService } from '@apis/user/auth/auth.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { UsersService } from '@repositories/sql/users/users.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { GamesService } from '@repositories/sql/games/games.service';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesLanguagesService } from '@repositories/sql/games-languages/games-languages.service';

describe('AuthController', () => {
  let data: { message: string; accessToken: string; refreshToken: string; userData: any };
  let authService: AuthService;
  let usersService: UsersService;
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
        JwtService,
        UsersService,
        NodeMailerService,
        ConfigService,
        GamesService,
        GamesFeaturesService,
        GamesLanguagesService,
        GamesPricingService,
        CompaniesService,
        TokenBlacklistService,
        ReviewsService,
        Logger,
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    tokenBlacklistService = module.get<TokenBlacklistService>(TokenBlacklistService);
    authService = module.get<AuthService>(AuthService);

    // Register a user and login to get data sample for testing
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
  });

  afterEach(async () => {
    await usersService.removeAll();
    await tokenBlacklistService.clearAll();
  });

  describe('signup', () => {
    it('should create a new user and send verification email', async () => {
      // Call signup function
      const result = await authService.signup({
        username: 'test1',
        email: 'test1@test.com',
        password: 'password1',
        country: 'test1',
      });

      // Assert
      expect(result).toEqual({ message: 'Signup successful' });
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      // Call the login method
      const result = await authService.login({
        identifier: 'test',
        password: 'password',
        rememberMe: true,
      });

      // Assertions
      expect(result).toEqual(
        expect.objectContaining({
          userData: expect.objectContaining({
            country: 'test',
            email: 'test@test.com',
            username: 'test',
            // Add other properties you want to check for here
          }),
        }),
      );
    });
  });

  describe('autoLogin', () => {
    it('should auto login successfully with valid token', async () => {
      // Call the autoLogin method
      const result = await authService.autoLogin(data.userData.id);

      expect(result).toEqual({
        message: 'Auto login successful',
        userData: expect.objectContaining({
          country: 'test',
          email: 'test@test.com',
          username: 'test',
          // Add other properties you want to check for here
        }),
        accessToken: expect.stringMatching(/^Bearer .+$/),
      });
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      // Call the logout method
      const result = await authService.logout({
        userId: data.userData.id,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      // Assertions
      expect(result).toEqual({ message: 'Logout successful' });
    });
  });

  describe('refreshToken', () => {
    it('should refresh access token successfully', async () => {
      // Call the refreshToken method
      const result = await authService.refreshToken(data.userData.id);

      // Assert
      expect(result).toEqual({
        message: 'Refresh token successful',
        accessToken: expect.stringMatching(/^Bearer .+$/),
      });
    });
  });

  describe('getUserData', () => {
    it('should get user data successfully', async () => {
      // Call the getUserData method
      const result = await authService.getUserData(data.userData.id);

      // Assertions
      expect(result).toEqual({
        userData: expect.objectContaining({
          country: 'test',
          email: 'test@test.com',
          username: 'test',
          // Add other properties you want to check for here
        }),
      });
    });
  });

  describe('getVerificationStatus', () => {
    it('should get verification status successfully', async () => {
      // Define the identifier
      data.userData.identifier = data.userData.email || data.userData.username;

      // Call the getVerificationStatus method
      const result = await authService.getVerificationStatus(data.userData);

      // Assertions
      expect(result).toEqual({ verified: true });
    });
  });

  describe('resendVerificationToken', () => {
    it('should resend verification token successfully', async () => {
      // Call the resendVerificationToken method
      const result = await authService.resendVerificationToken(data.userData);

      // Fast-forward the timers
      jest.useFakeTimers();
      jest.runAllTimers();
      jest.useRealTimers();

      // Assertions
      expect(result).toEqual({ message: 'Verification email sent' });
    });

    it('should throw BadRequestException if user is already verified', async () => {
      // Call the resendVerificationToken method and expect it to throw BadRequestException
      await expect(authService.resendVerificationToken(data.userData)).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      // construct verify data
      const verifyData = {
        username: data.userData.username,
        email: data.userData.email,
        token: data.userData.verificationToken,
      };

      // Call the verifyEmail method
      const result = await authService.verifyEmail(verifyData);

      // Assertions
      expect(result).toEqual({ message: 'Email verified successfully' });
    });

    it('should throw BadRequestException if verification token is invalid', async () => {
      // construct verify data with fake verification token
      const verifyData = {
        username: data.userData.username,
        email: data.userData.email,
        token: 'invalid-token',
      };

      // Call the verifyEmail method and expect it to throw BadRequestException
      await expect(authService.verifyEmail(verifyData)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateTokens', () => {
    it('should update tokens successfully', async () => {
      // Call the updateTokens method
      const result = await authService.updateTokens({
        userId: data.userData.id,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      // Assertions
      expect(result).toEqual({
        accessToken: expect.stringMatching(/^Bearer .+$/),
        refreshToken: expect.stringMatching(/^Bearer .+$/),
      });
    });
  });

  describe('getWaitingTime', () => {
    it('should return waiting time in milliseconds', () => {
      // Call the method
      const result = authService.getWaitingTime();

      // Assert
      expect(result).toEqual({ waitingTime: 20 * 60 * 1000 });
    });
  });
});
