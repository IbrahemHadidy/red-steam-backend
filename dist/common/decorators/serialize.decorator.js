// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Serialize", {
    enumerable: true,
    get: function() {
        return Serialize;
    }
});
const _common = require("@nestjs/common");
const _serializeinterceptor = require("../interceptors/serialize.interceptor");
function Serialize(dto) {
    return (0, _common.UseInterceptors)(new _serializeinterceptor.SerializeInterceptor(dto));
}

//# sourceMappingURL=serialize.decorator.js.map