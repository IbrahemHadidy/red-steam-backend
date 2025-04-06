// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoginDto", {
    enumerable: true,
    get: function() {
        return LoginDto;
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
let LoginDto = class LoginDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The unique identifier for the user, can be either username or email.',
        example: 'enter username or email here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Identifier is required.'
    }),
    (0, _classvalidator.IsString)({
        message: 'Identifier must be a string.'
    }),
    _ts_metadata("design:type", String)
], LoginDto.prototype, "identifier", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The password of the user account.',
        example: 'enter password here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Password is required.'
    }),
    (0, _classvalidator.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: 'Invalid password.'
    }),
    _ts_metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Whether to remember the user on this device.',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Remember me is required.'
    }),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], LoginDto.prototype, "rememberMe", void 0);

//# sourceMappingURL=login.dto.js.map