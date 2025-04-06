// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SerializeInterceptor", {
    enumerable: true,
    get: function() {
        return SerializeInterceptor;
    }
});
const _common = require("@nestjs/common");
const _classtransformer = require("class-transformer");
const _operators = require("rxjs/operators");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SerializeInterceptor = class SerializeInterceptor {
    // The DTO class that will be used to transform the response data.
    constructor(dto){
        this.dto = dto;
    }
    // The intercept method is called for every request handled by the route where this interceptor is applied.
    intercept(_context, next) {
        return next.handle().pipe((0, _operators.map)((data)=>{
            // Transform the plain data into an instance of the DTO class, excluding any extraneous values.
            const transformedData = (0, _classtransformer.plainToClass)(this.dto, data, {
                excludeExtraneousValues: true
            });
            // Return the transformed data to continue the response process.
            return transformedData;
        }));
    }
};
SerializeInterceptor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ClassConstructor === "undefined" ? Object : ClassConstructor
    ])
], SerializeInterceptor);

//# sourceMappingURL=serialize.interceptor.js.map