// NestJS
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Paypal
import { CheckoutPaymentIntent, Client, Environment, LogLevel, OrdersController } from '@paypal/paypal-server-sdk';

// Types 
import type { Order } from '@paypal/paypal-server-sdk';

@Injectable()
export class PaypalService {
  private readonly client: Client;
  private readonly ordersController: OrdersController;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');
    const environmentType = this.configService.get<string>('NODE_ENV');

    let environment: Environment;

    if (environmentType === 'production') {
      environment = Environment.Production;
    } else {
      environment = Environment.Sandbox;
    }

    this.client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: clientId,
        oAuthClientSecret: clientSecret
      },
      timeout: 0,
      environment,
      logging: {
        logLevel: LogLevel.Info,
        logRequest: {
          logBody: true
        },
        logResponse: {
          logHeaders: true
        }
      },
    });

    this.ordersController = new OrdersController(this.client);
  }

  /**
   * Create order
   * @param totalPrice
   * @returns Order response
   */
  async createOrder(
    totalPrice: string,
  ): Promise<Order> {
    // Log the initiation of the order creation process
    this.logger.log(`Creating PayPal order for user with ID ${totalPrice}`);

    // Create request body
    const collect = {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: 'USD',
              value: totalPrice,
            },
          }
        ],
      },
      prefer: 'return=representation'
    }

    // Send request
    const { result }  = await this.ordersController.ordersCreate(collect);

    // Log the successful order creation
    this.logger.log(`PayPal order created successfully for user with ID ${totalPrice}`);

    // Return order
    return result;
  }

  /**
   * Capture order
   * @param orderId Order ID
   * @returns An object containing the captured order status, order ID, and payer's name
   */
  async captureOrder(orderId: string): Promise<{ status: string; orderId: string; payerName: string }> {
    // Log the initiation of the order capture process
    this.logger.log(`Capturing PayPal order with ID: ${orderId}`);

    // Create request body
    const collect = {
      id: orderId,
      prefer: 'return=representation'
    }

    // Send request
    const capture = await this.ordersController.ordersCapture(collect);

    // Extract data from response
    const responseData = capture.result;

    // Extract payer's name
    const payerName = responseData.payer.name.givenName;

    // Log the captured order status, order ID, and payer's name
    this.logger.log('PayPal capture response status:', responseData.status);
    this.logger.log('PayPal capture response order ID:', responseData.id);
    this.logger.log('PayPal capture response payer name:', responseData.payer.name.givenName);

    // Return captured order status, payer's name, and order ID
    return {
      status: responseData.status,
      orderId: responseData.id,
      payerName,
    };
  }
}
