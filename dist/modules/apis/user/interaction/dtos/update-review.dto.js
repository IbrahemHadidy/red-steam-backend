// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateReviewDto", {
    enumerable: true,
    get: function() {
        return UpdateReviewDto;
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
let UpdateReviewDto = class UpdateReviewDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Review ID',
        example: 'enter review id number here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'reviewId is required'
    }),
    (0, _classvalidator.IsNumber)({}, {
        message: 'Review ID must be a number'
    }),
    _ts_metadata("design:type", Number)
], UpdateReviewDto.prototype, "reviewId", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Positive or Negative',
        example: true,
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'positive is required'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'Positive must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], UpdateReviewDto.prototype, "positive", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Review Content',
        example: 'enter review content here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'content is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'Content must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateReviewDto.prototype, "content", void 0);

//# sourceMappingURL=update-review.dto.js.map