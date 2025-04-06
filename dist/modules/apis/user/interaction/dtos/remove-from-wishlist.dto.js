// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveFromWishlistDto", {
    enumerable: true,
    get: function() {
        return RemoveFromWishlistDto;
    }
});
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RemoveFromWishlistDto = class RemoveFromWishlistDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Optional array of item IDs, if not provided all items will be removed',
        example: [
            'enter items ids here'
        ],
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)({
        message: 'itemsIds must be an array'
    }),
    (0, _classvalidator.IsNumber)({}, {
        each: true,
        message: 'itemIds must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], RemoveFromWishlistDto.prototype, "itemsIds", void 0);

//# sourceMappingURL=remove-from-wishlist.dto.js.map