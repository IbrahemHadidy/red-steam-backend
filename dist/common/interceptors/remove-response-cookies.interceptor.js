// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveResponseCookiesInterceptor", {
    enumerable: true,
    get: function() {
        return RemoveResponseCookiesInterceptor;
    }
});
const _common = require("@nestjs/common");
const _operators = require("rxjs/operators");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RemoveResponseCookiesInterceptor = class RemoveResponseCookiesInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, _operators.tap)({
            next: ()=>{
                // Get context and response
                const ctx = context.switchToHttp();
                const response = ctx.getResponse();
                // Clear accessToken from HttpOnly cookie
                response.clearCookie('accessToken', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/'
                });
                // Clear refreshToken from HttpOnly cookie
                response.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/'
                });
            }
        }));
    }
};
RemoveResponseCookiesInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], RemoveResponseCookiesInterceptor);

//# sourceMappingURL=remove-response-cookies.interceptor.js.map