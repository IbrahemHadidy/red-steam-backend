// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InteractionService", {
    enumerable: true,
    get: function() {
        return InteractionService;
    }
});
const _common = require("@nestjs/common");
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _reviewsservice = require("../../../repositories/sql/reviews/reviews.service");
const _userservice = require("../user.service");
const _usersservice = require("../../../repositories/sql/users/users.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let InteractionService = class InteractionService {
    constructor(userTools, user, game, review, logger){
        this.userTools = userTools;
        this.user = user;
        this.game = game;
        this.review = review;
        this.logger = logger;
    }
    /**
   * Changes the user's tags
   * @param data - An object containing the user's ID and the new tags
   * @returns A message indicating the success of the operation
   */ async changeTags(data) {
        const { userId, tags } = data;
        this.logger.log(`Changing tags for user with id: ${userId} to: ${tags}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Update the user's tags
        await this.user.updateUserTags(userId, tags);
        // Return the result
        this.logger.log(`Tags changed successfully for user with ID: ${userId}`);
        return {
            message: 'Tags changed successfully'
        };
    }
    /**
   * Returns the user's tags
   * @param data - An object containing the user's ID
   * @returns The user's tags
   */ async getTags(data) {
        const { userId } = data;
        this.logger.log(`Getting tags for user with id: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Return the user's tags
        this.logger.log(`Tags fetched successfully for user with ID: ${userId}`);
        return {
            tags: user.tags
        };
    }
    /**
   * Adds items to the user's library.
   * @param data - An object containing the user's ID and a list of item IDs to add to the library.
   * @returns A message indicating the success of the operation.
   * @throws `BadRequestException` If any of the items are already in the user's library.
   */ async addToLibrary(data) {
        const { itemsIds, userId } = data;
        this.logger.log(`Adding games with IDs ${itemsIds} to library for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Check if all the games are already in the user's library
        const existingitemsIds = user.library.map((libraryItem)=>libraryItem.id);
        const duplicates = itemsIds.filter((itemId)=>existingitemsIds.includes(itemId));
        if (duplicates.length > 0) {
            this.logger.warn(`Games with IDs ${duplicates} are already in the library for user with ID: ${userId}`);
            throw new _common.BadRequestException(`Games with IDs ${duplicates} are already in the library for user with ID: ${userId}`);
        }
        // Check if any of the items does not exist
        await this.game.getByIds(itemsIds);
        // Add the games to the user's library
        await this.user.addItemsToLibrary(userId, itemsIds);
        // Return the result
        this.logger.log(`Games added to library successfully for user with ID: ${userId}`);
        return {
            message: 'Games added to library successfully'
        };
    }
    /**
   * Removes items from the user's library.
   * @param data - An object containing the user's ID and a list of item IDs to remove from the library.
   * @returns A message indicating the success of the operation.
   */ async removeFromLibrary(data) {
        const { itemsIds, userId } = data;
        this.logger.log(`Removing games with IDs ${itemsIds} from library for user with ID: ${userId}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Remove the games from the user's library
        await this.user.removeItemsFromLibrary(userId, itemsIds);
        // Return the result
        this.logger.log(`Games removed from library successfully for user with ID: ${userId}`);
        return {
            message: 'Games removed from library successfully'
        };
    }
    /**
   * Clears the user's library.
   * @param data - An object containing the user's ID.
   * @returns A message indicating the success of the operation.
   */ async clearLibrary(data) {
        const { userId } = data;
        this.logger.log(`Clearing library for user with ID: ${userId}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Clear the user's library
        await this.user.clearLibrary(userId);
        // Return the result
        this.logger.log(`Library cleared successfully for user with ID: ${userId}`);
        return {
            message: 'Library cleared successfully'
        };
    }
    /**
   * Adds items to the user's wishlist.
   * @param data - An object containing the user's ID and a list of item IDs to add to the wishlist.
   * @returns A message indicating the success of the operation.
   * @throws `BadRequestException` If any of the items are already in the user's wishlist.
   */ async addToWishlist(data) {
        const { itemsIds, userId } = data;
        this.logger.log(`Adding games with IDs ${itemsIds} to wishlist for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Check if all the games are already in the user's wishlist
        const existingitemsIds = user.wishlist.map((wishlistItem)=>wishlistItem.id);
        const duplicates = itemsIds.filter((itemId)=>existingitemsIds.includes(itemId));
        if (duplicates.length > 0) {
            this.logger.warn(`Games with IDs ${duplicates} are already in the wishlist`);
            throw new _common.BadRequestException(`Games with IDs ${duplicates} are already in the wishlist for user with ID: ${userId}`);
        }
        // Check if any of the items does not exist
        await this.game.getByIds(itemsIds);
        // Add the games to the user's wishlist
        await this.user.addItemsToWishlist(userId, itemsIds);
        // Return the result
        this.logger.log(`Games added to wishlist successfully for user with ID: ${userId}`);
        return {
            message: 'Games added to wishlist successfully'
        };
    }
    /**
   * Removes items from the user's wishlist.
   * @param data - An object containing the user's ID and a list of item IDs to remove from the wishlist.
   * @returns A message indicating the success of the operation.
   */ async removeFromWishlist(data) {
        const { itemsIds, userId } = data;
        this.logger.log(`Removing games with IDs ${itemsIds} from wishlist for user with ID: ${userId}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Remove the games from the user's wishlist
        await this.user.removeItemsFromWishlist(userId, itemsIds);
        // Return the result
        this.logger.log(`Games removed from wishlist successfully for user with ID: ${userId}`);
        return {
            message: 'Games removed from wishlist successfully'
        };
    }
    /**
   * Clears user's wishlist.
   * @param data - An object containing the user's ID
   * @returns A message indicating the success of the operation.
   */ async clearWishlist(data) {
        const { userId } = data;
        this.logger.log(`Clearing wishlist for user with ID: ${userId}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Clear the user's wishlist
        await this.user.clearWishlist(userId);
        // Return the result
        this.logger.log(`Wishlist cleared successfully for user with ID: ${userId}`);
        return {
            message: 'Wishlist cleared successfully'
        };
    }
    /**
   * Adds items to the user's cart.
   * @param data - An object containing the user's ID and a list of item IDs to add to the cart.
   * @returns A message indicating the success of the operation.
   * @throws `BadRequestException` If any of the items are already in the user's cart.
   */ async addToCart(data) {
        const { itemsIds, userId } = data;
        this.logger.log(`Adding games with IDs ${itemsIds} to cart for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Check if all the games are already in the user's wishlist
        const existingitemsIds = user.cart.map((cartItem)=>cartItem.id);
        const duplicates = itemsIds.filter((itemId)=>existingitemsIds.includes(itemId));
        if (duplicates.length > 0) {
            this.logger.warn(`Games with IDs ${duplicates} are already in the cart`);
            throw new _common.BadRequestException(`Games with IDs ${duplicates} are already in the cart for user with ID: ${userId}`);
        }
        // Check if any of the items does not exist
        await this.game.getByIds(itemsIds);
        // Remove items from the user's wishlist if they exist in the wishlist
        const currentWishlist = user.wishlist.map((item)=>item.id);
        const existingWishlistItems = itemsIds.filter((itemId)=>currentWishlist.includes(itemId));
        await this.user.removeItemsFromWishlist(userId, existingWishlistItems);
        // Add the games to the user's cart
        await this.user.addItemsToCart(userId, itemsIds);
        // Return the result
        this.logger.log(`Games added to cart successfully for user with ID: ${userId}`);
        return {
            message: `Games added to cart successfully`
        };
    }
    /**
   * Removes items from the user's cart.
   * @param data - An object containing the user's ID and a list of item IDs to remove from the cart.
   * @returns A message indicating the success of the operation.
   */ async removeFromCart(data) {
        const { itemsIds, userId } = data;
        this.logger.log(`Removing games with IDs ${itemsIds} from cart for user with ID: ${userId}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Remove the games from the user's cart
        await this.user.removeItemsFromCart(userId, itemsIds);
        // Return the result
        this.logger.log(`Games removed from cart successfully for user with ID: ${userId}`);
        return {
            message: 'Games removed from cart successfully'
        };
    }
    /**
   * Clears user's cart.
   * @param data - An object containing the user's ID
   * @returns A message indicating the success of the operation.
   */ async clearCart(data) {
        const { userId } = data;
        this.logger.log(`Clearing cart for user with ID: ${userId}`);
        // Check if user exists
        await this.userTools.findUser(userId, 'id');
        // Clear the user's cart
        await this.user.clearCart(userId);
        // Return the result
        this.logger.log(`Cart cleared successfully for user with ID: ${userId}`);
        return {
            message: 'Cart cleared successfully'
        };
    }
    /**
   * Returns user's library
   * @param data - An object containing the user's ID
   * @returns The user's library
   */ async getLibrary(data) {
        const { userId } = data;
        this.logger.log(`Getting library for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Return the user's library
        this.logger.log(`Library retrieved successfully for user with ID: ${userId}`);
        return user.library;
    }
    /**
   * Returns user's wishlist
   * @param data - An object containing the user's ID
   * @returns The user's wishlist
   */ async getWishlist(data) {
        const { userId } = data;
        this.logger.log(`Getting wishlist for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Return the user's wishlist
        this.logger.log(`Wishlist retrieved successfully for user with ID: ${userId}`);
        return user.wishlist;
    }
    /**
   * Returns user's cart
   * @param data - An object containing the user's ID
   * @returns The user's cart
   */ async getCart(data) {
        const { userId } = data;
        this.logger.log(`Getting cart for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Return the user's cart
        this.logger.log(`Cart retrieved successfully for user with ID: ${userId}`);
        return user.cart;
    }
    /**
   * Reviews a game
   * @param data - An object containing the user's ID, the game ID, and the review content
   * @returns A success message
   */ async reviewGame(data) {
        const { userId, gameId, positive, content } = data;
        this.logger.log(`Reviewing game with ID: ${gameId} for user with ID: ${userId}`);
        // Create the review
        await this.review.create({
            userId,
            gameId,
            positive,
            content
        });
        // Return the result
        this.logger.log(`Game reviewed successfully for user with ID: ${userId}`);
        return {
            message: 'Game reviewed successfully'
        };
    }
    /**
   * Updates a review
   * @param data - An object containing the user's ID, the review ID, and the new review content
   * @returns A success message
   */ async updateReview(data) {
        const { reviewId, positive, content } = data;
        this.logger.log(`Editing review with ID: ${reviewId}`);
        // Update the review
        await this.review.update(reviewId, {
            positive,
            content
        });
        // Return the result
        this.logger.log(`Review updated successfully for review with ID: ${reviewId}`);
        return {
            message: 'Review updated successfully'
        };
    }
    /**
   * Checks if a user has reviewed a game
   * @param data - An object containing the user's ID and the game ID
   * @returns A boolean indicating whether the user has reviewed the game
   */ async hasReviewedGame(data) {
        const { userId, gameId } = data;
        this.logger.log(`Checking if user with ID: ${userId} has reviewed game with ID: ${gameId}`);
        // Check if the user has reviewed the game
        const hasReviewed = await this.review.hasUserReviewedGame(userId, gameId);
        // Return the result
        this.logger.log(`User has reviewed game successfully for user with ID: ${userId}`);
        return {
            reviewed: hasReviewed.reviewed,
            review: hasReviewed.review
        };
    }
    /**
   * Returns user's reviews
   * @param data - An object containing the user's ID
   * @returns The user's reviews
   */ async getReviews(data) {
        const { userId } = data;
        this.logger.log(`Getting reviews for user with ID: ${userId}`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id', true);
        // Return the user's reviews
        this.logger.log(`Reviews retrieved successfully for user with ID: ${userId}`);
        return user.reviews;
    }
};
InteractionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _gamesservice.GamesService === "undefined" ? Object : _gamesservice.GamesService,
        typeof _reviewsservice.ReviewsService === "undefined" ? Object : _reviewsservice.ReviewsService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], InteractionService);

//# sourceMappingURL=interaction.service.js.map