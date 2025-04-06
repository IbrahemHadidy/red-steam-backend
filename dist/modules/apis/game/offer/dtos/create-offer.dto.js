// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateOfferDto", {
    enumerable: true,
    get: function() {
        return CreateOfferDto;
    }
});
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
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
let CreateOfferDto = class CreateOfferDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 1,
        description: 'offer id',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'offer id is required'
    }),
    (0, _classvalidator.IsNumber)({
        allowNaN: false
    }, {
        message: 'offer id must be a number'
    }),
    _ts_metadata("design:type", Number)
], CreateOfferDto.prototype, "gameId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 10,
        description: 'discount price',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'discount price is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'discount price must be a string'
    }),
    _ts_metadata("design:type", String)
], CreateOfferDto.prototype, "discountPrice", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '2022-01-01',
        description: 'discount start date',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'discount start date is required'
    }),
    (0, _classvalidator.IsDate)({
        message: 'discount start date must be a date'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateOfferDto.prototype, "discountStartDate", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: '2022-01-01',
        description: 'discount end date',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'discount end date is required'
    }),
    (0, _classvalidator.IsDate)({
        message: 'discount end date must be a date'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateOfferDto.prototype, "discountEndDate", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'SPECIAL PROMOTION',
        description: 'offer type',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'offer type is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'offer type must be a string'
    }),
    _ts_metadata("design:type", String)
], CreateOfferDto.prototype, "offerType", void 0);

//# sourceMappingURL=create-offer.dto.js.map