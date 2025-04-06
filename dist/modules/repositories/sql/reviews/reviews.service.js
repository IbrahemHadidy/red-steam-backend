// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReviewsService", {
    enumerable: true,
    get: function() {
        return ReviewsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _gamesservice = require("../games/games.service");
const _usersservice = require("../users/users.service");
const _reviewentity = require("./review.entity");
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
let ReviewsService = class ReviewsService {
    constructor(logger, reviewRepository, gamesService, usersService){
        this.logger = logger;
        this.reviewRepository = reviewRepository;
        this.gamesService = gamesService;
        this.usersService = usersService;
        this.relations = {
            user: true,
            game: true
        };
    }
    /**
   * Get all reviews with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */ async getAll(orderBy, order) {
        this.logger.log('Getting all reviews');
        // Build order options
        const orderOptions = this.createOrderOptions(orderBy, order);
        // Get all reviews
        const reviews = await this.reviewRepository.find({
            relations: this.relations,
            order: orderOptions
        });
        // Return reviews
        return reviews;
    }
    /**
   * Get all positive reviews with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */ async getAllPositive(orderBy, order) {
        this.logger.log('Getting all positive reviews');
        // Build order options
        const orderOptions = this.createOrderOptions(orderBy, order);
        // Get all positive reviews
        const reviews = await this.reviewRepository.find({
            where: {
                positive: true
            },
            relations: this.relations,
            order: orderOptions
        });
        // Return reviews
        return reviews;
    }
    /**
   * Get all negative reviews with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */ async getAllNegative(orderBy, order) {
        this.logger.log('Getting all negative reviews');
        // Build order options
        const orderOptions = this.createOrderOptions(orderBy, order);
        // Get all negative reviews
        const reviews = await this.reviewRepository.find({
            where: {
                positive: false
            },
            relations: this.relations,
            order: orderOptions
        });
        // Return reviews
        return reviews;
    }
    /**
   * Get a review by ID.
   * @param id - The ID of the review.
   * @returns A promise of the review.
   */ async getById(id) {
        this.logger.log(`Getting review with ID ${id}`);
        // Get the review by ID
        const review = await this.reviewRepository.findOne({
            where: {
                id
            },
            relations: this.relations
        });
        // Throw a not found exception if the review is not found
        if (!review) throw new _common.NotFoundException(`Review with ID ${id} not found`);
        // Return the review
        return review;
    }
    /**
   * Get reviews by game ID with dynamic ordering.
   * @param id - The game ID.
   * @param filter - The filter to apply.
   * @param sort - The sort order.
   * @param pagination - The pagination options.
   * @returns A promise of an array of reviews.
   */ async getByGameId(id, filter, sort, pagination) {
        this.logger.log(`Getting reviews for game with ID ${id}`);
        // Create the where condition based on the filter
        const whereCondition = {
            game: {
                id
            }
        };
        // Add the filter to the where condition
        if (filter === 'positive') {
            whereCondition.positive = true;
        } else if (filter === 'negative') {
            whereCondition.positive = false;
        } else if (filter === 'all') {
        // Do nothing
        }
        // Add the sort to the where condition
        const reviews = await this.reviewRepository.find({
            where: whereCondition,
            relations: {
                game: true,
                user: true
            },
            order: {
                date: sort === 'newest' ? 'DESC' : 'ASC'
            },
            skip: pagination.offset,
            take: pagination.limit
        });
        // Return reviews
        return reviews;
    }
    /**
   * Get reviews by user ID with dynamic ordering.
   * @param id - The user ID.
   * @param filter - The filter to apply.
   * @param sort - The sort order.
   * @param pagination - The pagination options.
   * @returns A promise of an array of reviews.
   */ async getByUserId(id, filter, sort, pagination) {
        this.logger.log(`Getting reviews for user with ID ${id}`);
        // Create the where condition based on the filter
        const whereCondition = {
            user: {
                id
            }
        };
        // Add the filter to the where condition
        if (filter === 'positive') {
            whereCondition.positive = true;
        } else if (filter === 'negative') {
            whereCondition.positive = false;
        }
        // Add the sort to the where condition
        const reviews = await this.reviewRepository.find({
            where: whereCondition,
            relations: {
                user: true
            },
            order: {
                date: sort === 'newest' ? 'DESC' : 'ASC'
            },
            skip: pagination.offset,
            take: pagination.limit
        });
        // Return reviews
        return reviews;
    }
    /**
   * Gets paginated reviews.
   * @param page - The current page number.
   * @param limit - The number of items per page.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @param searchQuery - The search query.
   * @returns A promise that resolves to the paginated reviews.
   */ async getReviewsPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Getting reviews paginated: page ${page}, limit ${limit}, order by ${orderBy} ${order}`);
        // Create the where condition
        const where = {};
        if (searchQuery?.username) {
            where.user = {
                username: (0, _typeorm1.ILike)(`%${searchQuery.username}%`)
            };
        }
        if (searchQuery?.gameName) {
            where.game = {
                name: (0, _typeorm1.ILike)(`%${searchQuery.gameName}%`)
            };
        }
        if (searchQuery?.content) {
            where.content = (0, _typeorm1.ILike)(`%${searchQuery.content}%`);
        }
        // Create the order options
        const orderOptions = {};
        if (orderBy === 'id') {
            orderOptions.id = order;
        } else if (orderBy === 'username') {
            orderOptions.user = {
                username: order
            };
        } else if (orderBy === 'gameName') {
            orderOptions.game = {
                name: order
            };
        } else if (orderBy === 'content') {
            orderOptions.content = order;
        } else if (orderBy === 'rating') {
            orderOptions.positive = order;
        }
        // Get the reviews
        const [items, total] = await this.reviewRepository.findAndCount({
            where,
            relations: this.relations,
            order: orderOptions,
            skip: Math.max((page - 1) * limit, 0),
            take: limit
        });
        // Calculate the total number of pages
        const totalPages = Math.ceil(total / limit);
        // Return the paginated reviews and total number of pages
        return {
            items,
            total,
            totalPages
        };
    }
    /**
   * Check if a user has reviewed a game.
   * @param userId - The ID of the user.
   * @param gameId - The ID of the game.
   * @returns A promise of a boolean indicating if the user has reviewed the game.
   */ async hasUserReviewedGame(userId, gameId) {
        this.logger.log(`Checking if user with ID ${userId} has reviewed game with ID ${gameId}`);
        // Check if the review exists
        const review = await this.reviewRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                game: {
                    id: gameId
                }
            },
            relations: {
                user: true,
                game: true
            }
        });
        // Return true if the review exists
        return {
            reviewed: !!review,
            review
        };
    }
    /**
   * Create a new review.
   * @param review - The review to create.
   * @returns A promise of the created review.
   * @throws `BadRequestException` if the game has already been reviewed by the user.
   */ async create(review) {
        this.logger.log(`Creating review for game with ID ${review.gameId}`);
        // Validate the content
        await this.validateContent(review.content);
        // Get the game and user
        const game = await this.gamesService.getById(review.gameId);
        const user = await this.usersService.getById(review.userId);
        // Check if the game has already been reviewed
        const existingReview = await this.reviewRepository.findOne({
            where: {
                user: {
                    id: review.userId
                },
                game: {
                    id: review.gameId
                }
            },
            relations: {
                user: true,
                game: true
            }
        });
        if (existingReview) throw new _common.ConflictException('You have already reviewed this game');
        // Create and save the new review
        const newReview = this.reviewRepository.create({
            positive: review.positive,
            content: review.content
        });
        newReview.user = user;
        newReview.game = game;
        const result = this.reviewRepository.save(newReview);
        // If the review was not created, throw an exception
        if (!result) throw new _common.InternalServerErrorException(`Failed to create review for game ${review.gameId}`);
        // Return the review
        return result;
    }
    /**
   * Update a review.
   * @param id - The ID of the review to update.
   * @param review - The updated review.
   * @returns A promise of the updated review.
   * @throws `NotFoundException` if the review does not exist.
   */ async update(id, review) {
        this.logger.log(`Updating review with ID ${id}`);
        // Check if the review exists
        const existingReview = await this.reviewRepository.findOne({
            where: {
                id
            },
            relations: {
                user: true,
                game: true
            }
        });
        if (!existingReview) throw new _common.NotFoundException(`Review with ID ${id} not found`);
        // Validate the content
        await this.validateContent(review.content);
        // Update the review
        existingReview.date = new Date();
        existingReview.positive = review.positive;
        existingReview.content = review.content;
        // Save the review
        const result = this.reviewRepository.save(existingReview);
        // If the review was not updated, throw an exception
        if (!result) throw new _common.InternalServerErrorException(`Failed to update review with ID ${id}`);
        // Return the review
        return result;
    }
    /**
   * Delete a review.
   * @param id - The ID of the review to delete.
   * @returns A promise of the deleted review.
   * @throws `NotFoundException` if the review does not exist.
   */ async remove(id) {
        this.logger.log(`Deleting review with ID ${id}`);
        // Check if the review exists
        const existingReview = await this.reviewRepository.findOne({
            where: {
                id
            },
            relations: {
                user: true,
                game: true
            }
        });
        if (!existingReview) throw new _common.NotFoundException(`Review with ID ${id} not found`);
        // Delete the review
        const result = await this.reviewRepository.delete({
            id
        });
        // If the review was not deleted, throw an exception
        if (!result.affected) throw new _common.InternalServerErrorException('Failed to delete review');
        // Return the deleted review
        return existingReview;
    }
    /**
   * Delete all user reviews.
   * @param userId - The ID of the user to delete reviews for.
   * @throws `NotFoundException` if the user does not exist.
   * @throws `InternalServerErrorException` if the deletion fails.
   */ async removeAllUserReviews(userId) {
        this.logger.log(`Deleting all reviews for user with ID ${userId}`);
        // Check if the user exists
        const user = await this.usersService.getById(userId);
        // If the user does not exist, throw an exception
        if (!user) throw new _common.NotFoundException(`User with ID ${userId} not found`);
        // Delete the reviews
        const result = await this.reviewRepository.delete({
            user: {
                id: userId
            }
        });
        // If the reviews were not deleted, throw an exception
        if (result.affected === undefined) throw new _common.InternalServerErrorException('Failed to delete reviews');
    }
    /**
   * Delete all game reviews.
   * @param gameId - The ID of the game to delete reviews for.
   * @throws `InternalServerErrorException` if the deletion fails.
   */ async removeAllGameReviews(gameId) {
        this.logger.log(`Deleting all reviews for game with ID ${gameId}`);
        // Check if the game exists
        await this.gamesService.getById(gameId);
        // Delete the reviews
        const result = await this.reviewRepository.delete({
            game: {
                id: gameId
            }
        });
        // If the reviews were not deleted, throw an exception
        if (result.affected === undefined) throw new _common.InternalServerErrorException('Failed to delete reviews');
    }
    /**
   * Delete all reviews.
   * @throws `InternalServerErrorException` if the deletion fails.
   */ async removeAll() {
        this.logger.log('Deleting all reviews');
        // Delete the reviews
        const result = await this.reviewRepository.delete({});
        // If the reviews were not deleted, throw an exception
        if (result.affected === undefined) throw new _common.InternalServerErrorException('Failed to delete reviews');
    }
    /**
   * Create a query builder with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A query builder with dynamic ordering.
   */ createOrderOptions(orderBy, order) {
        // Build order options
        const orderOptions = {};
        if (orderBy === 'user') {
            orderOptions['user.username'] = order;
        } else if (orderBy === 'game') {
            orderOptions['game.name'] = order;
        } else {
            orderOptions[orderBy] = order;
        }
        // Return order options
        return orderOptions;
    }
    /**
   * Validate the content of a review.
   * @param content - The content of the review.
   * @throws `BadRequestException` if the content is invalid.
   */ async validateContent(content) {
        // If content is more than 500 characters or less than 10 characters, throw a bad request exception
        if (content.length > 500) throw new _common.BadRequestException('Review content must be less than 500 characters long');
        if (content.length < 10) throw new _common.BadRequestException('Review content must be at least 10 characters long');
    }
};
ReviewsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_reviewentity.Review, 'sql')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _gamesservice.GamesService === "undefined" ? Object : _gamesservice.GamesService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], ReviewsService);

//# sourceMappingURL=reviews.service.js.map