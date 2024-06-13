import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPaypalService {
  async createOrder(totalPrice: number) {
    return {
      result: {
        id: 'mock_order_id',
        status: 'CREATED',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalPrice.toString(),
            },
          },
        ],
      },
    };
  }

  async captureOrder(orderId: string) {
    return {
      status: 'COMPLETED',
      orderId: orderId,
      payerName: 'Mock Payer',
    };
  }
}
