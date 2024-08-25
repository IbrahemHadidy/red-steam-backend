import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsRelations, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { Game } from '@repositories/sql/games/game.entity';

@Injectable()
export class GamesPricingService {
  private readonly relations: FindOptionsRelations<GamePricing>;

  constructor(
    private readonly logger: Logger,
    @InjectRepository(GamePricing, 'sql')
    private readonly gamesPricingRepository: Repository<GamePricing>,
  ) {
    this.relations = { game: true };
  }

  /**
   * Update discount status based on current date
   * @param pricing GamePricing entity
   */
  private updateDiscountStatus(pricing: GamePricing): void {
    const currentDate = new Date();
    if (pricing.discount && pricing.discountEndDate && currentDate > pricing.discountEndDate) {
      pricing.discount = false;
      pricing.discountPrice = null;
      pricing.discountPercentage = null;
      pricing.discountStartDate = null;
      pricing.discountEndDate = null;
      pricing.offerType = null;
    }
  }

  /**
   * Validate pricing
   * @param pricing Pricing entity
   * @returns {Promise<void>} Promise that resolves when validation is successful
   * @throws {BadRequestException} If validation fails
   */
  private async validatePricing(pricing: {
    free: boolean;
    basePrice?: number;
    discount?: boolean;
    discountPrice?: number;
    discountStartDate?: Date;
    discountEndDate?: Date;
    offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
  }): Promise<void> {
    if (pricing.free && pricing.discount) throw new BadRequestException('Game is free, cannot have discount');

    if (!pricing.free) {
      if (!pricing.basePrice || pricing.basePrice <= 0)
        throw new BadRequestException('Game is not free, Base price is required, and must be greater than 0');
    }

    if (pricing.discount) {
      if (!pricing.discountPrice) throw new BadRequestException('Discount price is required');

      if (!pricing.discountStartDate) throw new BadRequestException('Discount start date is required');

      if (!pricing.discountEndDate) throw new BadRequestException('Discount end date is required');

      if (!pricing.offerType) throw new BadRequestException('Offer type is required');

      if (pricing.discountStartDate > pricing.discountEndDate)
        throw new BadRequestException('Discount start date cannot be greater than discount end date');

      if (pricing.discountEndDate < new Date())
        throw new BadRequestException('Discount end date cannot be less than current date');
    }
  }

  /**
   * Calculate discount percentage
   * @param discountPrice Discount price
   * @param basePrice Base price
   * @returns Discount percentage
   * @throws {BadRequestException} If base price is less than or equal to 0
   */
  private async calculateDiscountPercentage(discountPrice: number, basePrice: number) {
    if (!basePrice || basePrice === 0) {
      throw new BadRequestException('Base price must be greater than 0 to calculate discount percentage');
    }
    return ((basePrice - discountPrice) / basePrice) * 100;
  }

  /**
   * Get all pricing
   * @param sortBy Sort by
   * @param sortOrder Sort order
   * @returns {Promise<GamePricing[]>} Promise that resolves to an array of pricings
   */
  public async getAll(
    sortBy:
      | 'id'
      | 'basePrice'
      | 'discountPrice'
      | 'discountPercentage'
      | 'discountStartDate'
      | 'discountEndDate'
      | 'offerType',
    sortOrder: 'ASC' | 'DESC',
  ): Promise<GamePricing[]> {
    // Log the initiation of the pricing retrieval process
    this.logger.log(`Retrieving all pricings with sort order ${sortOrder} and sort by ${sortBy}`);

    const pricings = await this.gamesPricingRepository.find({
      relations: this.relations,
      order: { [sortBy]: sortOrder },
    });

    // Update discount status for each pricing
    pricings.forEach(this.updateDiscountStatus);

    return pricings;
  }

  /**
   * Get pricing by ID
   * @param id Pricing ID
   * @returns {Promise<GamePricing>} Promise that resolves to a pricing
   * @throws {NotFoundException} If pricing not found
   */
  public async getById(id: number): Promise<GamePricing> {
    // Log the initiation of the pricing retrieval process
    this.logger.log(`Retrieving pricing with ID ${id}`);

    const pricing = await this.gamesPricingRepository.findOne({ where: { id }, relations: this.relations });
    if (!pricing) throw new NotFoundException(`Pricing with ID ${id} not found`);

    // Update discount status for pricing
    this.updateDiscountStatus(pricing);

    return pricing;
  }

