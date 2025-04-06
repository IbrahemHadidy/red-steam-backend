// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesModule", {
    enumerable: true,
    get: function() {
        return GamesModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _companiesservice = require("../companies/companies.service");
const _gamesfeaturesservice = require("../games-features/games-features.service");
const _gameslanguagesservice = require("../games-languages/games-languages.service");
const _gamespricingservice = require("../games-pricing/games-pricing.service");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _gamesservice = require("./games.service");
const _searchservice = require("./search.service");
const _companyentity = require("../companies/company.entity");
const _gamefeatureentity = require("../games-features/game-feature.entity");
const _gamelanguageentity = require("../games-languages/game-language.entity");
const _gamepricingentity = require("../games-pricing/game-pricing.entity");
const _gametagentity = require("../games-tags/game-tag.entity");
const _gameentity = require("./game.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GamesModule = class GamesModule {
};
GamesModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _gameentity.Game,
                _companyentity.Publisher,
                _companyentity.Developer,
                _gamefeatureentity.GameFeature,
                _gamepricingentity.GamePricing,
                _gametagentity.GameTag,
                _gamelanguageentity.GameLanguage
            ], 'sql')
        ],
        providers: [
            _companiesservice.CompaniesService,
            _gamesfeaturesservice.GamesFeaturesService,
            _gameslanguagesservice.GamesLanguagesService,
            _gamespricingservice.GamesPricingService,
            _gamestagsservice.GamesTagsService,
            _gamesservice.GamesService,
            _searchservice.SearchService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _gamesservice.GamesService,
            _searchservice.SearchService
        ]
    })
], GamesModule);

//# sourceMappingURL=games.module.js.map