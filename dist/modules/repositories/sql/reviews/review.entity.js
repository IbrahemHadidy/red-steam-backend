// TypeORM
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Review", {
    enumerable: true,
    get: function() {
        return Review;
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
let Review = class Review extends _typeorm.BaseEntity {
    async updateGameReviewsData() {
        if (this.game) {
            await this.game.updateReviewsData();
        }
    }
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'review_id'
    }),
    _ts_metadata("design:type", Number)
], Review.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userentity.User, (user)=>user.reviews),
    (0, _typeorm.JoinColumn)({
        name: 'user_id'
    }),
    _ts_metadata("design:type", typeof UserType === "undefined" ? Object : UserType)
], Review.prototype, "user", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_gameentity.Game, (game)=>game.reviews),
    (0, _typeorm.JoinColumn)({
        name: 'game_id'
    }),
    _ts_metadata("design:type", typeof GameType === "undefined" ? Object : GameType)
], Review.prototype, "game", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", Boolean)
], Review.prototype, "positive", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: new Date()
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Review.prototype, "date", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], Review.prototype, "content", void 0);
_ts_decorate([
    (0, _typeorm.AfterInsert)(),
    (0, _typeorm.AfterUpdate)(),
    (0, _typeorm.AfterRemove)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], Review.prototype, "updateGameReviewsData", null);
Review = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'reviews'
    })
], Review);

//# sourceMappingURL=review.entity.js.map