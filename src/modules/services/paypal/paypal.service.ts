// NestJS
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Paypal
import paypal from '@paypal/checkout-server-sdk';

// Types
import type { HttpResponse } from 'paypal__paypalhttp';

@Injectable()
export class PaypalService {
  private readonly client: paypal.core.PayPalHttpClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');
    const environmentType = this.configService.get<string>('NODE_ENV');

    let environment: paypal.core.PayPalEnvironment;

    if (environmentType === 'production') {
      environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
      environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }

    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  /**
   * Create order
   * @param totalPrice
   * @returns Order response
   */
  async createOrder(
    totalPrice: string,
  ): Promise<HttpResponse<{ id: string; links: { href: string; method: string }[] }>> {
    // Log the initiation of the order creation process
    this.logger.log(`Creating PayPal order for user with ID ${totalPrice}`);

    // Create request body
    const request = new paypal.orders.OrdersCreateRequest();

    // Set request body
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalPrice,
          },
        },
      ],
    });

    // Send request
    const order = await this.client.execute(request);

    // Log the successful order creation
    this.logger.log(`PayPal order created successfully for user with ID ${totalPrice}`);

    // Return order
    return order;
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
    const request = new paypal.orders.OrdersCaptureRequest(orderId);

    // Send request
    const capture = await this.client.execute(request);

    // Extract data from response
    const responseData = capture.result;

    // Extract payer's name
    const payerName = responseData.payer.name.given_name;

    // Log the captured order status, order ID, and payer's name
    this.logger.log('PayPal capture response status:', responseData.status);
    this.logger.log('PayPal capture response order ID:', responseData.id);
    this.logger.log('PayPal capture response payer name:', responseData.payer.name.given_name);

    // Return captured order status, payer's name, and order ID
    return {
      status: responseData.status,
      orderId: responseData.id,
      payerName,
    };
  }
}
