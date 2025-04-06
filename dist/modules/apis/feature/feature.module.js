// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FeatureModule", {
    enumerable: true,
    get: function() {
        return FeatureModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistmodule = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamesfeaturesmodule = require("../../repositories/sql/games-features/games-features.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _featureservice = require("./feature.service");
const _gamesfeaturesservice = require("../../repositories/sql/games-features/games-features.service");
const _featurecontroller = require("./feature.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FeatureModule = class FeatureModule {
};
FeatureModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _gamesfeaturesmodule.GamesFeaturesModule,
            _jwt.JwtModule,
            _tokenblacklistmodule.TokenBlacklistModule,
            _usersmodule.UsersModule
        ],
        providers: [
            _gamesfeaturesservice.GamesFeaturesService,
            _featureservice.FeatureService,
            _common.Logger
        ],
        controllers: [
            _featurecontroller.FeatureController
        ],
        exports: [
            _featureservice.FeatureService
        ]
    })
], FeatureModule);

//# sourceMappingURL=feature.module.js.map