// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SignupDto", {
    enumerable: true,
    get: function() {
        return SignupDto;
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
let SignupDto = class SignupDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'username',
        example: 'enter username here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Please enter a username'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SignupDto.prototype, "username", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'email',
        example: 'enter email here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Please enter an email'
    }),
    (0, _classvalidator.IsEmail)({}, {
        message: 'Please enter a valid email'
    }),
    _ts_metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'password',
        example: 'enter strong password here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Please enter a password'
    }),
    (0, _classvalidator.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }, {
        message: 'Password is too weak'
    }),
    _ts_metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'country code',
        maxLength: 2,
        minLength: 2,
        example: 'PS',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Please enter a country code'
    }),
    (0, _classvalidator.IsString)({
        message: 'Invalid country code'
    }),
    _ts_metadata("design:type", String)
], SignupDto.prototype, "country", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The recaptcha token.',
        example: 'TEST_TOKEN',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Recaptcha token is required.'
    }),
    (0, _classvalidator.IsString)({
        message: 'Recaptcha token must be a string.'
    }),
    _ts_metadata("design:type", String)
], SignupDto.prototype, "recaptchaToken", void 0);

//# sourceMappingURL=signup.dto.js.map