// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersService", {
    enumerable: true,
    get: function() {
        return UsersService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _userentity = require("./user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let UsersService = class UsersService {
    constructor(logger, userRepository, gameTag){
        this.logger = logger;
        this.userRepository = userRepository;
        this.gameTag = gameTag;
        this.relations = {
            tags: true
        };
    }
    /**
   * Retrieves all users.
   * @param orderBy - The property to order by.
   * @param order - The order to use.
   * @return A Promise that resolves to an array of user entities.
   */ async getAll(orderBy, order) {
        this.logger.log(`Retrieving all users from the database`);
        // Retrieve all users
        const users = await this.userRepository.find({
            relations: this.relations,
            order: {
                [orderBy]: order
            }
        });
        // Return the users
        return users;
    }
    /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @return A Promise that resolves to the user entity.
   */ async getById(id, reviews) {
        this.logger.log(`Retrieving user with ID ${id} from the database`);
        // Get the user by ID
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                tags: true,
                reviews
            }
        });
        // Return the user
        return user;
    }
    /**
   * Retrieves a user by their username.
   * @param username - The username of the user to retrieve.
   * @return A Promise that resolves to the user entity or null if the user is not found.
   */ async getByUsername(username, reviews) {
        this.logger.log(`Retrieving user with username ${username} from the database`);
        // Get the user by username
        const user = await this.userRepository.findOne({
            where: {
                username
            },
            relations: {
                tags: true,
                reviews
            }
        });
        // Return the user
        return user;
    }
    /**
   * Retrieves a user by their email address.
   * @param email - The email address of the user to retrieve.
   * @param reviews - Whether to include reviews in the search.
   * @return A Promise that resolves to the user entity or null if the user is not found.
   */ async getByEmail(email, reviews) {
        this.logger.log(`Retrieving user with email ${email} from the database`);
        // Get the user by email
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            relations: {
                tags: true,
                reviews
            }
        });
        // Return the user
        return user;
    }
    /**
   * Retrieves a user by their email or username.
   * @param emailOrUsername - The email or username of the user to retrieve.
   * @return A Promise that resolves to the user entity or null if the user is not found.
   */ async getByEmailOrUsername(emailOrUsername, reviews) {
        this.logger.log(`Retrieving user with identifier: ${emailOrUsername} from the database`);
        // Get the user by email
        const user = await this.userRepository.findOne({
            where: [
                {
                    email: emailOrUsername
                },
                {
                    username: emailOrUsername
                }
            ],
            relations: {
                tags: true,
                reviews
            }
        });
        // Return the user
        return user;
    }
    /**
   * Retrieves a user by their verification token.
   * @param token - The verification token of the user to retrieve.
   * @return A Promise that resolves to the user entity or null if the user is not found.
   */ async getByVerificationToken(token) {
        this.logger.log(`Retrieving user with verification token ${token} from the database`);
        // Get the user by verification token
        const user = await this.userRepository.findOne({
            where: {
                verificationToken: token
            },
            relations: this.relations
        });
        // Return the user
        return user;
    }
    /**
   * Retrieves a user by their phone number.
   * @param phoneNumber - The phone number of the user to retrieve.
   * @return A Promise that resolves to the user entity.
   * @throws `NotFoundException` if the user with the specified phone number is not found.
   */ async getByPhoneNumber(phoneNumber) {
        this.logger.log(`Retrieving user with phone number ${phoneNumber} from the database`);
        // Get the user by phone number
        const user = await this.userRepository.findOne({
            where: {
                phoneNumber
            },
            relations: this.relations
        });
        // Return the user
        if (!user) throw new _common.NotFoundException(`User with phone number ${phoneNumber} not found`);
        // Return the user
        return user;
    }
    /**
   * Gets paginated user.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated users.
   */ async getUsersPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Getting users paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);
        // Create the where clause
        const where = {};
        if (searchQuery?.username) {
            where.username = (0, _typeorm1.ILike)(`%${searchQuery.username}%`);
        }
        if (searchQuery?.email) {
            where.email = (0, _typeorm1.ILike)(`%${searchQuery.email}%`);
        }
        // Create the order options
        const orderOptions = {};
        if (orderBy === 'username') {
            orderOptions.username = order;
        } else if (orderBy === 'email') {
            orderOptions.email = order;
        } else if (orderBy === 'country') {
            orderOptions.country = order;
            0;
        } else if (orderBy === 'isVerified') {
            orderOptions.isVerified = order;
        } else if (orderBy === 'isAdmin') {
            orderOptions.isAdmin = order;
        } else if (orderBy === 'createdAt') {
            orderOptions.createdAt = order;
        }
        // Get the users
        const [items, total] = await this.userRepository.findAndCount({
            where,
            relations: this.relations,
            order: orderOptions,
            skip: Math.max((page - 1) * limit, 0),
            take: limit
        });
        // Get the total number of pages
        const totalPages = Math.ceil(total / limit);
        // Return the users
        return {
            items,
            total,
            totalPages
        };
    }
    /**
   * Creates a new user.
   * @param user - The user entity to be created.
   * @return A Promise that resolves to the created user entity.
   * @throws `ConflictException` if the user already exists.
   * @throws `InternalServerErrorException` if the creation fails.
   */ async create(user) {
        this.logger.log(`Creating user with email ${user.email} in the database`);
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: [
                {
                    email: user.email
                },
                {
                    username: user.username
                }
            ]
        });
        if (existingUser) throw new _common.ConflictException('User already exists');
        // Initialize reviews as an empty array
        const newUser = new _userentity.User();
        newUser.email = user.email;
        newUser.username = user.username;
        newUser.country = user.country;
        newUser.password = user.password;
        newUser.reviews = [];
        // Save the user
        const createdUser = await this.userRepository.save(newUser);
        // Throw an exception if the user was not created
        if (!createdUser) throw new _common.InternalServerErrorException('Failed to create user');
        // Return the created user
        return createdUser;
    }
    /**
   * Updates a user entity with new attributes.
   * @param id - The ID of the user entity to update.
   * @param attrs - The partial attributes to update the user entity with.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user with the specified ID is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async update(id, attrs) {
        this.logger.log(`Updating user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        Object.assign(user, attrs);
        // Save the updated user
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Sets the login status of a user.
   * @param id - The ID of the user.
   * @param loggedIn - The login status to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async setLoginStatus(id, loggedIn) {
        this.logger.log(`Updating login status of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.isLoggedIn = loggedIn;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to Login user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the name of a user.
   * @param id - The ID of the user.
   * @param name - The new name to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async updateUsername(id, name) {
        this.logger.log(`Updating username of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.username = name;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the password of a user.
   * @param id - The ID of the user.
   * @param password - The new password to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async updatePassword(id, password) {
        this.logger.log(`Updating password of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.password = password;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the email of a user.
   * @param id - The ID of the user.
   * @param email - The new email to set.
   * @param setUnverified - Whether to set the email as unverified.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async updateEmail(id, email, setUnverified = false) {
        this.logger.log(`Updating email of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.email = email;
        user.isVerified = !setUnverified;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the country of a user.
   * @param id - The ID of the user.
   * @param country - The new country to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` Throws an InternalServerErrorException if the update fails.
   */ async updateCountry(id, country) {
        this.logger.log(`Updating country of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.country = country;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the verification token of a user.
   * @param id - The ID of the user.
   * @param token - The new verification token to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async updateVerificationToken(id, token) {
        this.logger.log(`Updating verification token of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.verificationToken = token;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the tags of a user.
   * @param id - The ID of the user.
   * @param tagsIds - The IDs of the new tags to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async updateUserTags(id, tagsIds) {
        this.logger.log(`Updating tags of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Fetch the GameTag objects based on the tagIds
        const tags = await this.gameTag.getByIds(tagsIds);
        // Save the updated user entity
        user.tags = tags;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Adds items to the user's library.
   * @param id - The ID of the user.
   * @param itemsIds - An array of item IDs to add to the library.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async addItemsToLibrary(id, itemsIds) {
        this.logger.log(`Adding items to library of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Create LibraryItem instances for each item ID
        const newItems = itemsIds.map((itemId)=>new _userentity.LibraryItem(itemId));
        // Add new items to the user's library
        user.library.push(...newItems);
        // Remove added items from wishlist if they exist
        const newItemsIds = newItems.map((item)=>item.id);
        user.cart = user.cart.filter((item)=>!newItemsIds.includes(item.id));
        user.wishlist = user.wishlist.filter((item)=>!newItemsIds.includes(item.id));
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Removes items from the user's library.
   * @param id - The ID of the user.
   * @param itemsIds - An array of item IDs to remove from the library.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` Throws a NotFoundException if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async removeItemsFromLibrary(id, itemsIds) {
        this.logger.log(`Removing items from library of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Throw an exception if user is not found
        if (!user) throw new _common.NotFoundException('User not found');
        // Filter out items with IDs included in the provided itemIds array
        const userItemsIds = user.library.map((item)=>item.id);
        // Throw an exception if any of the provided item IDs do not exist in the user's library
        const nonExistingItems = itemsIds.filter((itemId)=>!userItemsIds.includes(itemId));
        if (nonExistingItems.length > 0) {
            this.logger.error(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's library`);
            throw new _common.NotFoundException(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's library`);
        }
        // Remove items from the user's library based on their IDs
        user.library = user.library.filter((item)=>!itemsIds.includes(item.id));
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the user was not updated
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Clears the user's library.
   * @param id - The ID of the user.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async clearLibrary(id) {
        this.logger.log(`Clearing library of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Clear the user's library
        user.library = [];
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Adds items to the user's wishlist.
   * @param id - The ID of the user.
   * @param itemsIds - An array of item IDs to add to the wishlist.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async addItemsToWishlist(id, itemsIds) {
        this.logger.log(`Adding items to wishlist of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Create WishlistItem instances for each item ID
        const newItems = itemsIds.map((itemId)=>new _userentity.WishlistItem(itemId));
        // Add the new items to the user's wishlist
        user.wishlist.push(...newItems);
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Removes items from the user's wishlist.
   * @param id - The ID of the user.
   * @param itemsIds - An array of item IDs to remove from the wishlist.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async removeItemsFromWishlist(id, itemsIds) {
        this.logger.log(`Removing items from wishlist of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Filter out items with IDs included in the provided itemIds array
        const nonExistingItems = itemsIds.filter((itemId)=>!user.wishlist.map((item)=>item.id).includes(itemId));
        if (nonExistingItems.length > 0) {
            this.logger.error(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's wishlist`);
            throw new _common.NotFoundException(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's wishlist`);
        }
        // Remove items from the user's wishlist based on their IDs
        user.wishlist = user.wishlist.filter((item)=>!itemsIds.includes(item.id));
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Clears the user's wishlist.
   * @param id - The ID of the user.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async clearWishlist(id) {
        this.logger.log(`Clearing wishlist of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Clear the user's wishlist
        user.wishlist = [];
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Adds items to the user's cart.
   * @param id - The ID of the user.
   * @param itemsIds - An array of item IDs to add to the cart.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async addItemsToCart(id, itemsIds) {
        this.logger.log(`Adding items to cart of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Create CartItem instances for each item ID
        const newItems = itemsIds.map((itemId)=>new _userentity.CartItem(itemId));
        // Add the new items to the user's cart
        user.cart.push(...newItems);
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Removes items from the user's cart.
   * @param id - The ID of the user.
   * @param itemsIds - An array of item IDs to remove from the cart.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async removeItemsFromCart(id, itemsIds) {
        this.logger.log(`Removing items from cart of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Filter out items with IDs included in the provided itemIds array
        const cartItemsIds = user.cart.map((item)=>item.id);
        // Throw an exception if any of the provided item IDs do not exist in the user's cart
        const nonExistingItems = itemsIds.filter((itemId)=>!cartItemsIds.includes(itemId));
        if (nonExistingItems.length > 0) {
            this.logger.error(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's cart`);
            throw new _common.NotFoundException(`Items with IDs ${nonExistingItems.join(', ')} do not exist in the user's cart`);
        }
        // Remove items from the user's cart based on their IDs
        user.cart = user.cart.filter((item)=>!itemsIds.includes(item.id));
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Clears the user's cart.
   * @param id - The ID of the user.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async clearCart(id) {
        this.logger.log(`Clearing cart of user with ID ${id} in the database`);
        // Get the user by ID
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Clear the user's cart
        user.cart = [];
        // Save the updated user entity
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user entity
        return updatedUser;
    }
    /**
   * Updates the avatar of a user.
   * @param id - The ID of the user.
   * @param avatarId - The new avatar ID to set.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async updateAvatar(id, avatarId) {
        this.logger.log(`Updating avatar of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.profilePicture = avatarId;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Removes the avatar of a user.
   * @param id - The ID of the user.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the update fails.
   */ async removeAvatar(id) {
        this.logger.log(`Removing avatar of user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Update the user
        user.profilePicture = null;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Updates the isVerified status of a user.
   * @param id - The ID of the user.
   * @return A Promise that resolves to the updated user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `BadRequestException` if the user is already verified.
   * @throws `InternalServerErrorException` if the update fails.
   */ async verify(id) {
        this.logger.log(`Verifying user with ID ${id} in the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Throw an exception if user is already verified
        if (user.isVerified) throw new _common.BadRequestException('Email is already verified');
        // Update the user verification status
        user.isVerified = true;
        user.verificationToken = null;
        const updatedUser = await this.userRepository.save(user);
        // Throw an exception if the update fails
        if (!updatedUser) throw new _common.InternalServerErrorException('Failed to update user');
        // Return the updated user
        return updatedUser;
    }
    /**
   * Removes a user by their ID.
   * @param id - The ID of the user to be removed.
   * @return A Promise that resolves to the removed user entity.
   * @throws `NotFoundException` if the user is not found.
   * @throws `InternalServerErrorException` if the removal fails.
   */ async remove(id) {
        this.logger.log(`Removing user with ID ${id} from the database`);
        // Check if user exists
        const user = await this.getById(id);
        // Check if user exists
        if (!user) throw new _common.NotFoundException('User not found');
        // Remove the user
        const removedUser = await this.userRepository.remove(user);
        // Throw an exception if the removal fails
        if (!removedUser) throw new _common.InternalServerErrorException('Failed to remove user');
        // Return the removed user
        return removedUser;
    }
    /**
   * Removes all users from the database.
   * @return {Promise<void>} A Promise that resolves when the removal is successful.
   * @throws `InternalServerErrorException` if the removal fails.
   */ async removeAll() {
        this.logger.log('Removing all users from the database');
        // Remove all users
        const result = await this.userRepository.delete({});
        // Throw an exception if the removal fails
        if (!result) throw new _common.InternalServerErrorException('Failed to remove users');
    }
};
UsersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.User, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _gamestagsservice.GamesTagsService === "undefined" ? Object : _gamestagsservice.GamesTagsService
    ])
], UsersService);

//# sourceMappingURL=users.service.js.map