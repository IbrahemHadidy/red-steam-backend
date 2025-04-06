// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentService", {
    enumerable: true,
    get: function() {
        return PaymentService;
    }
});
const _common = require("@nestjs/common");
const _decimal = /*#__PURE__*/ _interop_require_default(require("decimal.js"));
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _nodemailerservice = require("../../../services/node-mailer/node-mailer.service");
const _paypalservice = require("../../../services/paypal/paypal.service");
const _userservice = require("../user.service");
const _usersservice = require("../../../repositories/sql/users/users.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PaymentService = class PaymentService {
    constructor(userTools, user, mailer, logger, game, payment){
        this.userTools = userTools;
        this.user = user;
        this.mailer = mailer;
        this.logger = logger;
        this.game = game;
        this.payment = payment;
    }
    /**
   * Create a new order.
   * @param data An object containing the userId, totalPrice, and cartItems
   * @returns An object containing the orderId and orderData (userId, totalPrice, and cartItems)
   * @throws `BadRequestException` If any of the cart items are already in the user's library
   * @throws `UnauthorizedException` If user is not verified
   */ async createOrder(data) {
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
        if (user.library.some((game)=>cartItems.includes(game.id))) {
            this.logger.error(`Games with IDs ${cartItems} are already in the user's library`);
            throw new _common.BadRequestException(`Games with IDs ${cartItems} are already in the user's library`);
        }
        // Create order
        const order = await this.payment.createOrder(totalPrice);
        // Return order data
        this.logger.log(`Order created with ID: ${order.id}`);
        return {
            orderId: order.id,
            approvalUrl: order.links[1].href,
            orderData: {
                userId,
                totalPrice,
                cartItems
            }
        };
    }
    /**
   * Capture an order
   * @param data An object containing the orderId and userId
   * @returns An object containing the captured order status, order ID, and payer's name
   */ async captureOrder(data) {
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
            games
        });
        return capturedOrder;
    }
    /**
   * Calculate the total price of the cart items
   * @param cartItems An array of cart items ids
   * @param totalPrice The total price of the cart
   * @throws `BadRequestException` If total price does not match calculated price
   */ async calculatePrice(cartItems, totalPrice) {
        this.logger.log(`Calculating total price of cart items`);
        // Recalculate total price
        const games = await this.game.getByIds(cartItems);
        const calculatedPrice = games.reduce((total, game)=>{
            const price = new _decimal.default(game.pricing.discount ? game.pricing.discountPrice : game.pricing.basePrice);
            return total.plus(price);
        }, new _decimal.default('0.00')).toString();
        // Check if total price matches calculated price
        if (totalPrice !== calculatedPrice) {
            this.logger.error(`Total price does not match calculated price`);
            throw new _common.BadRequestException('Total price does not match calculated price');
        }
    }
};
PaymentService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _nodemailerservice.NodeMailerService === "undefined" ? Object : _nodemailerservice.NodeMailerService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _gamesservice.GamesService === "undefined" ? Object : _gamesservice.GamesService,
        typeof _paypalservice.PaypalService === "undefined" ? Object : _paypalservice.PaypalService
    ])
], PaymentService);

//# sourceMappingURL=payment.service.js.map