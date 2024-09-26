// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Services
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';

// Types
import type { Review } from '@repositories/sql/reviews/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly logger: Logger,
    private readonly review: ReviewsService,
  ) {}

  /**
   * Get paginated reviews
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated reviews and the total number of reviews
   */
  public async getReviewsPaginated(
    page: number,
    limit: number,
    orderBy: 'id' | 'username' | 'gameName' | 'content' | 'rating',
    order: 'ASC' | 'DESC',
    searchQuery: { username?: string; gameName?: string; content?: string },
  ): Promise<{ items: Review[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving reviews, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`,
    );

    // Send the paginated reviews
    return await this.review.getReviewsPaginated(page, limit, orderBy, order, searchQuery);
  }

  /**
   * Delete review
   * @param id - The ID of the review
   * @returns A message indicating the success of the delete
   */
  public async deleteReview(id: number): Promise<{ message: string }> {
    this.logger.log(`Deleting review with ID ${id}`);

    // Delete the review
    await this.review.remove(id);

    // Send a success message
    return { message: 'Review deleted successfully' };
  }
}
