// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetResponseCookies", {
    enumerable: true,
    get: function() {
        return SetResponseCookies;
    }
});
const _common = require("@nestjs/common");
const _setresponsecookiesinterceptor = require("../interceptors/set-response-cookies.interceptor");
function SetResponseCookies() {
    return (0, _common.UseInterceptors)(new _setresponsecookiesinterceptor.SetResponseCookiesInterceptor());
}

//# sourceMappingURL=set-response-cookies.decorator.js.map