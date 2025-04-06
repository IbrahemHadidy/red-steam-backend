// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ParseJsonPipe", {
    enumerable: true,
    get: function() {
        return ParseJsonPipe;
    }
});
const _common = require("@nestjs/common");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ParseJsonPipe = class ParseJsonPipe {
    constructor(dto, options = {
        optional: false,
        validate: false,
        excludeExtraneousValues: true
    }){
        this.dto = dto;
        this.options = options;
    }
    transform(value) {
        if (!value || typeof value !== 'string') {
            if (!this.options.optional) {
                throw new _common.BadRequestException('Missing required JSON query');
            }
            return undefined;
        }
        const jsonValue = JSON.parse(value);
        // Only parse if the onlyParse option is set
        if (this.options.validate === false) {
            return jsonValue;
        }
        const dtoObject = (0, _classtransformer.plainToClass)(this.dto, jsonValue, {
            excludeExtraneousValues: this.options.excludeExtraneousValues
        });
        const errors = (0, _classvalidator.validateSync)(dtoObject);
        if (errors.length > 0) {
            const errorMessages = errors.map((error)=>this.formatValidationErrors(error)).join(', ');
            throw new _common.BadRequestException(`Validation failed: ${errorMessages}`);
        }
        return dtoObject;
    }
    formatValidationErrors(error) {
        if (error.children && error.children.length > 0) {
            return error.children.map((child)=>this.formatValidationErrors(child)).join(', ');
        }
        return Object.values(error.constraints || {}).join(', ');
    }
};
ParseJsonPipe = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Function,
        Object
    ])
], ParseJsonPipe);

//# sourceMappingURL=parse-json.pipe.js.map