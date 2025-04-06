// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ParseQueryBoolPipe", {
    enumerable: true,
    get: function() {
        return ParseQueryBoolPipe;
    }
});
const _common = require("@nestjs/common");
const _pipes = require("@nestjs/common/pipes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ParseQueryBoolPipe = class ParseQueryBoolPipe {
    constructor(options){
        this.parseBoolPipe = new _pipes.ParseBoolPipe(options);
    }
    async transform(value) {
        if (value === undefined || value === null) {
            return undefined;
        }
        return await this.parseBoolPipe.transform(value, {
            type: 'query'
        });
    }
};
ParseQueryBoolPipe = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ParseBoolPipeOptions === "undefined" ? Object : ParseBoolPipeOptions
    ])
], ParseQueryBoolPipe);

//# sourceMappingURL=parse-query-boolean.pipe.js.map