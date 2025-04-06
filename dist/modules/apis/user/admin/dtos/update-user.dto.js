// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateUserDto", {
    enumerable: true,
    get: function() {
        return UpdateUserDto;
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
let UpdateUserDto = class UpdateUserDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'true',
        description: 'The user is an administrator or not'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'isAdmin must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], UpdateUserDto.prototype, "isAdmin", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'false',
        description: 'The user is verified or not'
    }),
    (0, _classvalidator.IsBoolean)({
        message: 'isVerified must be a boolean'
    }),
    _ts_metadata("design:type", Boolean)
], UpdateUserDto.prototype, "isVerified", void 0);

//# sourceMappingURL=update-user.dto.js.map