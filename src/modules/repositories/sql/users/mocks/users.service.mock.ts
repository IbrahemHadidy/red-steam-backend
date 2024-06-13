import { ConflictException } from '@nestjs/common';
import { UsersService } from '@repositories/sql/users/users.service';
import { LibraryItem, User } from '@repositories/sql/users/user.entity';
import { GamesTagsServiceMock } from '@repositories/sql/games-tags/mocks/games-tags.service.mock';

export class UsersServiceMock implements Partial<UsersService> {
  private users: User[] = [];
  private readonly gamesTags: GamesTagsServiceMock

  public async getAll(
    orderBy: 'id' | 'email' | 'username' | 'country' | 'createdAt',
    order: 'ASC' | 'DESC',
  ): Promise<User[]> {
    return this.users.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'ASC' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'ASC' ? 1 : -1;
      return 0;
    });
  }

  public async getById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id) || null;
  }

  public async getByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username) || null;
  }

  public async getByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email) || null;
  }

  public async getByEmailOrUsername(emailOrUsername: string): Promise<User> {
    return this.users.find((user) => user.email === emailOrUsername || user.username === emailOrUsername) || null;
  }

  public async getByVerificationToken(verificationToken: string): Promise<User> {
    return this.users.find((user) => user.verificationToken === verificationToken) || null;
  }

  public async getByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.users.find((user) => user.phoneNumber === phoneNumber) || null;
  }

  public async create(createdUser: {
    email: string;
    username: string;
    country: string;
    password: string;
  }): Promise<User> {
    const newUser: User = {
      ...createdUser,
      id: (Math.random() * 10000).toString(),
      verificationToken: null,
      isVerified: false,
      phoneNumber: '',
      profilePicture: '',
      tags: [],
      phoneVerificationCode: '',
      isPhoneVerified: false,
      passwordResetToken: '',
      isAdmin: false,
      isActive: false,
      isLoggedIn: false,
      createdAt: undefined,
      wishlist: [],
      reviews: [],
      cart: [],
      library: [],
      hasId: () => null,
      save: () => null,
      remove: () => null,
      softRemove: () => null,
      recover: () => null,
      reload: () => null,
    };
    // check if user already exists
    const existingUser = this.users.find(
      (user) => user.email === createdUser.email || createdUser.username === user.username,
    );
    if (existingUser) throw new ConflictException('User already exists');

    // save the user
    this.users.push(newUser);
    return newUser;
  }

  public async update(id: string, attrs: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null; // User not found
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...attrs,
      hasId: () => null,
      save: () => null,
      remove: () => null,
      softRemove: () => null,
      recover: () => null,
      reload: () => null,
    };
    return this.users[userIndex];
  }

  public async setLoginStatus(id: string, loggedIn?: boolean): Promise<User> {
    const user = await this.getById(id);
    if (!user) {
      return null; // User not found
    }
    user.isLoggedIn = loggedIn;
    return user;
  }

  public async updateUsername(id: string, name: string): Promise<User> {
    return this.update(id, { username: name });
  }

  public async updatePassword(id: string, password: string): Promise<User> {
    return this.update(id, { password });
  }

  public async updateEmail(id: string, email: string): Promise<User> {
    return this.update(id, { email });
  }

  public async updateCountry(id: string, country: string): Promise<User> {
    return this.update(id, { country });
  }

  public async updateVerificationToken(id: string, token: string): Promise<User> {
    return this.update(id, { verificationToken: token });
  }

  public async updateUserTags(id: string, tagIds: number[]): Promise<User> {
    const tags = await this.gamesTags.getByIds(tagIds);
    return this.update(id, { tags });
  }

  public async addItemsToLibrary(id: string, itemIds: number[]): Promise<User> {
    const items = itemIds.map((itemId) => new LibraryItem(itemId));
    return this.update(id, { library: [...this.users.find((user) => user.id === id).library, ...items] });
  }

  public async removeItemsFromLibrary(id: string, itemIds: number[]): Promise<User> {
    return this.update(id, {
      library: this.users.find((user) => user.id === id).library.filter((item) => !itemIds.includes(item.id)),
    });
  }

  public async addItemsToWishlist(id: string, itemIds: number[]): Promise<User> {
    const items = itemIds.map((itemId) => new LibraryItem(itemId));
    return this.update(id, { wishlist: [...this.users.find((user) => user.id === id).wishlist, ...items] });
  }

  public async removeItemsFromWishlist(id: string, itemIds: number[]): Promise<User> {
    return this.update(id, {
      wishlist: this.users.find((user) => user.id === id).wishlist.filter((item) => !itemIds.includes(item.id)),
    });
  }

  public async clearWishlist(id: string): Promise<User> {
    return this.update(id, { wishlist: [] });
  }

  public async addItemsToCart(id: string, itemIds: number[]): Promise<User> {
    const items = itemIds.map((itemId) => new LibraryItem(itemId));
    return this.update(id, { cart: [...this.users.find((user) => user.id === id).cart, ...items] });
  }

  public async removeItemsFromCart(id: string, itemIds: number[]): Promise<User> {
    return this.update(id, {
      cart: this.users.find((user) => user.id === id).cart.filter((item) => !itemIds.includes(item.id)),
    });
  }

  public async clearCart(id: string): Promise<User> {
    return this.update(id, { cart: [] });
  }

  public async updateAvatar(id: string, avatarId: string): Promise<User> {
    return this.update(id, { profilePicture: avatarId });
  }

  public async removeAvatar(id: string): Promise<User> {
    return this.update(id, { profilePicture: null });
  }

  public async verify(id: string): Promise<User> {
    return this.update(id, { isVerified: true, verificationToken: null });
  }

  public async remove(id: string): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null; // User not found
    }
    const removedUser = this.users.splice(userIndex, 1)[0];
    return removedUser;
  }

  public async removeAll(): Promise<void> {
    this.users = [];
  }
}
