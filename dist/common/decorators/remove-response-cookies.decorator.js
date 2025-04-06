// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveResponseCookies", {
    enumerable: true,
    get: function() {
        return RemoveResponseCookies;
    }
});
const _common = require("@nestjs/common");
const _removeresponsecookiesinterceptor = require("../interceptors/remove-response-cookies.interceptor");
function RemoveResponseCookies() {
    return (0, _common.UseInterceptors)(new _removeresponsecookiesinterceptor.RemoveResponseCookiesInterceptor());
}

//# sourceMappingURL=remove-response-cookies.decorator.js.map