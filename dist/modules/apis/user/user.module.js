// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserModule", {
    enumerable: true,
    get: function() {
        return UserModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jwt = require("@nestjs/jwt");
const _googlerecaptcha = require("@nestlab/google-recaptcha");
const _tokenblacklistmodule = require("../../repositories/mongo/dropbox-tokens/token-blacklist.module");
const _tokenblacklistmodule1 = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamesmodule = require("../../repositories/sql/games/games.module");
const _reviewsmodule = require("../../repositories/sql/reviews/reviews.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _dropboxmodule = require("../../services/dropbox/dropbox.module");
const _nodemailermodule = require("../../services/node-mailer/node-mailer.module");
const _paypalmodule = require("../../services/paypal/paypal.module");
const _adminservice = require("./admin/admin.service");
const _authservice = require("./auth/auth.service");
const _interactionservice = require("./interaction/interaction.service");
const _managementservice = require("./management/management.service");
const _paymentservice = require("./payment/payment.service");
const _userservice = require("./user.service");
const _admincontroller = require("./admin/admin.controller");
const _authcontroller = require("./auth/auth.controller");
const _interactioncontroller = require("./interaction/interaction.controller");
const _managementcontroller = require("./management/management.controller");
const _paymentcontroller = require("./payment/payment.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UserModule = class UserModule {
};
UserModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _googlerecaptcha.GoogleRecaptchaModule.forRootAsync({
                imports: [
                    _config.ConfigModule
                ],
                useFactory: (configService)=>{
                    return {
                        secretKey: configService.get('RECAPTCHA_SECRET'),
                        response: (req)=>req.body['recaptchaToken']
                    };
                },
                inject: [
                    _config.ConfigService
                ]
            }),
            _usersmodule.UsersModule,
            _gamesmodule.GamesModule,
            _reviewsmodule.ReviewsModule,
            _tokenblacklistmodule.DropboxTokensModule,
            _dropboxmodule.DropboxModule,
            _tokenblacklistmodule1.TokenBlacklistModule,
            _jwt.JwtModule,
            _usersmodule.UsersModule,
            _paypalmodule.PaypalModule,
            _nodemailermodule.NodeMailerModule
        ],
        providers: [
            _userservice.UserService,
            _authservice.AuthService,
            _managementservice.ManagementService,
            _interactionservice.InteractionService,
            _paymentservice.PaymentService,
            _adminservice.AdminService,
            _common.Logger
        ],
        controllers: [
            _authcontroller.AuthController,
            _managementcontroller.ManagementController,
            _interactioncontroller.InteractionController,
            _paymentcontroller.PaymentController,
            _admincontroller.AdminController
        ],
        exports: [
            _userservice.UserService
        ]
    })
], UserModule);

//# sourceMappingURL=user.module.js.map