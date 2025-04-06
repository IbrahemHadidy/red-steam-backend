// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChangeUsernameDto", {
    enumerable: true,
    get: function() {
        return ChangeUsernameDto;
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
let ChangeUsernameDto = class ChangeUsernameDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'new username',
        example: 'enter new username here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'New username is required'
    }),
    (0, _classvalidator.IsString)({
        message: 'New username must be a string'
    }),
    _ts_metadata("design:type", String)
], ChangeUsernameDto.prototype, "newUsername", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'current password',
        example: 'enter password here',
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Current password is required'
    }),
    _ts_metadata("design:type", String)
], ChangeUsernameDto.prototype, "currentPassword", void 0);

//# sourceMappingURL=change-username.dto.js.map