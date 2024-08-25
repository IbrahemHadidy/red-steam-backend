import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CartItem, LibraryItem, User, WishlistItem } from '@repositories/sql/users/user.entity';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';

@Injectable()
export class UsersService {
  private readonly relations: FindOptionsRelations<User>;

  constructor(
    private readonly logger: Logger,
    @InjectRepository(User, 'sql')
    private readonly userRepository: Repository<User>,
    private readonly gameTag: GamesTagsService,
  ) {
    this.relations = { tags: true, reviews: true };
  }

  /**
   * Retrieves all users.
   * @param {string} orderBy - The property to order by.
   * @param {string} order - The order to use.
   * @return {Promise<User[]>} A Promise that resolves to an array of user entities.
   */
  public async getAll(
    orderBy: 'id' | 'email' | 'username' | 'country' | 'createdAt',
    order: 'ASC' | 'DESC',
  ): Promise<User[]> {
    // Log the retrieval of all users
    this.logger.log(`Retrieving all users from the database`);

    const users = await this.userRepository.find({ relations: this.relations, order: { [orderBy]: order } });
    return users;
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user entity.
   */
  public async getById(id: string): Promise<User> {
    // Log the retrieval of a user
    this.logger.log(`Retrieving user with ID ${id} from the database`);

    const user = await this.userRepository.findOne({ where: { id }, relations: this.relations });
    return user;
  }

  /**
   * Retrieves a user by their username.
   * @param {string} username - The username of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user entity or null if the user is not found.
   */
  public async getByUsername(username: string): Promise<User> {
    // Log the retrieval of a user
    this.logger.log(`Retrieving user with username ${username} from the database`);

    const user = await this.userRepository.findOne({ where: { username }, relations: this.relations });
    return user;
  }

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email address of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user entity or null if the user is not found.
   */
  public async getByEmail(email: string): Promise<User | null> {
    // Log the retrieval of a user
    this.logger.log(`Retrieving user with email ${email} from the database`);

    const user = await this.userRepository.findOne({ where: { email }, relations: this.relations });
    return user;
  }

  /**
   * Retrieves a user by their email or username.
   * @param {string} emailOrUsername - The email or username of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user entity or null if the user is not found.
   */
  public async getByEmailOrUsername(emailOrUsername: string): Promise<User> {
    // Log the retrieval of a user
    this.logger.log(`Retrieving user with identifier: ${emailOrUsername} from the database`);

    const user = await this.userRepository.findOne({
      where: [{ email: emailOrUsername }, { username: emailOrUsername }],
      relations: this.relations,
    });
    return user;
  }

  /**
   * Retrieves a user by their verification token.
   * @param {string} token - The verification token of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user entity or null if the user is not found.
   */
  public async getByVerificationToken(token: string): Promise<User> {
    // Log the retrieval of a user
    this.logger.log(`Retrieving user with verification token ${token} from the database`);

    const user = await this.userRepository.findOne({ where: { verificationToken: token }, relations: this.relations });
    return user;
  }

  /**
   * Retrieves a user by their phone number.
   * @param {string} phoneNumber - The phone number of the user to retrieve.
   * @return {Promise<User>} A Promise that resolves to the user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user with the specified phone number is not found.
   */
  public async getByPhoneNumber(phoneNumber: string): Promise<User> {
    // Log the retrieval of a user
    this.logger.log(`Retrieving user with phone number ${phoneNumber} from the database`);

    const user = await this.userRepository.findOne({ where: { phoneNumber }, relations: this.relations });
    if (!user) throw new NotFoundException(`User with phone number ${phoneNumber} not found`);
    return user;
  }

  /**
   * Gets paginated user.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of items per page.
   * @param {string} orderBy - The field to order by.
   * @param {('ASC' | 'DESC')} order - The order direction.
   * @param {({ name?: string })} searchQuery - The search query.
   * @returns {Promise<{ items: User[], total: number, totalPages: number }>} A promise that resolves to the paginated users.
   */
  public async getUsersPaginated(
    page: number,
    limit: number,
    orderBy: 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    order: 'ASC' | 'DESC',
    searchQuery?: { username?: string; email?: string },
  ): Promise<{ items: User[]; total: number; totalPages: number }> {
    this.logger.log(`Getting users paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);

    const where: FindOptionsWhere<User> = {};

    if (searchQuery?.username) {
      where.username = Like(`%${searchQuery.username}%`);
    }
    if (searchQuery?.email) {
      where.email = Like(`%${searchQuery.email}%`);
    }

    const orderOptions: FindOptionsOrder<User> = {};

    if (orderBy === 'username') {
      orderOptions.username = order;
    } else if (orderBy === 'email') {
      orderOptions.email = order;
    } else if ( orderBy === 'country') {
      orderOptions.country = order;0
    } else if (orderBy === 'isVerified') {
      orderOptions.isVerified = order;
    } else if (orderBy === 'isAdmin') {
      orderOptions.isAdmin = order;
    } else if (orderBy === 'createdAt') {
      orderOptions.createdAt = order;
    }

    const [items, total] = await this.userRepository.findAndCount({
      where,
      relations: this.relations,
      order: orderOptions,
      skip: Math.max((page - 1) * limit, 0),
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return { items, total, totalPages };
  }

  /**
   * Creates a new user.
   * @param {User} user - The user entity to be created.
   * @return {Promise<User>} A Promise that resolves to the created user entity.
   * @throws {ConflictException} Throws a ConflictException if the user already exists.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the creation fails.
   */
  public async create(user: { email: string; username: string; country: string; password: string }): Promise<User> {
    // Log the creation of a user
    this.logger.log(`Creating user with email ${user.email} in the database`);

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email: user.email }, { username: user.username }],
    });
    if (existingUser) throw new ConflictException('User already exists');

    // Initialize reviews as an empty array
    const newUser = new User();
    newUser.email = user.email;
    newUser.username = user.username;
    newUser.country = user.country;
    newUser.password = user.password;
    newUser.reviews = [];

    // Save the user
    const createdUser = await this.userRepository.save(newUser);
    if (!createdUser) throw new InternalServerErrorException('Failed to create user');

    // Return the created user
    return createdUser;
  }

  /**
   * Updates a user entity with new attributes.
   * @param {string} id - The ID of the user entity to update.
   * @param {Partial<User>} attrs - The partial attributes to update the user entity with.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user with the specified ID is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async update(id: string, attrs: Partial<User>): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    Object.assign(user, attrs);

    // Save the updated user
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Sets the login status of a user.
   * @param {string} id - The ID of the user.
   * @param {boolean} loggedIn - The login status to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async setLoginStatus(id: string, loggedIn: boolean): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating login status of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.isLoggedIn = loggedIn;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to Login user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the name of a user.
   * @param {string} id - The ID of the user.
   * @param {string} name - The new name to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updateUsername(id: string, name: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating username of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.username = name;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the password of a user.
   * @param {string} id - The ID of the user.
   * @param {string} password - The new password to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updatePassword(id: string, password: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating password of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.password = password;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the email of a user.
   * @param {string} id - The ID of the user.
   * @param {string} email - The new email to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updateEmail(id: string, email: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating email of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.email = email;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the country of a user.
   * @param {string} id - The ID of the user.
   * @param {string} country - The new country to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updateCountry(id: string, country: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating country of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.country = country;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the verification token of a user.
   * @param {string} id - The ID of the user.
   * @param {string} token - The new verification token to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updateVerificationToken(id: string, token: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating verification token of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.verificationToken = token;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the tags of a user.
   * @param {string} id - The ID of the user.
   * @param {number[]} tagsIds - The IDs of the new tags to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updateUserTags(id: string, tagsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating tags of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Fetch the GameTag objects based on the tagIds
    const tags = await this.gameTag.getByIds(tagsIds);

    // Assign the fetched tags to the user
    user.tags = tags;

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Adds items to the user's library.
   * @param {string} id - The ID of the user.
   * @param {number[]} itemsIds - An array of item IDs to add to the library.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async addItemsToLibrary(id: string, itemsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Adding items to library of user with ID ${id} in the database`);

    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Create LibraryItem instances for each item ID
    const newItems = itemsIds.map((itemId) => new LibraryItem(itemId));

    // Add new items to the user's library
    user.library.push(...newItems);

    // Save the updated user entity
    user.cart = [];

    // Remove added items from wishlist if they exist
    const newItemsIds = newItems.map((item) => item.id);
    user.wishlist = user.wishlist.filter((item) => !newItemsIds.includes(item.id));

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    return updatedUser;
  }

  /**
   * Removes items from the user's library.
   * @param {string} id - The ID of the user.
   * @param {number[]} itemsIds - An array of item IDs to remove from the library.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async removeItemsFromLibrary(id: string, itemsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Removing items from library of user with ID ${id} in the database`);

    const user = await this.getById(id);

    // Throw an exception if user is not found
    if (!user) throw new NotFoundException('User not found');

    // Filter out items with IDs included in the provided itemIds array
    const userItemsIds = user.library.map((item) => item.id);

    // Throw an exception if any of the provided item IDs do not exist in the user's library
    const nonExistingItems = itemsIds.filter((itemId) => !userItemsIds.includes(itemId));
    if (nonExistingItems.length > 0) {
      this.logger.error(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's library`);
      throw new NotFoundException(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's library`);
    }

    // Remove items from the user's library based on their IDs
    user.library = user.library.filter((item) => !itemsIds.includes(item.id));

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    return updatedUser;
  }

  /**
   * Clears the user's library.
   * @param {string} id - The ID of the user.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async clearLibrary(id: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Clearing library of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Clear the user's library
    user.library = [];

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    return updatedUser;
  }

  /**
   * Adds items to the user's wishlist.
   * @param {string} id - The ID of the user.
   * @param {number[]} itemsIds - An array of item IDs to add to the wishlist.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async addItemsToWishlist(id: string, itemsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Adding items to wishlist of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Create WishlistItem instances for each item ID
    const newItems = itemsIds.map((itemId) => new WishlistItem(itemId));

    // Add the new items to the user's wishlist
    user.wishlist.push(...newItems);

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Removes items from the user's wishlist.
   * @param {string} id - The ID of the user.
   * @param {number[]} itemsIds - An array of item IDs to remove from the wishlist.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async removeItemsFromWishlist(id: string, itemsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Removing items from wishlist of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Filter out items with IDs included in the provided itemIds array
    const nonExistingItems = itemsIds.filter((itemId) => !user.wishlist.map((item) => item.id).includes(itemId));
    if (nonExistingItems.length > 0) {
      this.logger.error(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's wishlist`);
      throw new NotFoundException(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's wishlist`);
    }

    user.wishlist = user.wishlist.filter((item) => !itemsIds.includes(item.id));

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Clears the user's wishlist.
   * @param {string} id - The ID of the user.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async clearWishlist(id: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Clearing wishlist of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Clear the user's wishlist
    user.wishlist = [];

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Adds items to the user's cart.
   * @param {string} id - The ID of the user.
   * @param {number[]} itemsIds - An array of item IDs to add to the cart.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async addItemsToCart(id: string, itemsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Adding items to cart of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Create CartItem instances for each item ID
    const newItems = itemsIds.map((itemId) => new CartItem(itemId));

    // Add the new items to the user's cart
    user.cart.push(...newItems);

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Removes items from the user's cart.
   * @param {string} id - The ID of the user.
   * @param {number[]} itemsIds - An array of item IDs to remove from the cart.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async removeItemsFromCart(id: string, itemsIds: number[]): Promise<User> {
    // Log the update of a user
    this.logger.log(`Removing items from cart of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Filter out items with IDs included in the provided itemIds array
    const cartItemsIds = user.cart.map((item) => item.id);

    // Throw an exception if any of the provided item IDs do not exist in the user's cart
    const nonExistingItems = itemsIds.filter((itemId) => !cartItemsIds.includes(itemId));
    if (nonExistingItems.length > 0) {
      this.logger.error(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's cart`);
      throw new NotFoundException(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's cart`);
    }

    user.cart = user.cart.filter((item) => !itemsIds.includes(item.id));

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Clears the user's cart.
   * @param {string} id - The ID of the user.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async clearCart(id: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Clearing cart of user with ID ${id} in the database`);

    // Get the user by ID
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Clear the user's cart
    user.cart = [];

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    // Check if the update was successful
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user entity
    return updatedUser;
  }

  /**
   * Updates the avatar of a user.
   * @param {string} id - The ID of the user.
   * @param {string} avatarId - The new avatar ID to set.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async updateAvatar(id: string, avatarId: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Updating avatar of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.profilePicture = avatarId;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Removes the avatar of a user.
   * @param {string} id - The ID of the user.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async removeAvatar(id: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Removing avatar of user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Update the user
    user.profilePicture = null;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Updates the isVerified status of a user.
   * @param {string} id - The ID of the user.
   * @return {Promise<User>} A Promise that resolves to the updated user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {BadRequestException} Throws a BadRequestException if the user is already verified.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the update fails.
   */
  public async verify(id: string): Promise<User> {
    // Log the update of a user
    this.logger.log(`Verifying user with ID ${id} in the database`);

    // Check if user exists
    const user = await this.getById(id);

    // Check if user exists
    if (!user) throw new NotFoundException('User not found');

    // Throw an exception if user is already verified
    if (user.isVerified) throw new BadRequestException('Email is already verified');

    // Update the user
    user.isVerified = true;
    user.verificationToken = null;
    const updatedUser = await this.userRepository.save(user);
    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    // Return the updated user
    return updatedUser;
  }

  /**
   * Removes a user by their ID.
   * @param {string} id - The ID of the user to be removed.
   * @return {Promise<User>} A Promise that resolves to the removed user entity.
   * @throws {NotFoundException} Throws a NotFoundException if the user is not found.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async remove(id: string): Promise<User> {
    // Log the removal of a user
    this.logger.log(`Removing user with ID ${id} from the database`);

    // Check if user exists
    const user = await this.getById(id);
    if (!user) throw new NotFoundException('User not found');

    // Remove the user
    const removedUser = await this.userRepository.remove(user);
    if (!removedUser) throw new InternalServerErrorException('Failed to remove user');

    // Return the removed user
    return removedUser;
  }

  /**
   * Removes all users from the database.
   * @return {Promise<void>} A Promise that resolves when the removal is successful.
   * @throws {InternalServerErrorException} Throws an InternalServerErrorException if the removal fails.
   */
  public async removeAll(): Promise<void> {
    // Log the removal of all users
    this.logger.log('Removing all users from the database');

    // Remove all users
    const result = await this.userRepository.delete({});
    if (!result) throw new InternalServerErrorException('Failed to remove users');
  }
}
