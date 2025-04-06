// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaypalService", {
    enumerable: true,
    get: function() {
        return PaypalService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _paypalserversdk = require("@paypal/paypal-server-sdk");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PaypalService = class PaypalService {
    constructor(configService, logger){
        this.configService = configService;
        this.logger = logger;
        const clientId = this.configService.get('PAYPAL_CLIENT_ID');
        const clientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
        const environmentType = this.configService.get('NODE_ENV');
        let environment;
        // if (environmentType === 'production') {
        //   environment = Environment.Production;
        // } else {
        //   environment = Environment.Sandbox;
        // }
        environment = _paypalserversdk.Environment.Sandbox;
        this.client = new _paypalserversdk.Client({
            clientCredentialsAuthCredentials: {
                oAuthClientId: clientId,
                oAuthClientSecret: clientSecret
            },
            timeout: 0,
            environment,
            logging: {
                logLevel: _paypalserversdk.LogLevel.Info,
                logRequest: {
                    logBody: true
                },
                logResponse: {
                    logHeaders: true
                }
            }
        });
        this.ordersController = new _paypalserversdk.OrdersController(this.client);
    }
    /**
   * Create order
   * @param totalPrice
   * @returns Order response
   */ async createOrder(totalPrice) {
        // Log the initiation of the order creation process
        this.logger.log(`Creating PayPal order for user with ID ${totalPrice}`);
        // Create request body
        const collect = {
            body: {
                intent: _paypalserversdk.CheckoutPaymentIntent.Capture,
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: 'USD',
                            value: totalPrice
                        }
                    }
                ]
            },
            prefer: 'return=representation'
        };
        // Send request
        const { result } = await this.ordersController.ordersCreate(collect);
        // Log the successful order creation
        this.logger.log(`PayPal order created successfully for user with ID ${totalPrice}`);
        // Return order
        return result;
    }
    /**
   * Capture order
   * @param orderId Order ID
   * @returns An object containing the captured order status, order ID, and payer's name
   */ async captureOrder(orderId) {
        // Log the initiation of the order capture process
        this.logger.log(`Capturing PayPal order with ID: ${orderId}`);
        // Create request body
        const collect = {
            id: orderId,
            prefer: 'return=representation'
        };
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
            payerName
        };
    }
};
PaypalService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], PaypalService);

//# sourceMappingURL=paypal.service.js.map