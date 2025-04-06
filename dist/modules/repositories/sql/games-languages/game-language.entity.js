// TypeORM
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GameLanguage", {
    enumerable: true,
    get: function() {
        return GameLanguage;
    }
});
const _typeorm = require("typeorm");
const _gameentity = require("../games/game.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GameLanguage = class GameLanguage extends _typeorm.BaseEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'language_id'
    }),
    _ts_metadata("design:type", Number)
], GameLanguage.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], GameLanguage.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gameentity.Game, (game)=>game.languages),
    _ts_metadata("design:type", Array)
], GameLanguage.prototype, "games", void 0);
GameLanguage = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'languages'
    })
], GameLanguage);

//# sourceMappingURL=game-language.entity.js.map