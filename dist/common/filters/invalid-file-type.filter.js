// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvalidFileTypeFilter", {
    enumerable: true,
    get: function() {
        return InvalidFileTypeFilter;
    }
});
const _common = require("@nestjs/common");
const _invalidfileexception = require("../exceptions/invalid-file.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let InvalidFileTypeFilter = class InvalidFileTypeFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(_common.HttpStatus.BAD_REQUEST).send({
            statusCode: _common.HttpStatus.BAD_REQUEST,
            message: exception.message
        });
    }
};
InvalidFileTypeFilter = _ts_decorate([
    (0, _common.Catch)(_invalidfileexception.InvalidFileException)
], InvalidFileTypeFilter);

//# sourceMappingURL=invalid-file-type.filter.js.map