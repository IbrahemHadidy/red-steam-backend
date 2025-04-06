// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GameFeature", {
    enumerable: true,
    get: function() {
        return GameFeature;
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
let GameFeature = class GameFeature extends _typeorm.BaseEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'feature_id'
    }),
    _ts_metadata("design:type", Number)
], GameFeature.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], GameFeature.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'bytea'
    }),
    _ts_metadata("design:type", typeof Buffer === "undefined" ? Object : Buffer)
], GameFeature.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gameentity.Game, (game)=>game.features),
    _ts_metadata("design:type", Array)
], GameFeature.prototype, "games", void 0);
GameFeature = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'features'
    })
], GameFeature);

//# sourceMappingURL=game-feature.entity.js.map