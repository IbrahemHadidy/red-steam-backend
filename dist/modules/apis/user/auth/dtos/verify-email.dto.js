// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VerifyEmailDto", {
    enumerable: true,
    get: function() {
        return VerifyEmailDto;
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
let VerifyEmailDto = class VerifyEmailDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The username of email to verify.',
        example: 'enter username here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'username cannot be empty.'
    }),
    (0, _classvalidator.IsString)({
        message: 'username must be a string.'
    }),
    _ts_metadata("design:type", String)
], VerifyEmailDto.prototype, "username", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The verification token.',
        example: 'enter token here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Verification token cannot be empty.'
    }),
    (0, _classvalidator.IsString)({
        message: 'Verification token must be a string.'
    }),
    _ts_metadata("design:type", String)
], VerifyEmailDto.prototype, "token", void 0);

//# sourceMappingURL=verify-email.dto.js.map