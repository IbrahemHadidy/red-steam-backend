// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Services
import { GamesService } from '@repositories/sql/games/games.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';

import { UserService } from '@apis/user/user.service'; // Api service (The Extended Service)
import { UsersService } from '@repositories/sql/users/users.service'; // Repository service (The Injected Service)

@Injectable()
export class InteractionService extends UserService {
  constructor(
    protected readonly user: UsersService,
    protected readonly game: GamesService,
    protected readonly review: ReviewsService,
    protected readonly logger: Logger,
  ) {
    super();
  }

  /**
   * Changes the user's tags
   * @param data - An object containing the user's ID and the new tags
   * @returns The result of the change
   */
  public async changeTags(data: { userId: string; tags: number[] }) {
    const { userId, tags } = data;

    this.logger.log(`Changing tags for user with id: ${userId} to: ${tags}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Update the user's tags
    await this.user.updateUserTags(userId, tags);

    // Return the result
    this.logger.log(`Tags changed successfully for user with ID: ${userId}`);
    return { success: true, message: 'Tags changed successfully' };
  }

  /**
   * Returns the user's tags
   * @param data - An object containing the user's ID
   * @returns The user's tags
   */
  public async getTags(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Getting tags for user with id: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');

    // Return the user's tags
    this.logger.log(`Tags fetched successfully for user with ID: ${userId}`);
    return { success: true, tags: user.tags };
  }

  /**
   * Adds items to the user's library.
   * @param data - An object containing the user's ID and a list of item IDs to add to the library.
   * @returns The result of the operation.
   */
  public async addToLibrary(data: { itemsIds: number[]; userId: string }) {
    const { itemsIds, userId } = data;

    this.logger.log(`Adding games with IDs ${itemsIds} to library for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');

    // Check if all the games are already in the user's library
    const existingitemsIds = user.library.map((libraryItem) => libraryItem.id);
    const duplicates = itemsIds.filter((itemId) => existingitemsIds.includes(itemId));
    if (duplicates.length > 0) {
      this.logger.warn(`Games with IDs ${duplicates} are already in the library for user with ID: ${userId}`);
      return { success: false, message: 'Some games are already in the library', duplicates };
    }

    // Check if any of the items does not exist
    await this.game.getByIds(itemsIds);

    // Add the games to the user's library
    await this.user.addItemsToLibrary(userId, itemsIds);

    // Return the result
    this.logger.log(`Games added to library successfully for user with ID: ${userId}`);
    return { success: true, message: 'Games added to library successfully' };
  }

  /**
   * Removes items from the user's library.
   * @param data - An object containing the user's ID and a list of item IDs to remove from the library.
   * @returns The result of the operation.
   */
  public async removeFromLibrary(data: { itemsIds: number[]; userId: string }) {
    const { itemsIds, userId } = data;

    this.logger.log(`Removing games with IDs ${itemsIds} from library for user with ID: ${userId}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Remove the games from the user's library
    await this.user.removeItemsFromLibrary(userId, itemsIds);

    // Return the result
    this.logger.log(`Games removed from library successfully for user with ID: ${userId}`);
    return { success: true, message: 'Games removed from library successfully' };
  }

  /**
   * Clears the user's library.
   * @param data - An object containing the user's ID.
   * @returns The result of the operation.
   */
  public async clearLibrary(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Clearing library for user with ID: ${userId}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Clear the user's library
    await this.user.clearLibrary(userId);

    // Return the result
    this.logger.log(`Library cleared successfully for user with ID: ${userId}`);
    return { success: true, message: 'Library cleared successfully' };
  }

  /**
   * Adds items to the user's wishlist.
   * @param data - An object containing the user's ID and a list of item IDs to add to the wishlist.
   * @returns The result of the operation.
   */
  public async addToWishlist(data: { itemsIds: number[]; userId: string }) {
    const { itemsIds, userId } = data;

    this.logger.log(`Adding games with IDs ${itemsIds} to wishlist for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');

    // Check if all the games are already in the user's wishlist
    const existingitemsIds = user.wishlist.map((wishlistItem) => wishlistItem.id);
    const duplicates = itemsIds.filter((itemId) => existingitemsIds.includes(itemId));
    if (duplicates.length > 0) {
      this.logger.warn(`Games with IDs ${duplicates} are already in the wishlist`);
      return { success: false, message: 'Some games are already in the wishlist', duplicates };
    }

    // Check if any of the items does not exist
    await this.game.getByIds(itemsIds);

    // Add the games to the user's wishlist
    await this.user.addItemsToWishlist(userId, itemsIds);

    // Return the result
    this.logger.log(`Games added to wishlist successfully for user with ID: ${userId}`);
    return { success: true, message: 'Games added to wishlist successfully' };
  }

  /**
   * Removes items from the user's wishlist.
   * @param data - An object containing the user's ID and a list of item IDs to remove from the wishlist.
   * @returns The result of the operation.
   */
  public async removeFromWishlist(data: { itemsIds: number[]; userId: string }) {
    const { itemsIds, userId } = data;

    this.logger.log(`Removing games with IDs ${itemsIds} from wishlist for user with ID: ${userId}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Remove the games from the user's wishlist
    await this.user.removeItemsFromWishlist(userId, itemsIds);

    // Return the result
    this.logger.log(`Games removed from wishlist successfully for user with ID: ${userId}`);
    return { success: true, message: 'Games removed from wishlist successfully' };
  }

  /**
   * Clears user's wishlist.
   * @param data - An object containing the user's ID
   * @returns The result of the operation
   */
  public async clearWishlist(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Clearing wishlist for user with ID: ${userId}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Clear the user's wishlist
    await this.user.clearWishlist(userId);

    // Return the result
    this.logger.log(`Wishlist cleared successfully for user with ID: ${userId}`);
    return { success: true, message: 'Wishlist cleared successfully' };
  }

  /**
   * Adds items to the user's cart.
   * @param data - An object containing the user's ID and a list of item IDs to add to the cart.
   * @returns The result of the operation.
   */
  public async addToCart(data: { itemsIds: number[]; userId: string }) {
    const { itemsIds, userId } = data;

    this.logger.log(`Adding games with IDs ${itemsIds} to cart for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');

    // Check if all the games are already in the user's wishlist
    const existingitemsIds = user.cart.map((cartItem) => cartItem.id);
    const duplicates = itemsIds.filter((itemId) => existingitemsIds.includes(itemId));
    if (duplicates.length > 0) {
      this.logger.warn(`Games with IDs ${duplicates} are already in the cart`);
      return { success: false, message: 'Some games are already in the cart', duplicates };
    }

    // Check if any of the items does not exist
    await this.game.getByIds(itemsIds);

    // Add the games to the user's cart
    await this.user.addItemsToCart(userId, itemsIds);

    // Return the result
    this.logger.log(`Games added to cart successfully for user with ID: ${userId}`);
    return { success: true, message: `Games added to cart successfully` };
  }

  /**
   * Removes items from the user's cart.
   * @param data - An object containing the user's ID and a list of item IDs to remove from the cart.
   * @returns The result of the operation.
   */
  public async removeFromCart(data: { itemsIds: number[]; userId: string }) {
    const { itemsIds, userId } = data;

    this.logger.log(`Removing games with IDs ${itemsIds} from cart for user with ID: ${userId}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Remove the games from the user's cart
    await this.user.removeItemsFromCart(userId, itemsIds);

    // Return the result
    this.logger.log(`Games removed from cart successfully for user with ID: ${userId}`);
    return { success: true, message: 'Games removed from cart successfully' };
  }

  /**
   * Clears user's cart.
   * @param data - An object containing the user's ID
   * @returns The result of the operation
   */
  public async clearCart(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Clearing cart for user with ID: ${userId}`);

    // Check if user exists
    await this.findUser(userId, 'id');

    // Clear the user's cart
    await this.user.clearCart(userId);

    // Return the result
    this.logger.log(`Cart cleared successfully for user with ID: ${userId}`);
    return { success: true, message: 'Cart cleared successfully' };
  }

  /**
   * Returns user's library
   * @param data - An object containing the user's ID
   * @returns The user's library
   */
  public async getLibrary(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Getting library for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');
    if (user.library.length === 0) {
      this.logger.warn(`Library is empty for user with ID: ${userId}`);
      return { success: false, message: 'Library is empty' };
    }

    // Return the user's library
    this.logger.log(`Library retrieved successfully for user with ID: ${userId}`);
    return user.library;
  }

  /**
   * Returns user's wishlist
   * @param data - An object containing the user's ID
   * @returns The user's wishlist
   */
  public async getWishlist(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Getting wishlist for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');
    if (user.wishlist.length === 0) {
      this.logger.warn(`Wishlist is empty for user with ID: ${userId}`);
      return { success: false, message: 'Wishlist is empty' };
    }

    // Return the user's wishlist
    this.logger.log(`Wishlist retrieved successfully for user with ID: ${userId}`);
    return user.wishlist;
  }

  /**
   * Returns user's cart
   * @param data - An object containing the user's ID
   * @returns The user's cart
   */
  public async getCart(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Getting cart for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');
    if (user.cart.length === 0) {
      this.logger.warn(`Cart is empty for user with ID: ${userId}`);
      return { success: false, message: 'Cart is empty' };
    }

    // Return the user's cart
    this.logger.log(`Cart retrieved successfully for user with ID: ${userId}`);
    return user.cart;
  }

  /**
   * Reviews a game
   * @param data - An object containing the user's ID, the game ID, and the review content
   * @returns A success message
   */

  public async reviewGame(data: { userId: string; gameId: number; positive: boolean; content: string }) {
    const { userId, gameId, positive, content } = data;

    this.logger.log(`Reviewing game with ID: ${gameId} for user with ID: ${userId}`);

    // Create the review
    await this.review.create({ userId, gameId, positive, content });

    // Return the result
    this.logger.log(`Game reviewed successfully for user with ID: ${userId}`);
    return { success: true, message: 'Game reviewed successfully' };
  }

  /**
   * Returns user's reviews
   * @param data - An object containing the user's ID
   * @returns The user's reviews
   */
  public async getReviews(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Getting reviews for user with ID: ${userId}`);

    // Check and get user
    const user = await this.findUser(userId, 'id');
    if (user.reviews.length === 0) {
      this.logger.warn(`No reviews found for user with ID: ${userId}`);
      return { success: false, message: 'No reviews found' };
    }

    // Return the user's reviews
    this.logger.log(`Reviews retrieved successfully for user with ID: ${userId}`);
    return user.reviews;
  }
}
