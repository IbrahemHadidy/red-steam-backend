// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesTagsModule", {
    enumerable: true,
    get: function() {
        return GamesTagsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _gamestagsservice = require("./games-tags.service");
const _gametagentity = require("./game-tag.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GamesTagsModule = class GamesTagsModule {
};
GamesTagsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _gametagentity.GameTag
            ], 'sql')
        ],
        providers: [
            _gamestagsservice.GamesTagsService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _gamestagsservice.GamesTagsService
        ]
    })
], GamesTagsModule);

//# sourceMappingURL=games-tags.module.js.map