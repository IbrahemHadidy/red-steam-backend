// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesLanguagesModule", {
    enumerable: true,
    get: function() {
        return GamesLanguagesModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _gameslanguagesservice = require("./games-languages.service");
const _gamelanguageentity = require("./game-language.entity");
const _gameentity = require("../games/game.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GamesLanguagesModule = class GamesLanguagesModule {
};
GamesLanguagesModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _gamelanguageentity.GameLanguage,
                _gameentity.Game
            ], 'sql')
        ],
        providers: [
            _gameslanguagesservice.GamesLanguagesService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _gameslanguagesservice.GamesLanguagesService
        ]
    })
], GamesLanguagesModule);

//# sourceMappingURL=games-languages.module.js.map