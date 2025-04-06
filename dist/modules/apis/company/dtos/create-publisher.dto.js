// Class-validator
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePublisherDto", {
    enumerable: true,
    get: function() {
        return CreatePublisherDto;
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
let CreatePublisherDto = class CreatePublisherDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Publisher Name',
        description: 'Name of the publisher',
        required: true
    }),
    (0, _classvalidator.IsString)({
        message: 'Name must be a string'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Name is required'
    }),
    _ts_metadata("design:type", String)
], CreatePublisherDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'https://example.com',
        description: 'Website of the publisher',
        required: true
    }),
    (0, _classvalidator.IsString)({
        message: 'Website must be a string'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Website is required'
    }),
    _ts_metadata("design:type", String)
], CreatePublisherDto.prototype, "website", void 0);

//# sourceMappingURL=create-publisher.dto.js.map