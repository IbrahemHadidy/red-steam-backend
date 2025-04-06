// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateOrderDto", {
    enumerable: true,
    get: function() {
        return CreateOrderDto;
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
let CreateOrderDto = class CreateOrderDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Total Price',
        example: 'enter total price here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'totalPrice is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'totalPrice must be a string'
    }),
    _ts_metadata("design:type", String)
], CreateOrderDto.prototype, "totalPrice", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Cart Items',
        example: 'enter items here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'cartItems is required'
    }),
    (0, _classvalidator.IsArray)({
        message: 'cartItems must be an array'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        each: true,
        message: 'cartItems must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], CreateOrderDto.prototype, "cartItems", void 0);

//# sourceMappingURL=create-order.dto.js.map