  /**
   * Get pricing by game ID
   * @param id Game ID
   * @returns Promise<GamePricing>
   * @throws {NotFoundException} If pricing not found
   */
  public async getByGameId(id: number): Promise<GamePricing> {
    // Log the initiation of the pricing retrieval process
    this.logger.log(`Retrieving pricing for game with ID ${id}`);

    const pricing = await this.gamesPricingRepository.findOne({ where: { game: { id } }, relations: this.relations });
    if (!pricing) throw new NotFoundException(`Pricing for game with ID ${id} not found`);

    // Update discount status for pricing
    this.updateDiscountStatus(pricing);

    return pricing;
  }

  /**
   * Get games by pricing
   * @param options Options
   * @returns {Promise<Game[]>} Promise that resolves to an array of games
   */
  public async getGamesByPricing(options: {
    free: boolean;
    discount: boolean;
    sortBy:
      | 'id'
      | 'basePrice'
      | 'discountPrice'
      | 'discountPercentage'
      | 'discountStartDate'
      | 'discountEndDate'
      | 'offerType';
    sortOrder: 'ASC' | 'DESC';
    minPrice?: number;
    maxPrice?: number;
    skip?: number;
    take?: number;
  }): Promise<Game[]> {
    // Log the initiation of the games retrieval process
    this.logger.log(`Retrieving games by pricing with options ${JSON.stringify(options)}`);

    // Validate options
    if (options.free && options.discount)
      throw new BadRequestException(`Game can't be free and discounted at the same time`);

    // Build where conditions
    const whereConditions: FindOptionsWhere<GamePricing>[] = [];

    // Add where conditions
    if (options.discount) whereConditions.push({ discount: true });
    if (options.free) whereConditions.push({ free: true });

    // Add price range
    if (options.minPrice || options.maxPrice) {
      if (options.minPrice && options.maxPrice) {
        whereConditions.push(
          options.discount
            ? { discountPrice: Between(options.minPrice, options.maxPrice) }
            : { basePrice: Between(options.minPrice, options.maxPrice) },
        );
      } else if (options.minPrice) {
        whereConditions.push(
          options.discount
            ? { discountPrice: MoreThanOrEqual(options.minPrice) }
            : { basePrice: MoreThanOrEqual(options.minPrice) },
        );
      } else if (options.maxPrice) {
        whereConditions.push(
          options.discount
            ? { discountPrice: LessThanOrEqual(options.maxPrice) }
            : { basePrice: LessThanOrEqual(options.maxPrice) },
        );
      }
    }

    // Add pagination
    let skip: number;
    let take: number;
    if (options.skip || options.take) {
      skip = options.skip;
      take = options.take;
    }

    // Fetch pricings
    const pricings = await this.gamesPricingRepository.find({
      where: whereConditions.length > 0 ? whereConditions : {},
      relations: this.relations,
      order: { [options.sortBy]: options.sortOrder },
      skip,
      take,
    });

    return pricings.map((pricing) => pricing.game);
  }

  /**
   * Create pricing
   * @param pricing Pricing
   * @returns {Promise<GamePricing>} Promise that resolves when the creation is successful
   */
  public async create(pricing: {
    free: boolean;
    basePrice: number;
    discount?: boolean;
    discountPrice?: number;
    discountStartDate?: Date;
    discountEndDate?: Date;
    offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
    game: Game;
  }): Promise<GamePricing> {
    // Log the initiation of the pricing creation process
    this.logger.log(`Creating pricing for game with ID ${pricing.game.id}`);

    // Validate pricing
    await this.validatePricing({
      free: pricing.free,
      basePrice: pricing.basePrice,
      discount: pricing.discount,
      discountPrice: pricing.discountPrice,
      discountStartDate: pricing.discountStartDate,
      discountEndDate: pricing.discountEndDate,
      offerType: pricing.offerType,
    });

    // Calculate discount percentage
    const discountPercentage = pricing.discount
      ? await this.calculateDiscountPercentage(pricing.discountPrice, pricing.basePrice)
      : null;

    // Create new game pricing entity
    const createdPricing = this.gamesPricingRepository.create({
      free: pricing.free,
      basePrice: pricing.basePrice,
      discount: pricing.discount,
      discountPrice: pricing.discountPrice,
      discountStartDate: pricing.discountStartDate,
      discountEndDate: pricing.discountEndDate,
      offerType: pricing.offerType,
      discountPercentage,
      game: pricing.game,
    });

    // Update discount status
    this.updateDiscountStatus(createdPricing);

    // Save the pricing entity
    const result = await this.gamesPricingRepository.save(createdPricing);
    if (!result) throw new InternalServerErrorException('Failed to create pricing');
    return result;
  }

