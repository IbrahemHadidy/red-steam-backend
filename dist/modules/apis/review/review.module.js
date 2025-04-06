// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReviewModule", {
    enumerable: true,
    get: function() {
        return ReviewModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistmodule = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamesmodule = require("../../repositories/sql/games/games.module");
const _reviewsmodule = require("../../repositories/sql/reviews/reviews.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _reviewservice = require("./review.service");
const _reviewsservice = require("../../repositories/sql/reviews/reviews.service");
const _reviewcontroller = require("./review.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ReviewModule = class ReviewModule {
};
ReviewModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _reviewsmodule.ReviewsModule,
            _gamesmodule.GamesModule,
            _usersmodule.UsersModule,
            _jwt.JwtModule,
            _tokenblacklistmodule.TokenBlacklistModule
        ],
        providers: [
            _reviewsservice.ReviewsService,
            _reviewservice.ReviewService,
            _common.Logger
        ],
        controllers: [
            _reviewcontroller.ReviewController
        ],
        exports: [
            _reviewservice.ReviewService
        ]
    })
], ReviewModule);

//# sourceMappingURL=review.module.js.map