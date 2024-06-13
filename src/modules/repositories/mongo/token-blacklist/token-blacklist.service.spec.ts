import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { v4 as UUIDv4 } from 'uuid';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('TokenBlacklistService', () => {
  let token: string;
  let tokenBlacklistService: TokenBlacklistService;

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
          name: 'mongo',
          useFactory: async (configService: ConfigService) => ({
            type: 'mongodb',
            url: configService.get<string>('MONGODB_URI'),
            entities: [BlacklistedToken],
            synchronize: true,
            autoLoadEntities: true,
          }),
        }),
        TokenBlacklistModule,
      ],
      providers: [TokenBlacklistService, Logger],
    }).compile();

    tokenBlacklistService = module.get<TokenBlacklistService>(TokenBlacklistService);

    token = UUIDv4();
  });

  afterEach(async () => {
    await tokenBlacklistService.clearAll();
  });

  describe('blacklistToken', () => {
    it('should blacklist a token', async () => {
      await tokenBlacklistService.blacklistToken(token);

      const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);

      // Assertions
      expect(isBlacklisted).toBe(true);
    });

    it('should throw an error if the token already exists', async () => {
      // Add the token to the blacklist
      await tokenBlacklistService.blacklistToken(token);

      // Assertions
      await expect(tokenBlacklistService.blacklistToken(token)).rejects.toThrow(ConflictException);
    });
  });

  describe('isBlacklisted', () => {
    it('should return false if the token is not blacklisted', async () => {
      const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);

      // Assertions
      expect(isBlacklisted).toBe(false);
    });

    it('should return true if the token is blacklisted', async () => {
      // Add the token to the blacklist
      await tokenBlacklistService.blacklistToken(token);

      const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);

      // Assertions
      expect(isBlacklisted).toBe(true);
    });
  });

  describe('clearAll', () => {
    it('should clear all tokens from the blacklist', async () => {
      // Add the token to the blacklist
      await tokenBlacklistService.blacklistToken(token);

      // Clear all tokens
      await tokenBlacklistService.clearAll();

      // Assertions
      const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);
      expect(isBlacklisted).toBe(false);
    });
  });
});
