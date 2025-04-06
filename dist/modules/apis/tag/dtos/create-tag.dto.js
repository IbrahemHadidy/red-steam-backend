// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateTagDto", {
    enumerable: true,
    get: function() {
        return CreateTagDto;
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
let CreateTagDto = class CreateTagDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Tag Name',
        description: 'Name of the Tag',
        required: true
    }),
    (0, _classvalidator.IsString)({
        message: 'Name must be a string'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Name is required'
    }),
    _ts_metadata("design:type", String)
], CreateTagDto.prototype, "name", void 0);

//# sourceMappingURL=create-tag.dto.js.map