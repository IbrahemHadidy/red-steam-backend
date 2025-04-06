// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerMiddleware", {
    enumerable: true,
    get: function() {
        return LoggerMiddleware;
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
let LoggerMiddleware = class LoggerMiddleware {
    constructor(logger){
        this.logger = logger;
    }
    use(req, res, next) {
        const formattedDate = this.formatDate(new Date());
        const methodColor = this.getMethodColor(req.method);
        const fullUrl = `${req.originalUrl}`;
        this.logger.log(`${this.lightBlue(`[${formattedDate}]`)} ${methodColor(req.method)} ${this.brightCyan(fullUrl)}`);
        next();
    }
    formatDate(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${formattedMinutes} ${ampm}`;
    }
    getMethodColor(method) {
        switch(method.toUpperCase()){
            case 'GET':
                return this.green;
            case 'POST':
                return this.blue;
            case 'PUT':
                return this.yellow;
            case 'DELETE':
                return this.red;
            case 'PATCH':
                return this.magenta;
            case 'OPTIONS':
                return this.cyan;
            case 'HEAD':
                return this.gray;
            default:
                return this.white;
        }
    }
    gray(text) {
        return `\x1b[90m${text}\x1b[0m`;
    }
    green(text) {
        return `\x1b[32m${text}\x1b[0m`;
    }
    blue(text) {
        return `\x1b[34m${text}\x1b[0m`;
    }
    lightBlue(text) {
        return `\x1b[94m${text}\x1b[0m`;
    }
    yellow(text) {
        return `\x1b[33m${text}\x1b[0m`;
    }
    red(text) {
        return `\x1b[31m${text}\x1b[0m`;
    }
    cyan(text) {
        return `\x1b[36m${text}\x1b[0m`;
    }
    brightCyan(text) {
        return `\x1b[96m${text}\x1b[0m`;
    }
    magenta(text) {
        return `\x1b[35m${text}\x1b[0m`;
    }
    white(text) {
        return `\x1b[37m${text}\x1b[0m`;
    }
};
LoggerMiddleware = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], LoggerMiddleware);

//# sourceMappingURL=logger.middleware.js.map