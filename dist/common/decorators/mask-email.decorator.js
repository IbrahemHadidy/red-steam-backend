// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MaskEmail", {
    enumerable: true,
    get: function() {
        return MaskEmail;
    }
});
const _common = require("@nestjs/common");
const _maskemailinterceptor = require("../interceptors/mask-email.interceptor");
const MaskEmail = ()=>{
    return (0, _common.UseInterceptors)(_maskemailinterceptor.MaskEmailInterceptor);
};

//# sourceMappingURL=mask-email.decorator.js.map