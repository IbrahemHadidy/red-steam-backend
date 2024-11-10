// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Services
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { GamesService } from '@repositories/sql/games/games.service';

// Types
import type { Game } from '@repositories/sql/games/game.entity';

@Injectable()
export class OfferService {
  constructor(
    private readonly logger: Logger,
    private readonly game: GamesService,
    private readonly pricing: GamesPricingService,
  ) {}

  /**
   * Create a new offer
   * @param data - The data of the offer to be created
   * @returns A message indicating that the offer was created
   */
  public async createOffer(data: {
    gameId: number;
    discountPrice: string;
    discountStartDate: Date;
    discountEndDate: Date;
    offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  }): Promise<{ message: string }> {
    const { gameId, discountPrice, discountStartDate, discountEndDate, offerType } = data;
    this.logger.log(`Creating offer for game with ID ${gameId}`);

    // Update the game's pricing to include the offer
    await this.pricing.update(gameId, {
      free: false,
      discount: true,
      discountPrice,
      discountStartDate,
      discountEndDate,
      offerType,
    });

    // Return a success message
    return { message: 'Offer created successfully' };
  }

  /**
   * Get paginated offers
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns An object containing the paginated offers and the total number of offers
   */
  public async getOffersPaginated(
    page: number,
    limit: number,
    orderBy:
      | 'id'
      | 'name'
      | 'discountPrice'
      | 'basePrice'
      | 'discountPercentage'
      | 'offerType'
      | 'discountStartDate'
      | 'discountEndDate',
    order: 'ASC' | 'DESC',
    searchQuery: { name?: string },
  ): Promise<{ items: Game[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving offers, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`,
    );

    // Get features paginated and return them if they exist
    return await this.game.getGamesPaginated(page, limit, orderBy, order, true, searchQuery);
  }

  /**
   * Updates an offer
   * @param data - The data of the offer to be updated
   * @returns A message indicating that the offer was updated
   */
  public async updateOffer(data: {
    gameId: number;
    discountPrice?: string;
    discountStartDate?: Date;
    discountEndDate?: Date;
    offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  }): Promise<{ message: string }> {
    const { gameId, discountPrice, discountStartDate, discountEndDate, offerType } = data;
    this.logger.log(`Creating offer for game with ID ${gameId}`);

    // Update the game's pricing to include the new offer details
    await this.pricing.update(gameId, { free: false, discountPrice, discountStartDate, discountEndDate, offerType });

    // Return a success message
    return { message: 'Offer updated successfully' };
  }

  /**
   * Delete offer by game ID
   * @param gameId The ID of the game
   * @returns A message indicating the success of the operation
   */
  public async delete(gameId: number): Promise<{ message: string }> {
    this.logger.log(`Deleting offer with game ID: ${gameId}`);

    // Update the game's pricing to remove the offer
    await this.pricing.update(gameId, {
      discountPrice: null,
      discountStartDate: null,
      discountEndDate: null,
      offerType: null,
    });

    // Return a success message
    return { message: 'Offer deleted successfully' };
  }
}
