// NestJS
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

// DecimalJS
import Decimal from 'decimal.js';

// Services
import { GamesService } from '@repositories/sql/games/games.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { PaypalService } from '@services/paypal/paypal.service';

import { UserService } from '@apis/user/user.service'; // Api service (The Extended Service)
import { UsersService } from '@repositories/sql/users/users.service'; // Repository service (The Injected Service)

// Types
import type { Game } from '@repositories/sql/games/game.entity';

@Injectable()
export class PaymentService {
  constructor(
    private readonly userTools: UserService,
    private readonly user: UsersService,
    private readonly mailer: NodeMailerService,
    private readonly logger: Logger,
    private readonly game: GamesService,
    private readonly payment: PaypalService,
  ) {}

  /**
   * Create a new order.
   * @param data An object containing the userId, totalPrice, and cartItems
   * @returns An object containing the orderId and orderData (userId, totalPrice, and cartItems)
   * @throws `BadRequestException` If any of the cart items are already in the user's library
   * @throws `UnauthorizedException` If user is not verified
   */
  public async createOrder(data: { userId: string; totalPrice: string; cartItems: number[] }): Promise<{
    orderId: string;
    approvalUrl: string;
    orderData: { userId: string; totalPrice: string; cartItems: number[] };
  }> {
    const { userId, totalPrice, cartItems } = data;

    this.logger.log(`Creating order for user with ID: ${userId}`);

    // Check if some items do not exist
    await this.game.getByIds(cartItems);

    // Recalculate total price
    await this.calculatePrice(cartItems, totalPrice);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Checks user verification status
    await this.userTools.checkVerified(user);

    // Check if any of the cart items are already in the user's library
    if (user.library.some((game) => cartItems.includes(game.id))) {
      this.logger.error(`Games with IDs ${cartItems} are already in the user's library`);
      throw new BadRequestException(`Games with IDs ${cartItems} are already in the user's library`);
    }

    // Create order
    const order = await this.payment.createOrder(totalPrice);

    // Return order data
    this.logger.log(`Order created with ID: ${order.result.id}`);
    return {
      orderId: order.result.id,
      approvalUrl: order.result.links[1].href,
      orderData: { userId, totalPrice, cartItems },
    };
  }

  /**
   * Capture an order
   * @param data An object containing the orderId and userId
   * @returns An object containing the captured order status, order ID, and payer's name
   */
  public async captureOrder(data: {
    orderId: string;
    userId: string;
    cartItems: number[];
  }): Promise<{ status: string; orderId: string; payerName: string }> {
    const { orderId, userId, cartItems } = data;

    this.logger.log(`Capturing order with ID: ${orderId}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Get games
    const games = await this.game.getByIds(cartItems);

    // Checks user verification status
    await this.userTools.checkVerified(user);

    // Capture order
    const capturedOrder = await this.payment.captureOrder(orderId);

    // Return captured order
    this.logger.log(`Order captured with status: ${capturedOrder.status}`);

    // Update user library
    await this.user.addItemsToLibrary(userId, cartItems);

    // Update game sales
    await this.game.updateSales(cartItems);

    // Send email
    await this.mailer.sendPaymentConfirmationEmail(user.email, {
      orderId,
      accountName: user.username,
      games,
    });

    return capturedOrder;
  }

  /**
   * Calculate the total price of the cart items
   * @param cartItems An array of cart items ids
   * @param totalPrice The total price of the cart
   * @throws `BadRequestException` If total price does not match calculated price
   */
  private async calculatePrice(cartItems: number[], totalPrice: string): Promise<void> {
    this.logger.log(`Calculating total price of cart items`);

    // Recalculate total price
    const games = await this.game.getByIds(cartItems);
    const calculatedPrice = games
      .reduce((total: Decimal, game: Game) => {
        const price = new Decimal(game.pricing.discount ? game.pricing.discountPrice : game.pricing.basePrice);
        return total.plus(price);
      }, new Decimal('0.00'))
      .toString();

    // Check if total price matches calculated price
    if (totalPrice !== calculatedPrice) {
      this.logger.error(`Total price does not match calculated price`);
      throw new BadRequestException('Total price does not match calculated price');
    }
  }
}
