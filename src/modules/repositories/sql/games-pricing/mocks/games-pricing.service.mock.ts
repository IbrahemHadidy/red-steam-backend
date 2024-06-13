import { BadRequestException, NotFoundException } from "@nestjs/common";
import { GamePricing } from '@repositories/sql/games-pricing/game-pricing.entity';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';

export class GamesPricingServiceMock implements Partial<GamesPricingService> {
  private gamesPricing: GamePricing[] = [];

  private async validatePricing(pricing: {
    free: boolean;
    basePrice?: number;
    discount?: boolean;
    discountPrice: number;
    discountStartDate: Date;
    discountEndDate: Date;
    offerType: string;
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

      if (pricing.discountStartDate < new Date())
        throw new BadRequestException('Discount start date cannot be less than current date');

      if (pricing.discountEndDate < new Date())
        throw new BadRequestException('Discount end date cannot be less than current date');
    }
  }

  private async calculateDiscountPercentage(discountPrice: number, basePrice?: number) {
    if (!basePrice || basePrice === 0) {
      throw new BadRequestException('Base price must be greater than 0 to calculate discount percentage');
    }
    return ((basePrice - discountPrice) / basePrice) * 100;
  }

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
    // Sort function
    const sortFunction = (a: GamePricing, b: GamePricing): number => {
      switch (sortBy) {
        case 'basePrice':
          return sortOrder === 'ASC' ? a.basePrice - b.basePrice : b.basePrice - a.basePrice;
        case 'discountPrice':
          return sortOrder === 'ASC' ? a.discountPrice - b.discountPrice : b.discountPrice - a.discountPrice;
        case 'discountPercentage':
          return sortOrder === 'ASC'
            ? a.discountPercentage - b.discountPercentage
            : b.discountPercentage - a.discountPercentage;
        case 'discountStartDate':
          return sortOrder === 'ASC'
            ? a.discountStartDate.getTime() - b.discountStartDate.getTime()
            : b.discountStartDate.getTime() - a.discountStartDate.getTime();
        case 'discountEndDate':
          return sortOrder === 'ASC'
            ? a.discountEndDate.getTime() - b.discountEndDate.getTime()
            : b.discountEndDate.getTime() - a.discountEndDate.getTime();
        case 'offerType':
          return sortOrder === 'ASC' ? a.offerType.localeCompare(b.offerType) : b.offerType.localeCompare(a.offerType);
        default:
          return 0;
      }
    };

    // Sort the gamesPricing array
    this.gamesPricing.sort(sortFunction);

    // Return the sorted array
    return this.gamesPricing;
  }

  public async getById(id: number): Promise<GamePricing> {
    return this.gamesPricing.find((gamePricing) => gamePricing.id === id);
  }

  public async getByGameId(id: number): Promise<GamePricing> {
    return this.gamesPricing.find((gamePricing) => gamePricing.game.id === id);
  }

  public async getGamesByPricing(options: {
    free: boolean;
    discount: boolean;
    sortBy:
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
  }): Promise<any[]> {
    // Validate options
    if (options.free && options.discount) {
      throw new BadRequestException(`Game can't be free and discounted at the same time`);
    }

    // Filter gamesPricing based on options
    let filteredPricings = this.gamesPricing.filter((pricing) => {
      if (options.discount && !pricing.discount) return false;
      if (options.free && !pricing.free) return false;
      if (options.minPrice && pricing.basePrice < options.minPrice) return false;
      if (options.maxPrice && pricing.basePrice > options.maxPrice) return false;
      return true;
    });

    // Sort filteredPricings
    filteredPricings.sort((a, b) => {
      if (options.sortOrder === 'ASC') {
        if (a[options.sortBy] < b[options.sortBy]) return -1;
        if (a[options.sortBy] > b[options.sortBy]) return 1;
        return 0;
      } else {
        if (a[options.sortBy] > b[options.sortBy]) return -1;
        if (a[options.sortBy] < b[options.sortBy]) return 1;
        return 0;
      }
    });

    // Apply skip and take
    if (options.skip !== undefined && options.take !== undefined) {
      filteredPricings = filteredPricings.slice(options.skip, options.skip + options.take);
    }

    // Map to game objects
    const games = filteredPricings.map((pricing) => pricing.game);

    return games;
  }

  public async create(pricing: {
    free: boolean;
    basePrice: number;
    discount?: boolean;
    discountPrice?: number;
    discountStartDate?: Date;
    discountEndDate?: Date;
    offerType?: 'WEEKEND DEAL' | 'SPECIAL PROMOTION';
  }): Promise<GamePricing> {
    // Check if pricing exists
    const existingPricing = this.gamesPricing.find(
      (gamePricing) =>
        gamePricing.free === pricing.free &&
        gamePricing.basePrice === pricing.basePrice &&
        gamePricing.discount === pricing.discount &&
        gamePricing.discountPrice === pricing.discountPrice &&
        gamePricing.discountStartDate === pricing.discountStartDate &&
        gamePricing.discountEndDate === pricing.discountEndDate &&
        gamePricing.offerType === pricing.offerType,
    );
    if (!existingPricing) throw new NotFoundException(`Pricing not found`);

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

    const newPricing = new GamePricing();
    newPricing.free = pricing.free;
    newPricing.basePrice = pricing.basePrice;
    newPricing.discount = pricing.discount;
    newPricing.discountPercentage = discountPercentage;
    newPricing.discountPrice = pricing.discountPrice;
    newPricing.discountStartDate = pricing.discountStartDate;
    newPricing.discountEndDate = pricing.discountEndDate;
    newPricing.offerType = pricing.offerType;

    this.gamesPricing.push(newPricing);
    return newPricing;
  }

  public async update(
    id: number,
    pricing: {
      free: boolean;
      basePrice?: number;
      discount?: boolean;
      discountPrice?: number;
      discountStartDate?: Date;
      discountEndDate?: Date;
      offerType?: 'WEEKEND DEAL' | 'SPECIAL PROMOTION';
    },
  ): Promise<GamePricing> {
    // Check if pricing exists
    const existingPricing = this.gamesPricing.findIndex((pricing) => pricing.id === id);
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
      : null;

    // Update pricing
    this.gamesPricing[existingPricing].free = pricing.free;
    this.gamesPricing[existingPricing].basePrice = pricing.basePrice;
    this.gamesPricing[existingPricing].discount = pricing.discount;
    this.gamesPricing[existingPricing].discountPercentage = discountPercentage;
    this.gamesPricing[existingPricing].discountPrice = pricing.discountPrice;
    this.gamesPricing[existingPricing].discountStartDate = pricing.discountStartDate;
    this.gamesPricing[existingPricing].discountEndDate = pricing.discountEndDate;
    this.gamesPricing[existingPricing].offerType = pricing.offerType;

    return this.gamesPricing[existingPricing];
  }

  public async remove(id: number): Promise<GamePricing> {
    // Check if pricing exists
    const existingPricing = this.gamesPricing.findIndex((pricing) => pricing.id === id);
    if (!existingPricing) throw new NotFoundException(`Pricing with ID ${id} not found`);

    return this.gamesPricing.splice(existingPricing, 1)[0];
  }

  public async removeByGameId(id: number): Promise<GamePricing> {
    // Check if pricing exists
    const existingPricing = this.gamesPricing.findIndex((pricing) => pricing.game.id === id);
    if (!existingPricing) throw new NotFoundException(`Pricing with ID ${id} not found`);

    return this.gamesPricing.splice(existingPricing, 1)[0];
  }

  public async removeAll(): Promise<void> {
    this.gamesPricing = [];
  }
}