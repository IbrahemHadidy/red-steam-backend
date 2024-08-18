import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as UUIDv4 } from 'uuid';
import { environmentConfig, getMongoTypeOrmConfig } from '@test/integration-setup';

import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';

describe('TokenBlacklistService', () => {
  let token: string;
  let tokenBlacklistService: TokenBlacklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(environmentConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'mongo',
          useFactory: async (configService: ConfigService) => getMongoTypeOrmConfig(configService),
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
