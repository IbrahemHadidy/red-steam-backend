// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateFeatureDto", {
    enumerable: true,
    get: function() {
        return UpdateFeatureDto;
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
let UpdateFeatureDto = class UpdateFeatureDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Feature Name',
        description: 'Feature of the Tag',
        required: false
    }),
    (0, _classvalidator.IsString)({
        message: 'Name must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateFeatureDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Feature icon',
        description: 'Icon of the Feature',
        required: false
    }),
    (0, _classvalidator.IsString)({
        message: 'Icon must be a string'
    }),
    _ts_metadata("design:type", String)
], UpdateFeatureDto.prototype, "icon", void 0);

//# sourceMappingURL=update-feature.dto.js.map