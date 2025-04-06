// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NodeMailerService", {
    enumerable: true,
    get: function() {
        return NodeMailerService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _decimal = /*#__PURE__*/ _interop_require_default(require("decimal.js"));
const _mailer = require("@nestjs-modules/mailer");
const _emailverification = require("./templates/email-verification");
const _passwordreset = require("./templates/password-reset");
const _paymentconfirmation = require("./templates/payment-confirmation");
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
let NodeMailerService = class NodeMailerService {
    constructor(config, mailer, logger){
        this.config = config;
        this.mailer = mailer;
        this.logger = logger;
        this.email = `Red Steam ${this.config.get('SMTP_USER')}`;
        this.baseUrl = this.config.get('BASE_URL');
        this.frontUrl = this.config.get('FRONT_URL');
    }
    /**
   * Sends a verification email
   * @param to The email address of the recipient
   * @param verificationToken The verification token
   */ async sendVerificationEmail(to, username, verificationToken) {
        // Log the initiation of the email verification process
        this.logger.log(`Sending verification email to ${to}`);
        // Send verification email
        await this.sendEmail(to, 'Verify Your Email Address', (0, _emailverification.emailVerification)(verificationToken, username));
        // Log that a verification email has been sent to the specified address
        this.logger.log(`Verification email sent to ${to}`);
    }
    /**
   * Sends a password reset email
   * @param to The email address of the recipient
   * @param username The username of the user
   * @param resetToken The reset token
   */ async sendPasswordResetEmail(to, username, resetToken) {
        // Log the initiation of the password reset process
        this.logger.log(`Sending password reset email to ${to}`);
        // Send password reset email
        await this.sendEmail(to, 'Red Steam Password Reset', (0, _passwordreset.passwordReset)(resetToken, username));
        // Log that a password reset email has been sent to the specified address
        this.logger.log(`Password reset email sent to ${to}`);
    }
    /**
   * Sends a payment confirmation email
   * @param to The email address of the recipient
   * @param orderId The order id
   * @param data The data of the payment (order id, account name, games)
   */ async sendPaymentConfirmationEmail(to, data) {
        // Log the initiation of the payment confirmation email
        this.logger.log(`Sending payment confirmation email to ${to}`);
        // Generate the game cards for the email
        const gameCards = data.games.map((game)=>{
            const gameImage = game.thumbnailEntries?.tabImage;
            return (0, _paymentconfirmation.gameCard)(game.name, game.pricing.discount ? game.pricing.discountPrice : game.pricing.basePrice, gameImage);
        });
        // Get the current date and format it
        const currentDate = new Date().toISOString();
        // Calculate the total price
        const totalPrice = data.games.reduce((total, game)=>{
            const price = new _decimal.default(game.pricing.discount ? game.pricing.discountPrice : game.pricing.basePrice);
            return total.plus(price);
        }, new _decimal.default(0)).toFixed(2);
        // Replace the placeholders in the template
        const emailContent = (0, _paymentconfirmation.paymentConfirmation)(data.accountName, data.orderId, currentDate, totalPrice, gameCards.join(''));
        // Send payment confirmation email
        await this.sendEmail(to, 'Payment Confirmation', emailContent);
        // Log success
        this.logger.log(`Payment confirmation email sent to ${to}`);
    }
    /**
   * Sends an email
   * @param to The email address of the recipient
   * @param subject The subject of the email
   * @param html The HTML content of the email
   * @throws `InternalServerErrorException` If there is an error sending the email
   */ async sendEmail(to, subject, html) {
        await this.mailer.sendMail({
            from: this.email,
            to,
            subject,
            html: html.replace(/{BASE_URL}/g, this.baseUrl).replace(/{FRONT_URL}/g, this.frontUrl)
        });
    }
};
NodeMailerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], NodeMailerService);

//# sourceMappingURL=node-mailer.service.js.map