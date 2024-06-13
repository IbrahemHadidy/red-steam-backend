import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { Review } from '@repositories/sql/reviews/review.entity';
import { GamesService } from '@repositories/sql/games/games.service';
import { UsersService } from '@repositories/sql/users/users.service';

@Injectable()
export class ReviewsService {
  private readonly relations: string[];

  constructor(
    private readonly logger: Logger,
    @InjectRepository(Review, 'sql')
    private readonly reviewRepository: Repository<Review>,
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService
  ) {
    this.relations = ['user', 'game'];
  }

  /**
   * Create a query builder with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A query builder with dynamic ordering.
   */
  private createOrderOptions(
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): FindOptionsOrder<Review> {
    const orderOptions: FindOptionsOrder<Review> = {};
    if (orderBy === 'user') {
      orderOptions['user.username'] = order;
    } else if (orderBy === 'game') {
      orderOptions['game.name'] = order;
    } else {
      orderOptions[orderBy] = order;
    }
    return orderOptions;
  }

  /**
   * Validate the content of a review.
   * @param content - The content of the review.
   * @throws BadRequestException if the content is invalid.
   */
  private async validateContent(content: string) {
    if (content.length > 500) throw new BadRequestException('Review content must be less than 500 characters long');
    if (content.length < 10) throw new BadRequestException('Review content must be at least 10 characters long');
  }

  /**
   * Get all reviews with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */
  public async getAll(orderBy: 'date' | 'positive' | 'user' | 'game', order: 'ASC' | 'DESC'): Promise<Review[]> {
    // Log the initiation of getting all reviews
    this.logger.log('Getting all reviews');

    const orderOptions = this.createOrderOptions(orderBy, order);
    const reviews = await this.reviewRepository.find({ relations: this.relations, order: orderOptions });
    return reviews;
  }

  /**
   * Get all positive reviews with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */
  public async getAllPositive(
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    // Log the initiation of getting all positive reviews
    this.logger.log('Getting all positive reviews');

    const orderOptions = this.createOrderOptions(orderBy, order);
    const reviews = await this.reviewRepository.find({
      where: { positive: true },
      relations: this.relations,
      order: orderOptions,
    });
    return reviews;
  }

  /**
   * Get all negative reviews with dynamic ordering.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */
  public async getAllNegative(
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    // Log the initiation of getting all negative reviews
    this.logger.log('Getting all negative reviews');

    const orderOptions = this.createOrderOptions(orderBy, order);
    const reviews = await this.reviewRepository.find({
      where: { positive: false },
      relations: this.relations,
      order: orderOptions,
    });
    return reviews;
  }

