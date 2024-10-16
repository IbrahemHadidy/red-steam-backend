import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig, getSqlTypeOrmConfig } from '@test/integration-setup';
import { randomUUID } from 'crypto';

// Modules
import { GamesTagsModule } from '@repositories/sql/games-tags/games-tags.module';
import { UsersModule } from '@repositories/sql/users/users.module';

// Services
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { UsersService } from '@repositories/sql/users/users.service';

// Entities
import { User } from '@repositories/sql/users/user.entity';

describe('usersService', () => {
  let user: User;
  let user2: User;
  let usersService: UsersService;
  let gamesTagsService: GamesTagsService;
  let unexistingUserId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(environmentConfig),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          name: 'sql',
          useFactory: async (configService: ConfigService) => getSqlTypeOrmConfig(configService),
        }),
        GamesTagsModule,
        UsersModule,
      ],
      providers: [UsersService, GamesTagsService, Logger],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    gamesTagsService = module.get<GamesTagsService>(GamesTagsService);

    user = await usersService.create({
      username: 'test',
      email: 'test@test.com',
      password: 'password',
      country: 'US',
    });

    user2 = await usersService.create({
      username: 'test2',
      email: 'test2@test.com',
      password: 'password',
      country: 'EG',
    });

    unexistingUserId = randomUUID();
  });

  afterEach(async () => {
    await usersService.removeAll();
    await gamesTagsService.removeAll();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      await usersService.create({
        username: 'test2',
        email: 'test2@test.com',
        password: 'password',
        country: 'US',
      });
      const users = await usersService.getAll('username', 'ASC');

      // Assertions
      expect(users).toHaveLength(2);
    });
  });

  describe('getById', () => {
    it('should return the user with the given id', async () => {
      const foundUser = await usersService.getById(user.id);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
        }),
      );
    });
  });

  describe('getByUsername', () => {
    it('should return the user with the given username', async () => {
      const foundUser = await usersService.getByUsername(user.username);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
        }),
      );
    });
  });

  describe('getByEmail', () => {
    it('should return the user with the given email', async () => {
      const foundUser = await usersService.getByEmail(user.email);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
        }),
      );
    });
  });

  describe('getByEmailOrUsername', () => {
    it('should return the user with the given email', async () => {
      const foundUser = await usersService.getByEmailOrUsername(user.email);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
        }),
      );
    });

    it('should return the user with the given username', async () => {
      const foundUser = await usersService.getByEmailOrUsername(user.username);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
        }),
      );
    });
  });

  describe('getByVerificationToken', () => {
    it('should return the user with the given verification token', async () => {
      const foundUser = await usersService.getByVerificationToken(user.verificationToken);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
        }),
      );
    });
  });

  describe('getByPhoneNumber', () => {
    it('should return the user with the given phone number', async () => {
      const foundUser = await usersService.getByPhoneNumber(user.phoneNumber);

      // Assertions
      expect(foundUser).toEqual(
        expect.objectContaining({
          id: user.id,
          username: user.username,
          email: user.email,
          country: user.country,
          phoneNumber: user.phoneNumber,
        }),
      );
    });
  });

  describe('getUsersPaginated', () => {
    it('should return an array of game users sorted by username', async () => {
      const users = await usersService.getUsersPaginated(0, 10, 'username', 'ASC');
      expect(users.items.length).toEqual(2);
      expect(users.items[0].username).toEqual('test');
      expect(users.items[1].username).toEqual('test2');
    });

    it('should return an array of game users sorted by email', async () => {
      const users = await usersService.getUsersPaginated(0, 10, 'email', 'ASC');
      expect(users.items.length).toEqual(4);
      expect(users.items[0].email).toEqual('test@test.com');
      expect(users.items[1].email).toEqual('test2@test.com');
    });

    it('should return an array of game users sorted by country', async () => {
      const users = await usersService.getUsersPaginated(0, 10, 'country', 'ASC');
      expect(users.items.length).toEqual(2);
      expect(users.items[0].country).toEqual('EG');
      expect(users.items[1].country).toEqual('US');
    });

    it('should return values with the given search', async () => {
      const users = await usersService.getUsersPaginated(0, 10, 'email', 'ASC', { email: user2.email });
      expect(users.items.length).toEqual(1);
      expect(users.items[0].email).toEqual(user2.email);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createdUser = await usersService.create({
        username: 'test3',
        email: 'test3@test.com',
        password: 'password',
        country: 'US',
      });

      // Assertions
      expect(createdUser.username).toEqual('test3');
    });

    it('should throw an error if the user already exists', async () => {
      await expect(usersService.create(user)).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update the user with the given id', async () => {
      const updatedUser = await usersService.update(user.id, { email: 'test4@test.com' });

      // Assertions
      expect(updatedUser.email).toEqual('test4@test.com');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.update(unexistingUserId, { email: 'test4@test.com' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('setLoginStatus', () => {
    it('should set the login status of the user with the given id to true', async () => {
      const updatedUser = await usersService.setLoginStatus(user.id, true);

      // Assertions
      expect(updatedUser.isLoggedIn).toEqual(true);
    });

    it('should set the login status of the user with the given id to false', async () => {
      const updatedUser = await usersService.setLoginStatus(user.id, false);

      // Assertions
      expect(updatedUser.isLoggedIn).toEqual(false);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.setLoginStatus(unexistingUserId, true)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUsername', () => {
    it('should update the username of the user with the given id', async () => {
      const updatedUser = await usersService.updateUsername(user.id, 'test4');

      // Assertions
      expect(updatedUser.username).toEqual('test4');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updateUsername(unexistingUserId, 'test4')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePassword', () => {
    it('should update the password of the user with the given id', async () => {
      const updatedUser = await usersService.updatePassword(user.id, 'test4');

      // Assertions
      expect(updatedUser.password).toEqual('test4');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updatePassword(unexistingUserId, 'test4')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateEmail', () => {
    it('should update the email of the user with the given id', async () => {
      const updatedUser = await usersService.updateEmail(user.id, 'test4@test.com');

      // Assertions
      expect(updatedUser.email).toEqual('test4@test.com');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updateEmail(unexistingUserId, 'test4@test.com')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCountry', () => {
    it('should update the country of the user with the given id', async () => {
      const updatedUser = await usersService.updateCountry(user.id, 'test4');

      // Assertions
      expect(updatedUser.country).toEqual('test4');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updateCountry(unexistingUserId, 'test4')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateVerificationToken', () => {
    it('should update the verification token of the user with the given id', async () => {
      const updatedUser = await usersService.updateVerificationToken(user.id, 'test4');

      // Assertions
      expect(updatedUser.verificationToken).toEqual('test4');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updateVerificationToken(unexistingUserId, 'test4')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUserTags', () => {
    it('should update the user tags of the user with the given id', async () => {
      // create tags
      const tag1 = await gamesTagsService.create('tag1');
      const tag2 = await gamesTagsService.create('tag2');

      // update tags
      const updatedUser = await usersService.updateUserTags(user.id, [tag1.id, tag2.id]);

      // Assertions
      expect(updatedUser.tags.map((tag) => tag.id)).toEqual([tag1.id, tag2.id]);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updateUserTags(unexistingUserId, [1, 2, 3])).rejects.toThrow(NotFoundException);
    });
  });

  describe('addItemsToLibrary', () => {
    it('should add items to the library of the user with the given id', async () => {
      const updatedUser = await usersService.addItemsToLibrary(user.id, [1, 2, 3]);

      // Assertions
      expect(updatedUser.library).toEqual(
        [1, 2, 3].map((id) => ({
          id,
          addedOn: expect.any(Date),
        })),
      );
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.addItemsToLibrary(unexistingUserId, [1, 2, 3])).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeItemsFromLibrary', () => {
    it('should remove items from the library of the user with the given id', async () => {
      await usersService.addItemsToLibrary(user.id, [1, 2, 3]);
      const updatedUser = await usersService.removeItemsFromLibrary(user.id, [1, 2, 3]);

      // Assertions
      expect(updatedUser.library).toEqual([]);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.removeItemsFromLibrary(unexistingUserId, [1, 2, 3])).rejects.toThrow(NotFoundException);
    });
  });

  describe('addItemsToWishlist', () => {
    it('should add items to the wishlist of the user with the given id', async () => {
      const updatedUser = await usersService.addItemsToWishlist(user.id, [1, 2, 3]);

      // Assertions
      expect(updatedUser.wishlist).toEqual(
        [1, 2, 3].map((id) => ({
          id,
          addedOn: expect.any(Date),
        })),
      );
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.addItemsToWishlist(unexistingUserId, [1, 2, 3])).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeItemsFromWishlist', () => {
    it('should remove items from the wishlist of the user with the given id', async () => {
      await usersService.addItemsToWishlist(user.id, [1, 2, 3]);
      const updatedUser = await usersService.removeItemsFromWishlist(user.id, [1, 2, 3]);

      // Assertions
      expect(updatedUser.wishlist).toEqual([]);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.removeItemsFromWishlist(unexistingUserId, [1, 2, 3])).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('clearWishlist', () => {
    it('should clear the wishlist of the user with the given id', async () => {
      await usersService.addItemsToWishlist(user.id, [1, 2, 3]);
      const updatedUser = await usersService.clearWishlist(user.id);

      // Assertions
      expect(updatedUser.wishlist).toEqual([]);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.clearWishlist(unexistingUserId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addItemsToCart', () => {
    it('should add items to the cart of the user with the given id', async () => {
      const updatedUser = await usersService.addItemsToCart(user.id, [1, 2, 3]);

      // Assertions
      expect(updatedUser.cart).toEqual(
        [1, 2, 3].map((id) => ({
          id,
          addedOn: expect.any(Date),
        })),
      );
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.addItemsToCart(unexistingUserId, [1, 2, 3])).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeItemsFromCart', () => {
    it('should remove items from the cart of the user with the given id', async () => {
      await usersService.addItemsToCart(user.id, [1, 2, 3]);
      const updatedUser = await usersService.removeItemsFromCart(user.id, [1, 2, 3]);

      // Assertions
      expect(updatedUser.cart).toEqual([]);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.removeItemsFromCart(unexistingUserId, [1, 2, 3])).rejects.toThrow(NotFoundException);
    });
  });

  describe('clearCart', () => {
    it('should clear the cart of the user with the given id', async () => {
      await usersService.addItemsToCart(user.id, [1, 2, 3]);
      const updatedUser = await usersService.clearCart(user.id);

      // Assertions
      expect(updatedUser.cart).toEqual([]);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.clearCart(unexistingUserId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAvatar', () => {
    it('should update the avatar of the user with the given id', async () => {
      const updatedUser = await usersService.updateAvatar(user.id, 'test4');

      // Assertions
      expect(updatedUser.profilePicture).toEqual('test4');
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.updateAvatar(unexistingUserId, 'test4')).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAvatar', () => {
    it('should remove the avatar of the user with the given id', async () => {
      const updatedUser = await usersService.removeAvatar(user.id);

      // Assertions
      expect(updatedUser.profilePicture).toEqual(null);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.removeAvatar(unexistingUserId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('verify', () => {
    it('should verify the user with the given id', async () => {
      const updatedUser = await usersService.verify(user.id);

      // Assertions
      expect(updatedUser.isVerified).toEqual(true);
      expect(updatedUser.verificationToken).toEqual(null);
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.verify(unexistingUserId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the user with the given id', async () => {
      const removedUser = await usersService.remove(user.id);

      // Assertions
      expect(removedUser).toEqual(
        expect.objectContaining({
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        }),
      );
    });

    it('should throw an error if the user does not exist', async () => {
      await expect(usersService.remove(unexistingUserId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeAll', () => {
    it('should remove all users', async () => {
      await usersService.create({
        username: 'test2',
        email: 'test2@test.com',
        password: 'password',
        country: 'US',
      });
      await usersService.removeAll();
      const users = await usersService.getAll('username', 'ASC');

      // Assertions
      expect(users.length).toEqual(0);
    });
  });
});
