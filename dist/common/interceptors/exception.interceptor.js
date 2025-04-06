"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExceptionInterceptor", {
    enumerable: true,
    get: function() {
        return ExceptionInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
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
let ExceptionInterceptor = class ExceptionInterceptor {
    constructor(logger){
        this.logger = logger;
    }
    intercept(_context, next) {
        return next.handle().pipe((0, _operators.catchError)((error)=>{
            let statusCode = 500;
            let message = 'Internal server error';
            let userMessage = 'An unexpected error occurred';
            if (error instanceof _common.HttpException) {
                statusCode = error.getStatus();
                const errorMessage = error.getResponse()['message'] || error.message;
                if (Array.isArray(errorMessage)) {
                    message = errorMessage.join(', ');
                } else {
                    message = errorMessage;
                }
                userMessage = process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            const response = {
                statusCode,
                message: userMessage,
                timestamp: new Date().toISOString(),
                path: _context.switchToHttp().getRequest().url,
                method: _context.switchToHttp().getRequest().method
            };
            this.logger.error(`Status: ${statusCode} | Message: ${message} | Path: ${_context.switchToHttp().getRequest().url}`, error.stack);
            return (0, _rxjs.throwError)(()=>response);
        }));
    }
};
ExceptionInterceptor = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], ExceptionInterceptor);

//# sourceMappingURL=exception.interceptor.js.map