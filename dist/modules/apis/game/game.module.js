// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GameModule", {
    enumerable: true,
    get: function() {
        return GameModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistmodule = require("../../repositories/mongo/dropbox-tokens/token-blacklist.module");
const _tokenblacklistmodule1 = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamespricingmodule = require("../../repositories/sql/games-pricing/games-pricing.module");
const _gamesmodule = require("../../repositories/sql/games/games.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _dropboxmodule = require("../../services/dropbox/dropbox.module");
const _adminservice = require("./admin/admin.service");
const _dataservice = require("./data/data.service");
const _offerservice = require("./offer/offer.service");
const _reviewsmodule = require("../../repositories/sql/reviews/reviews.module");
const _admincontroller = require("./admin/admin.controller");
const _datacontroller = require("./data/data.controller");
const _offercontroller = require("./offer/offer.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GameModule = class GameModule {
};
GameModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwt.JwtModule,
            _usersmodule.UsersModule,
            _gamesmodule.GamesModule,
            _gamespricingmodule.GamesPricingModule,
            _reviewsmodule.ReviewsModule,
            _tokenblacklistmodule1.TokenBlacklistModule,
            _tokenblacklistmodule.DropboxTokensModule,
            _dropboxmodule.DropboxModule
        ],
        providers: [
            _dataservice.DataService,
            _offerservice.OfferService,
            _adminservice.AdminService,
            _common.Logger
        ],
        controllers: [
            _datacontroller.DataController,
            _admincontroller.AdminController,
            _offercontroller.OfferController
        ],
        exports: [
            _dataservice.DataService,
            _adminservice.AdminService,
            _offerservice.OfferService
        ]
    })
], GameModule);

//# sourceMappingURL=game.module.js.map