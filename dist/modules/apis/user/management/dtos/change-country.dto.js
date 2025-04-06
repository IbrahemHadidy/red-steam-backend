// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChangeCountryDto", {
    enumerable: true,
    get: function() {
        return ChangeCountryDto;
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
let ChangeCountryDto = class ChangeCountryDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'new country',
        example: 'PS',
        required: true,
        minLength: 2,
        maxLength: 2
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'newCountry is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'New country must be a string'
    }),
    _ts_metadata("design:type", String)
], ChangeCountryDto.prototype, "newCountry", void 0);

//# sourceMappingURL=change-country.dto.js.map