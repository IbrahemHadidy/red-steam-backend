// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SqlModule", {
    enumerable: true,
    get: function() {
        return SqlModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _typeorm = require("@nestjs/typeorm");
const _companiesmodule = require("./companies/companies.module");
const _gamesfeaturesmodule = require("./games-features/games-features.module");
const _gameslanguagesmodule = require("./games-languages/games-languages.module");
const _gamespricingmodule = require("./games-pricing/games-pricing.module");
const _gamestagsmodule = require("./games-tags/games-tags.module");
const _gamesmodule = require("./games/games.module");
const _reviewsmodule = require("./reviews/reviews.module");
const _usersmodule = require("./users/users.module");
const _databasemodule = require("../../services/database/database.module");
const _databaseservice = require("../../services/database/database.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SqlModule = class SqlModule {
};
SqlModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _typeorm.TypeOrmModule.forRootAsync({
                inject: [
                    _databaseservice.DatabaseService
                ],
                extraProviders: [
                    _databaseservice.DatabaseService,
                    _common.Logger,
                    _config.ConfigService
                ],
                name: 'sql',
                useFactory: async (databaseService)=>{
                    return databaseService.getPostgresTypeOrmConfig();
                }
            }),
            _companiesmodule.CompaniesModule,
            _gamesfeaturesmodule.GamesFeaturesModule,
            _gameslanguagesmodule.GamesLanguagesModule,
            _gamespricingmodule.GamesPricingModule,
            _gamestagsmodule.GamesTagsModule,
            _reviewsmodule.ReviewsModule,
            _gamesmodule.GamesModule,
            _usersmodule.UsersModule
        ],
        exports: [
            _typeorm.TypeOrmModule
        ]
    })
], SqlModule);

//# sourceMappingURL=sql.module.js.map