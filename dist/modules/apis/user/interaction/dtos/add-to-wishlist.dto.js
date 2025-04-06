// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddToWishlistDto", {
    enumerable: true,
    get: function() {
        return AddToWishlistDto;
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
let AddToWishlistDto = class AddToWishlistDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Games to add to wishlist',
        example: [
            'enter games ids here'
        ],
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'itemsIds is required'
    }),
    (0, _classvalidator.IsArray)({
        message: 'itemIds must be an array'
    }),
    (0, _classvalidator.IsNumber)({}, {
        each: true,
        message: 'itemsIds must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], AddToWishlistDto.prototype, "itemsIds", void 0);

//# sourceMappingURL=add-to-wishlist.dto.js.map