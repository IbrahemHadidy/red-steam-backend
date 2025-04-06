// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CaptureOrderDto", {
    enumerable: true,
    get: function() {
        return CaptureOrderDto;
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
let CaptureOrderDto = class CaptureOrderDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Order ID',
        example: 'enter user uuid here here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'orderId is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'orderId must be a string'
    }),
    _ts_metadata("design:type", String)
], CaptureOrderDto.prototype, "orderId", void 0);
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
    (0, _classvalidator.IsNumber)({}, {
        each: true
    }),
    _ts_metadata("design:type", Array)
], CaptureOrderDto.prototype, "cartItems", void 0);

//# sourceMappingURL=capture-order.dto.js.map