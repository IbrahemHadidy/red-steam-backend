// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ParseQueryArrayPipe", {
    enumerable: true,
    get: function() {
        return ParseQueryArrayPipe;
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
let ParseQueryArrayPipe = class ParseQueryArrayPipe {
    constructor(options){
        this.parseArrayPipe = new _pipes.ParseArrayPipe(options);
    }
    async transform(value) {
        return this.parseArrayPipe.transform(value ?? [], {
            type: 'query'
        });
    }
};
ParseQueryArrayPipe = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof ParseArrayOptions === "undefined" ? Object : ParseArrayOptions
    ])
], ParseQueryArrayPipe);

//# sourceMappingURL=parse-query-array.pipe.js.map