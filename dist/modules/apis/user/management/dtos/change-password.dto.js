// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChangePasswordDto", {
    enumerable: true,
    get: function() {
        return ChangePasswordDto;
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
let ChangePasswordDto = class ChangePasswordDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'current password',
        example: 'enter current password here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Current password is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'Current password must be a string'
    }),
    _ts_metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'new password',
        example: 'enter new password here',
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
], ChangePasswordDto.prototype, "newPassword", void 0);

//# sourceMappingURL=change-password.dto.js.map