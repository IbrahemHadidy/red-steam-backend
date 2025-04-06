// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PasswordResetDto", {
    enumerable: true,
    get: function() {
        return PasswordResetDto;
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
let PasswordResetDto = class PasswordResetDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Password reset token',
        example: 'enter your token here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Token is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'Token must be a string'
    }),
    _ts_metadata("design:type", String)
], PasswordResetDto.prototype, "token", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'New password',
        example: 'enter your new password here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'New password is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'New password must be a string'
    }),
    (0, _classvalidator.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: 'Password is not strong enough.'
    }),
    _ts_metadata("design:type", String)
], PasswordResetDto.prototype, "newPassword", void 0);

//# sourceMappingURL=password-reset.dto.js.map