  /**
   * Update pricing
   * @param id Pricing ID
   * @param pricing Pricing
   * @returns {Promise<GamePricing>} Promise that resolves when the update is successful
   * @throws {NotFoundException} If pricing not found
   */
  public async update(
    id: number,
    pricing: {
      free?: boolean;
      basePrice?: number;
      discount?: boolean;
      discountPrice?: number;
      discountStartDate?: Date;
      discountEndDate?: Date;
      offerType?: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
    },
  ): Promise<GamePricing> {
    // Log the initiation of the pricing update process
    this.logger.log(`Updating pricing with ID ${id}`);

    // Check if pricing exists
    const existingPricing = await this.gamesPricingRepository.findOne({ where: { id } });
    if (!existingPricing) throw new NotFoundException(`Pricing with ID ${id} not found`);

    // Validate pricing
    await this.validatePricing({
      free: pricing.free,
      basePrice: pricing.basePrice,
      discount: pricing.discount,
      discountPrice: pricing.discountPrice,
      discountStartDate: pricing.discountStartDate,
      discountEndDate: pricing.discountEndDate,
      offerType: pricing.offerType,
    });

    // Calculate discount percentage
    const discountPercentage = pricing.discount
      ? await this.calculateDiscountPercentage(pricing.discountPrice, pricing.basePrice)
      : existingPricing.discountPercentage;

    // Update fields
    if (pricing.basePrice) existingPricing.basePrice = pricing.basePrice;
    if (discountPercentage) existingPricing.discountPercentage = discountPercentage;
    if (pricing.discountPrice) existingPricing.discountPrice = pricing.discountPrice;
    if (pricing.discountStartDate) existingPricing.discountStartDate = pricing.discountStartDate;
    if (pricing.discountEndDate) existingPricing.discountEndDate = pricing.discountEndDate;
    if (pricing.offerType) existingPricing.offerType = pricing.offerType;
    if (pricing.free) existingPricing.free = pricing.free;

    // Update discount status
    this.updateDiscountStatus(existingPricing);

    // Save changes
    const result = this.gamesPricingRepository.save(existingPricing);
    if (!result) throw new InternalServerErrorException(`Failed to update pricing with ID ${id}`);
    return result;
  }

  /**
   * Delete pricing
   * @param id Pricing ID
   * @returns {Promise<void>} Promise that resolves when the deletion is successful
   * @throws {NotFoundException} If pricing not found
   * @throws {InternalServerErrorException} If failed to delete
   */
  public async remove(id: number): Promise<GamePricing> {
    // Log the initiation of the pricing deletion process
    this.logger.log(`Deleting pricing with ID ${id}`);

    // Check if pricing exists
    const existingPricing = await this.gamesPricingRepository.findOne({ where: { id } });
    if (!existingPricing) throw new NotFoundException(`Pricing with ID ${id} not found`);
    const result = await this.gamesPricingRepository.remove(existingPricing);
    if (!result) throw new InternalServerErrorException(`Failed to delete pricing with ID ${id}`);
    return result;
  }

  /**
   * Delete all pricings
   * @returns {Promise<void>} Promise that resolves when the deletion is successful
   * @throws {InternalServerErrorException} If failed to delete
   */
  public async removeAll(): Promise<void> {
    // Log the initiation of the pricing deletion process
    this.logger.log('Deleting all pricings');

    const result = await this.gamesPricingRepository.delete({});
    if (result === undefined) throw new InternalServerErrorException('Failed to delete pricings');
  }
}
