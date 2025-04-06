"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LanguageModule", {
    enumerable: true,
    get: function() {
        return LanguageModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistmodule = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _gameslanguagesmodule = require("../../repositories/sql/games-languages/games-languages.module");
const _gameslanguagesservice = require("../../repositories/sql/games-languages/games-languages.service");
const _languageservice = require("./language.service");
const _languagecontroller = require("./language.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LanguageModule = class LanguageModule {
};
LanguageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _gameslanguagesmodule.GamesLanguagesModule,
            _usersmodule.UsersModule,
            _jwt.JwtModule,
            _tokenblacklistmodule.TokenBlacklistModule
        ],
        providers: [
            _gameslanguagesservice.GamesLanguagesService,
            _languageservice.LanguageService,
            _common.Logger
        ],
        controllers: [
            _languagecontroller.LanguageController
        ],
        exports: [
            _languageservice.LanguageService
        ]
    })
], LanguageModule);

//# sourceMappingURL=language.module.js.map