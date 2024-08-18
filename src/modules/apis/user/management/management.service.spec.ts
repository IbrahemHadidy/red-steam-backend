import fs from 'fs';
import path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, ConflictException, Logger, UnauthorizedException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@repositories/sql/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ManagementService } from '@apis/user/management/management.service';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { DropboxService } from '@services/dropbox/dropbox.service';
import { AuthService } from '@apis/user/auth/auth.service';
import { User } from '@repositories/sql/users/user.entity';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { NodeMailerModule } from '@services/node-mailer/node-mailer.module';
import { environmentConfig, getSqlTypeOrmConfig, getMongoTypeOrmConfig } from '@test/integration-setup';
import type { File } from '@nest-lab/fastify-multer';

describe('ManagementService', () => {
  let data: { userData: User; refreshToken: string; accessToken: string; message?: string };
  let authService: AuthService;
  let managementService: ManagementService;
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
        ManagementService,
        JwtService,
        UsersService,
        NodeMailerService,
        ConfigService,
        TokenBlacklistService,
        DropboxService,
        Logger,
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    tokenBlacklistService = module.get<TokenBlacklistService>(TokenBlacklistService);
    managementService = module.get<ManagementService>(ManagementService);
    authService = module.get<AuthService>(AuthService);

    // register a user and login to get data sample for testing
    await authService.signup({
      username: 'test',
      email: 'testuser3@me.com',
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

  describe('checkEmailExists', () => {
    it('should return true if email exists', async () => {
      // Call the checkEmailExists method
      const result = await managementService.checkEmailExists({ email: data.userData.email });

      // Assert
      expect(result).toEqual({ exists: true, message: 'Email already exists' });
    });

    it('should return false if email does not exist', async () => {
      // Call the checkEmailExists method
      const result = await managementService.checkEmailExists({ email: 'non-existing-email' });

      // Assert
      expect(result).toEqual({ exists: false, message: 'Email available' });
    });
  });

  describe('checkUsernameExists', () => {
    it('should return true if username exists', async () => {
      // Call the checkUsernameExists method
      const result = await managementService.checkUsernameExists({ username: data.userData.username });

      // Assert
      expect(result).toEqual({ exists: true, message: 'Username already exists' });
    });

    it('should return false if username does not exist', async () => {
      // Call the checkUsernameExists method
      const result = await managementService.checkUsernameExists({ username: 'non-existing-username' });

      // Assert
      expect(result).toEqual({ exists: false, message: 'Username available' });
    });
  });

  describe('changeUsername', () => {
    it('should change username successfully and return true', async () => {
      // Call the changeUsername method
      const result = await managementService.changeUsername({
        userId: data.userData.id,
        password: 'password',
        newUsername: 'new-username',
      });

      // Assert
      expect(result).toEqual({ message: 'Username changed successfully' });
    });

    it('should throw a bad request error if new username is the same as the old one', async () => {
      // Call the changeUsername method with username that already exists
      await expect(managementService.changeUsername({
        userId: data.userData.id,
        password: 'password',
        newUsername: data.userData.username,
      })).rejects.toThrow(BadRequestException);
    });

    it('should throw an conflict error if new username already exists', async () => {
      // Create a new user with username 'new-username'
      await authService.signup({
        username: 'new-username',
        email: 'new-email@test.com',
        password: 'password',
        country: 'TS',
      });

      // Call the changeUsername method with username 'new-username' that already exists
      await expect(managementService.changeUsername({
        userId: data.userData.id,
        password: 'password',
        newUsername: 'new-username',
      })).rejects.toThrow(ConflictException);
    });
  });

  describe('changeEmail', () => {
    it('should change email successfully', async () => {
      // Call the changeEmail method
      const result = await managementService.changeEmail({
        userId: data.userData.id,
        password: 'password',
        currentEmail: data.userData.email,
        newEmail: 'new-email@test.com',
      });

      // Assert
      expect(result).toEqual({ message: 'Email changed successfully' });
    });

    it('should throw a bad request error if new email is the same as the old one', async () => {
      // Call the changeEmail method
      await expect(managementService.changeEmail({
        userId: data.userData.id,
        password: 'password',
        currentEmail: data.userData.email,
        newEmail: data.userData.email,
      })).rejects.toThrow(BadRequestException);
    });

    it('should throw an conflict error if new email already exists', async () => {
      // Create a new user with email 'new-email@test.com'
      await authService.signup({
        username: 'new-username',
        email: 'new-email@test.com',
        password: 'password',
        country: 'TS',
      });

      // Call the changeEmail method with email 'new-email@test.com' that already exists
      await expect(managementService.changeEmail({
        userId: data.userData.id,
        password: 'password',
        currentEmail: data.userData.email,
        newEmail: 'new-email@test.com',
      })).rejects.toThrow(ConflictException);
    });

    it('should throw an unauthorized if current email is incorrect', async () => {
      // Call the changeEmail method
      await expect(
        managementService.changeEmail({
          userId: data.userData.id,
          password: 'password',
          currentEmail: 'wrong-email@test.com',
          newEmail: 'new-email@test.com',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('changeCountry', () => {
    it('should change country successfully', async () => {
      // Call the changeCountry method
      const result = await managementService.changeCountry({
        userId: data.userData.id,
        newCountry: 'TS',
      });

      // Assert
      expect(result).toEqual({ message: 'Country changed successfully' });
    });

    it('should throw bad request if new country is the same as the old one', async () => {
      // Call the changeCountry method
      await expect(
        managementService.changeCountry({
          userId: data.userData.id,
          newCountry: data.userData.country,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('uploadAvatar', () => {
    it('should upload avatar successfully', async () => {
      const filePath = path.resolve(__dirname, 'test.png');
      const fileContent = Buffer.from([1, 2, 3]);

      // Create a test file
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
      }

      const file: File = {
        fieldname: 'avatar',
        originalname: 'avatar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: fileContent.length,
        buffer: fileContent,
        path: filePath,
      };

      // Call the uploadAvatar method
      const result = await managementService.uploadAvatar({ avatar: file, userId: data.userData.id });

      // Assert
      expect(result).toEqual({ message: 'Avatar uploaded successfully' });

      // Delete the test file
      fs.unlinkSync(filePath);
    });
  });

  describe('deleteAvatar', () => {
    it('should delete avatar successfully', async () => {
      const filePath = path.resolve(__dirname, 'test.png');
      const fileContent = Buffer.from([1, 2, 3]);

      // Create a test file
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContent);
      }

      const file: File = {
        fieldname: 'avatar',
        originalname: 'avatar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: fileContent.length,
        buffer: fileContent,
        path: filePath,
      };

      // Call the uploadAvatar method
      await managementService.uploadAvatar({ avatar: file, userId: data.userData.id });

      // Call the deleteAvatar method
      const result = await managementService.deleteAvatar({ userId: data.userData.id });

      // Assert
      expect(result).toEqual({ message: 'Avatar deleted successfully' });
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      // Call the changePassword method
      const result = await managementService.changePassword({
        userId: data.userData.id,
        oldPassword: 'password',
        newPassword: 'new-password',
      });

      // Assert
      expect(result).toEqual({ message: 'Password changed successfully' });
    });

    it('should throw bad request if new password is the same as the old one', async () => {
      // Call the changePassword method
      await expect(
        managementService.changePassword({
          userId: data.userData.id,
          oldPassword: 'password',
          newPassword: 'password',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('forgotPassword', () => {
    it('should forgot password successfully', async () => {
      // Call the forgotPassword method
      const result = await managementService.forgotPassword({
        email: data.userData.email,
      });

      // Assert
      expect(result).toEqual({ message: 'Reset email sent successfully' });
    });
  });

  describe('passwordReset', () => {
    it('should return true if password is changed', async () => {
      // Call the forgotPassword method
      await managementService.forgotPassword({
        email: data.userData.email,
      });

      // Call the passwordReset method to reset the password with the captured token
      const result = await managementService.passwordReset({
        token: 'test-reset-token',
        newPassword: 'new-password',
      });

      // Assert
      expect(result).toEqual({ message: 'Password reset successful' });
    });
  });

  describe('deleteAccount', () => {
    it('should delete account successfully', async () => {
      // Call the deleteAccount method
      const result = await managementService.deleteAccount({ userId: data.userData.id, password: 'password' });

      // Assert
      expect(result).toEqual({ message: 'Account deleted successfully' });
    });
  });
});
