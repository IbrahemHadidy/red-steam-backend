// TypeORM
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GameTag", {
    enumerable: true,
    get: function() {
        return GameTag;
    }
});
const _typeorm = require("typeorm");
const _gameentity = require("../games/game.entity");
const _userentity = require("../users/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GameTag = class GameTag extends _typeorm.BaseEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'tag_id'
    }),
    _ts_metadata("design:type", Number)
], GameTag.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], GameTag.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_gameentity.Game, (game)=>game.tags),
    _ts_metadata("design:type", Array)
], GameTag.prototype, "games", void 0);
_ts_decorate([
    (0, _typeorm.ManyToMany)(()=>_userentity.User, (user)=>user.tags),
    _ts_metadata("design:type", Array)
], GameTag.prototype, "users", void 0);
GameTag = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'tags'
    })
], GameTag);

//# sourceMappingURL=game-tag.entity.js.map