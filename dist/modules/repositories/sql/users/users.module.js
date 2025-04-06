// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersModule", {
    enumerable: true,
    get: function() {
        return UsersModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _gamestagsservice = require("../games-tags/games-tags.service");
const _usersservice = require("./users.service");
const _gametagentity = require("../games-tags/game-tag.entity");
const _userentity = require("./user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UsersModule = class UsersModule {
};
UsersModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _userentity.User,
                _gametagentity.GameTag
            ], 'sql')
        ],
        providers: [
            _gamestagsservice.GamesTagsService,
            _usersservice.UsersService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _usersservice.UsersService
        ]
    })
], UsersModule);

//# sourceMappingURL=users.module.js.map