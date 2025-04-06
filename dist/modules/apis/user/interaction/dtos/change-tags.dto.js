// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChangeTagsDto", {
    enumerable: true,
    get: function() {
        return ChangeTagsDto;
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
let ChangeTagsDto = class ChangeTagsDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Tags to be added to the user',
        example: [
            'enter tags ids here'
        ],
        required: true
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tags are required'
    }),
    (0, _classvalidator.IsArray)({
        message: 'Tags must be an array of numbers'
    }),
    (0, _classvalidator.IsNumber)({}, {
        each: true,
        message: 'Tags must be an array of numbers'
    }),
    _ts_metadata("design:type", Array)
], ChangeTagsDto.prototype, "tags", void 0);

//# sourceMappingURL=change-tags.dto.js.map