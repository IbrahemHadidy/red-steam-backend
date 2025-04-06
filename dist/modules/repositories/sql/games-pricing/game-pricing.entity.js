// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamePricing", {
    enumerable: true,
    get: function() {
        return GamePricing;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _decimal = /*#__PURE__*/ _interop_require_default(require("decimal.js"));
const _gameentity = require("../games/game.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GamePricing = class GamePricing extends _typeorm.BaseEntity {
    static{
        this.skipDiscountCheck = false;
    }
    // Final calculations
    finalize() {
        const basePriceDecimal = new _decimal.default(this.basePrice || '0.00');
        const discountPriceDecimal = new _decimal.default(this.discountPrice || '0.00');
        if (this.free) {
            this.price = '0.00';
            this.discount = false;
            this.basePrice = '0.00';
            this.discountPrice = null;
            this.offerType = null;
            this.discountStartDate = null;
            this.discountEndDate = null;
            this.discountPercentage = null;
        } else {
            this.price = this.discount ? discountPriceDecimal.toFixed(2) : basePriceDecimal.toFixed(2);
            if (this.discount) {
                if (basePriceDecimal.lessThanOrEqualTo(0)) {
                    throw new _common.BadRequestException('Base price must be greater than 0 to calculate discount percentage');
                }
                this.discountPercentage = Math.round(basePriceDecimal.minus(discountPriceDecimal).dividedBy(basePriceDecimal).times(100).toNumber());
            } else {
                this.discountPrice = null;
                this.discountPercentage = null;
                this.discountStartDate = null;
                this.discountEndDate = null;
                this.offerType = null;
            }
        }
    }
    checkDiscountEndDate() {
        if (GamePricing.skipDiscountCheck) return;
        if (this.discount) {
            if (this.discountEndDate < new Date() || this.discountStartDate > new Date()) {
                this.discount = false;
                this.discountPrice = null;
                this.discountPercentage = null;
                this.discountStartDate = null;
                this.discountEndDate = null;
                this.offerType = null;
            } else {
                const discountPriceDecimal = new _decimal.default(this.discountPrice || '0.00');
                if (discountPriceDecimal.equals(0)) this.free = true;
            }
        }
    }
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('increment', {
        name: 'pricing_id'
    }),
    _ts_metadata("design:type", Number)
], GamePricing.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], GamePricing.prototype, "free", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: '0.00',
        type: 'decimal',
        precision: 10,
        scale: 2
    }),
    _ts_metadata("design:type", String)
], GamePricing.prototype, "basePrice", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], GamePricing.prototype, "discount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'float'
    }),
    _ts_metadata("design:type", Number)
], GamePricing.prototype, "discountPercentage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'decimal',
        precision: 10,
        scale: 2
    }),
    _ts_metadata("design:type", String)
], GamePricing.prototype, "discountPrice", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], GamePricing.prototype, "discountStartDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], GamePricing.prototype, "discountEndDate", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], GamePricing.prototype, "offerType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: '0.00'
    }),
    _ts_metadata("design:type", String)
], GamePricing.prototype, "price", void 0);
_ts_decorate([
    (0, _typeorm.OneToOne)(()=>_gameentity.Game, (game)=>game.pricing),
    _ts_metadata("design:type", typeof GameType === "undefined" ? Object : GameType)
], GamePricing.prototype, "game", void 0);
_ts_decorate([
    (0, _typeorm.BeforeInsert)(),
    (0, _typeorm.BeforeUpdate)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], GamePricing.prototype, "finalize", null);
_ts_decorate([
    (0, _typeorm.AfterLoad)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], GamePricing.prototype, "checkDiscountEndDate", null);
GamePricing = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'games_pricing'
    })
], GamePricing);

//# sourceMappingURL=game-pricing.entity.js.map