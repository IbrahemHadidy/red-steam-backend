// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnionTypeValidationPipe", {
    enumerable: true,
    get: function() {
        return UnionTypeValidationPipe;
    }
});
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UnionTypeValidationPipe = class UnionTypeValidationPipe {
    constructor(allowedValues, options = {
        optional: false
    }){
        this.allowedValues = allowedValues;
        this.options = options;
    }
    transform(value) {
        if (this.options.optional && (value === undefined || value === null)) {
            return undefined;
        } else if (!this.allowedValues.includes(value)) {
            throw new _common.BadRequestException(`Invalid value: ${value}. Allowed values are ${this.allowedValues.join(', ')}`);
        } else {
            return value;
        }
    }
};
UnionTypeValidationPipe = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        Object
    ])
], UnionTypeValidationPipe);

//# sourceMappingURL=union-type-validation.pipe.js.map