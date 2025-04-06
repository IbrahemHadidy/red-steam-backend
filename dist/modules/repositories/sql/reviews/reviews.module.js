// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReviewsModule", {
    enumerable: true,
    get: function() {
        return ReviewsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("../games/games.service");
const _reviewsservice = require("./reviews.service");
const _usersservice = require("../users/users.service");
const _companyentity = require("../companies/company.entity");
const _gamefeatureentity = require("../games-features/game-feature.entity");
const _gamelanguageentity = require("../games-languages/game-language.entity");
const _gamepricingentity = require("../games-pricing/game-pricing.entity");
const _gametagentity = require("../games-tags/game-tag.entity");
const _gameentity = require("../games/game.entity");
const _reviewentity = require("./review.entity");
const _userentity = require("../users/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ReviewsModule = class ReviewsModule {
};
ReviewsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _reviewentity.Review,
                _userentity.User,
                _gameentity.Game,
                _companyentity.Publisher,
                _companyentity.Developer,
                _gamelanguageentity.GameLanguage,
                _gamefeatureentity.GameFeature,
                _gamepricingentity.GamePricing,
                _gametagentity.GameTag
            ], 'sql')
        ],
        providers: [
            _gamespricingservice.GamesPricingService,
            _gamesservice.GamesService,
            _companiesservice.CompaniesService,
            _gamesfeaturesservice.GamesFeaturesService,
            _gameslanguagesservice.GamesLanguagesService,
            _gamestagsservice.GamesTagsService,
            _usersservice.UsersService,
            _reviewsservice.ReviewsService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _reviewsservice.ReviewsService
        ]
    })
], ReviewsModule);

//# sourceMappingURL=reviews.module.js.map