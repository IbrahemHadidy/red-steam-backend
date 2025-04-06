// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagModule", {
    enumerable: true,
    get: function() {
        return TagModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistmodule = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamestagsmodule = require("../../repositories/sql/games-tags/games-tags.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _tagservice = require("./tag.service");
const _gamestagsservice = require("../../repositories/sql/games-tags/games-tags.service");
const _tagcontroller = require("./tag.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TagModule = class TagModule {
};
TagModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _gamestagsmodule.GamesTagsModule,
            _jwt.JwtModule,
            _tokenblacklistmodule.TokenBlacklistModule,
            _usersmodule.UsersModule
        ],
        providers: [
            _gamestagsservice.GamesTagsService,
            _tagservice.TagService,
            _common.Logger
        ],
        controllers: [
            _tagcontroller.TagController
        ],
        exports: [
            _tagservice.TagService
        ]
    })
], TagModule);

//# sourceMappingURL=tag.module.js.map