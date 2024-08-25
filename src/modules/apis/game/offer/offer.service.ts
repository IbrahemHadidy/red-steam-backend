import { Injectable, Logger } from '@nestjs/common';

import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';

@Injectable()
export class OfferService {
  constructor(
    private readonly logger: Logger,
    private readonly pricing: GamesPricingService,
  ) {}

  /**
   * Create a new offer
   * @param data - The data of the offer to be created
   */
  public async createOffer(data: {
    gameId: number;
    discountPrice: number;
    discountStartDate: Date;
    discountEndDate: Date;
    offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  }): Promise<{ message: string }> {
    const { gameId, discountPrice, discountStartDate, discountEndDate, offerType } = data;
    this.logger.log(`Creating offer for game with ID ${gameId}`);
    await this.pricing.update(gameId, { free: false, discountPrice, discountStartDate, discountEndDate, offerType });
    return { message: 'Offer created successfully' };
  }

  /**
   * Updates an offer
   * @param data - The data of the offer to be updated
   */
  public async updateOffer(data: {
    gameId: number;
    discountPrice?: number;
    discountStartDate?: Date;
    discountEndDate?: Date;
    offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  }): Promise<{ message: string }> {
    const { gameId, discountPrice, discountStartDate, discountEndDate, offerType } = data;
    this.logger.log(`Creating offer for game with ID ${gameId}`);
    await this.pricing.update(gameId, { free: false, discountPrice, discountStartDate, discountEndDate, offerType });
    return { message: 'Offer created successfully' };
  }

  /**
   * Delete offer by game ID
   * @param gameId The ID of the game
   * @returns A message indicating the success of the operation
   */
  public async delete(gameId: number): Promise<{ message: string }> {
    this.logger.log(`Deleting offer with game ID: ${gameId}`);
    await this.pricing.update(gameId, { discountPrice: null, discountStartDate: null, discountEndDate: null, offerType: null });
    return { message: 'Offer deleted successfully' };
  }
}