  /**
   * Get a review by ID.
   * @param id - The ID of the review.
   * @returns A promise of the review.
   */
  public async getById(id: number): Promise<Review> {
    // Log the initiation of getting a review by ID
    this.logger.log(`Getting review with ID ${id}`);

    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!review) throw new NotFoundException(`Review with ID ${id} not found`);
    return review;
  }

  /**
   * Get reviews by game ID with dynamic ordering.
   * @param id - The game ID.
   * @param filter - The filter to apply.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */
  public async getByGameId(
    id: number,
    filter: 'positive' | 'negative' | 'all',
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    // Log the initiation of getting reviews by game ID
    this.logger.log(`Getting reviews for game with ID ${id}`);

    const orderOptions = this.createOrderOptions(orderBy, order);

    // Create the where condition based on the filter
    const whereCondition: FindOptionsWhere<Review> = { game: { id } };

    if (filter === 'positive') {
      whereCondition.positive = true;
    } else if (filter === 'negative') {
      whereCondition.positive = false;
    }

    const reviews = await this.reviewRepository.find({
      where: whereCondition,
      relations: this.relations,
      order: orderOptions,
    });

    return reviews;
  }

  /**
   * Get reviews by user ID with dynamic ordering.
   * @param id - The user ID.
   * @param filter - The filter to apply.
   * @param orderBy - The field to order by.
   * @param order - The order direction.
   * @returns A promise of an array of reviews.
   */
  public async getByUserId(
    id: string,
    filter: 'positive' | 'negative' | 'all',
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    // Log the initiation of getting reviews by user ID
    this.logger.log(`Getting reviews for user with ID ${id}`);

    const orderOptions = this.createOrderOptions(orderBy, order);
    
    // Create the where condition based on the filter
    const whereCondition: FindOptionsWhere<Review> = { user: { id } };

    if (filter === 'positive') {
      whereCondition.positive = true;
    } else if (filter === 'negative') {
      whereCondition.positive = false;
    }

    const reviews = await this.reviewRepository.find({
      where: whereCondition,
      relations: this.relations,
      order: orderOptions,
    });

    return reviews;
  }

  /**
   * Create a new review.
   * @param review - The review to create.
   * @returns A promise of the created review.
   * @throws BadRequestException if the game has already been reviewed by the user.
   */
  public async create(review: { userId: string; gameId: number; positive: boolean; content: string }): Promise<Review> {
    // Log the initiation of creating a review
    this.logger.log(`Creating review for game with ID ${review.gameId}`);

    // Validate the content
    await this.validateContent(review.content);

    // Get the game and user
    const game = await this.gamesService.getById(review.gameId);
    const user = await this.usersService.getById(review.userId);

    // Check if the game has already been reviewed
    const existingReview = await this.reviewRepository.findOne({
      where: { user: { id: review.userId }, game: { id: review.gameId } },
    });
    if (existingReview) throw new ConflictException('You have already reviewed this game');

    // Create and save the new review
    const newReview = this.reviewRepository.create({
      positive: review.positive,
      content: review.content,
    });
    newReview.user = user;
    newReview.game = game;
    const result = this.reviewRepository.save(newReview);
    if (!result) throw new InternalServerErrorException(`Failed to create review for game ${review.gameId}`);
    return result;
  }

  /**
   * Update a review.
   * @param id - The ID of the review to update.
   * @param review - The updated review.
   * @returns A promise of the updated review.
   * @throws NotFoundException if the review does not exist.
   */
  public async update(id: number, review: { positive: boolean; content: string }): Promise<Review> {
    // Log the initiation of updating a review
    this.logger.log(`Updating review with ID ${id}`);

    // Check if the review exists
    const existingReview = await this.reviewRepository.findOne({ where: { id } });
    if (!existingReview) throw new NotFoundException(`Review with ID ${id} not found`);

    // Validate the content
    await this.validateContent(review.content);

    // Update the review
    existingReview.date = new Date();
    existingReview.positive = review.positive;
    existingReview.content = review.content;

    // Save the review
    const result = this.reviewRepository.save(existingReview);
    if (!result) throw new InternalServerErrorException(`Failed to update review with ID ${id}`);
    return result;
  }

  /**
   * Delete a review.
   * @param id - The ID of the review to delete.
   * @returns A promise of the deleted review.
   * @throws NotFoundException if the review does not exist.
   */
  public async remove(id: number): Promise<Review> {
    // Log the initiation of deleting a review
    this.logger.log(`Deleting review with ID ${id}`);

    // Check if the review exists
    const existingReview = await this.reviewRepository.findOne({ where: { id } });
    if (!existingReview) throw new NotFoundException(`Review with ID ${id} not found`);

    // Delete the review
    const result = await this.reviewRepository.delete({ id });
    if (!result.affected) throw new InternalServerErrorException('Failed to delete review');
    return existingReview;
  }

  /**
   * Delete all user reviews.
   * @param userId - The ID of the user to delete reviews for.
   * @throws {NotFoundException} if the user does not exist.
   * @throws {InternalServerErrorException} if the deletion fails.
   */
  public async removeAllUserReviews(userId: string): Promise<void> {
    // Log the initiation of deleting all user reviews
    this.logger.log(`Deleting all reviews for user with ID ${userId}`);

    // Check if the user exists
    const user = await this.usersService.getById(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    const result = await this.reviewRepository.delete({ user: { id: userId } });
    if (result.affected === undefined) throw new InternalServerErrorException('Failed to delete reviews');
  }

  /**
   * Delete all game reviews.
   * @param gameId - The ID of the game to delete reviews for.
   * @throws {InternalServerErrorException} if the deletion fails.
   */
  public async removeAllGameReviews(gameId: number): Promise<void> {
    // Log the initiation of deleting all game reviews
    this.logger.log(`Deleting all reviews for game with ID ${gameId}`);

    // Check if the game exists
    await this.gamesService.getById(gameId);
    const result = await this.reviewRepository.delete({ game: { id: gameId } });
    if (result.affected === undefined) throw new InternalServerErrorException('Failed to delete reviews');
  }

  /**
   * Delete all reviews.
   * @throws {InternalServerErrorException} if the deletion fails.
   */
  public async removeAll(): Promise<void> {
    // Log the initiation of deleting all reviews
    this.logger.log('Deleting all reviews');
    
    const result = await this.reviewRepository.delete({});
    if (result.affected === undefined) throw new InternalServerErrorException('Failed to delete reviews');
  }
}
