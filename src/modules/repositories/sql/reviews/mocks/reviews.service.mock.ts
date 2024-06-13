import { Injectable, BadRequestException } from '@nestjs/common';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { GamesServiceMock } from '@repositories/sql/games/mocks/games.service.mock';
import { UsersServiceMock } from '@repositories/sql/users/mocks/users.service.mock';
import { Review } from '@repositories/sql/reviews/review.entity';

@Injectable()
export class ReviewsServiceMock implements Partial<ReviewsService> {
  public reviews: Review[] = [];
  private readonly gamesService: GamesServiceMock;
  private readonly usersService: UsersServiceMock;

  constructor() {
    this.gamesService = new GamesServiceMock();
    this.usersService = new UsersServiceMock();
  }

  private sortReviews(a: Review, b: Review, orderBy: string, order: string): number {
    if (orderBy === 'date') {
      const dateA = a.date.toLocaleString();
      const dateB = b.date.toLocaleString();
      return order === 'ASC' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
    } else if (orderBy === 'positive') {
      return order === 'ASC' ? Number(a.positive) - Number(b.positive) : Number(b.positive) - Number(a.positive);
    } else if (orderBy === 'user') {
      return order === 'ASC'
        ? a.user.username.localeCompare(b.user.username)
        : b.user.username.localeCompare(a.user.username);
    } else if (orderBy === 'game') {
      return order === 'ASC' ? a.game.name.localeCompare(b.game.name) : b.game.name.localeCompare(a.game.name);
    }
    // Default sorting logic
    return 0;
  }

  private async validateContent(content: string) {
    if (content.length > 500) {
      throw new BadRequestException('Review content must be less than 500 characters long');
    }
    if (content.length < 10) {
      throw new BadRequestException('Review content must be at least 10 characters long');
    }
  }

  public async getAll(): Promise<Review[]> {
    return this.reviews;
  }

  public async getAllPositive(
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    const sortedReviews = this.reviews
      .filter((review) => review.positive)
      .sort((a, b) => this.sortReviews(a, b, orderBy, order));

    return sortedReviews;
  }

  public async getAllNegative(
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    const sortedReviews = this.reviews
      .filter((review) => !review.positive)
      .sort((a, b) => this.sortReviews(a, b, orderBy, order));

    return sortedReviews;
  }

  public async getById(reviewId: number): Promise<Review> {
    const review = this.reviews.find((review) => review.id === reviewId);
    if (!review) {
      return null;
    }
    return review;
  }

  public async getByGameId(
    id: number,
    filter: 'positive' | 'negative' | 'all',
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    let filteredReviews = this.reviews.filter((review) => review.game.id === id);

    if (filter === 'positive') {
      filteredReviews = filteredReviews.filter((review) => review.positive);
    } else if (filter === 'negative') {
      filteredReviews = filteredReviews.filter((review) => !review.positive);
    }

    const sortedReviews = filteredReviews.sort((a, b) => this.sortReviews(a, b, orderBy, order));

    return sortedReviews;
  }

  public async getByUserId(
    id: string,
    filter: 'positive' | 'negative' | 'all',
    orderBy: 'date' | 'positive' | 'user' | 'game',
    order: 'ASC' | 'DESC',
  ): Promise<Review[]> {
    let filteredReviews = this.reviews.filter((review) => review.user.id === id);

    if (filter === 'positive') {
      filteredReviews = filteredReviews.filter((review) => review.positive);
    } else if (filter === 'negative') {
      filteredReviews = filteredReviews.filter((review) => !review.positive);
    }

    const sortedReviews = filteredReviews.sort((a, b) => this.sortReviews(a, b, orderBy, order));

    return sortedReviews;
  }

  public async create(review: { userId: string; gameId: number; positive: boolean; content: string }): Promise<Review> {
    // Validate the content
    await this.validateContent(review.content);

    // Check if the game and user exist
    const game = this.gamesService.getById(review.gameId);
    const user = this.usersService.getById(review.userId);

    if (!game || !user) {
      throw new BadRequestException('Invalid game ID or user ID');
    }

    // Check if the user has already reviewed the game
    const existingReview = this.reviews.find((r) => r.user.id === review.userId && r.game.id === review.gameId);
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this game');
    }

    // Create a new review
    const newReview: Review = {
      id: this.reviews.length + 1,
      positive: review.positive,
      content: review.content,
      date: new Date(),
      user: null,
      game: null,
      hasId: null,
      save: null,
      remove: null,
      softRemove: null,
      recover: null,
      reload: null,
    };

    this.reviews.push(newReview);

    return newReview;
  }

  public async update(id: number, review: { positive: boolean; content: string }): Promise<Review> {
    const existingReview = this.reviews.find((r) => r.id === id);
    if (!existingReview) {
      throw new BadRequestException(`Review with ID ${id} not found`);
    }

    await this.validateContent(review.content);

    existingReview.positive = review.positive;
    existingReview.content = review.content;
    existingReview.date = new Date();

    return existingReview;
  }

  public async remove(id: number): Promise<Review> {
    const index = this.reviews.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new BadRequestException(`Review with ID ${id} not found`);
    }

    const review = this.reviews[index];
    this.reviews.splice(index, 1);

    return review;
  }

  public async removeAllUserReviews(userId: string): Promise<void> {
    const reviewsToDelete = this.reviews.filter((r) => r.user.id === userId);
    reviewsToDelete.forEach((r) => {
      const index = this.reviews.indexOf(r);
      if (index !== -1) {
        this.reviews.splice(index, 1);
      }
    });
  }

  public async removeAllGameReviews(gameId: number): Promise<void> {
    const reviewsToDelete = this.reviews.filter((r) => r.game.id === gameId);
    reviewsToDelete.forEach((r) => {
      const index = this.reviews.indexOf(r);
      if (index !== -1) {
        this.reviews.splice(index, 1);
      }
    });
  }

  public async removeAll(): Promise<void> {
    this.reviews = [];
  }
}
