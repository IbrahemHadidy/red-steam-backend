// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SetResponseCookiesInterceptor", {
    enumerable: true,
    get: function() {
        return SetResponseCookiesInterceptor;
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
let SetResponseCookiesInterceptor = class SetResponseCookiesInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, _operators.tap)({
            next: (data)=>{
                // Get context, request and response
                const ctx = context.switchToHttp();
                const request = ctx.getRequest();
                const response = ctx.getResponse();
                // Destructure data
                const { accessToken, refreshToken, loggingIn } = data;
                // Get rememberMe value
                const rememberMe = loggingIn && request.body['rememberMe'] || false;
                // Set accessToken in HttpOnly cookie
                if (accessToken) {
                    response.setCookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        path: '/',
                        maxAge: 3600
                    });
                }
                // Set refreshToken in HttpOnly cookie
                if (refreshToken) {
                    response.setCookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        path: '/',
                        // If rememberMe & loggingIn is true, 30 days cookie, else session cookie
                        maxAge: rememberMe ? 2592000 : undefined
                    });
                }
                // Remove tokens and loggingIn from response data
                delete data.accessToken;
                delete data.refreshToken;
                delete data.loggingIn;
            }
        }));
    }
};
SetResponseCookiesInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], SetResponseCookiesInterceptor);

//# sourceMappingURL=set-response-cookies.interceptor.js.map