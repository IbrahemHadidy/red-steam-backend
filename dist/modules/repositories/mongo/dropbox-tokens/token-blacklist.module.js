// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropboxTokensModule", {
    enumerable: true,
    get: function() {
        return DropboxTokensModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _dropboxtokensservice = require("./dropbox-tokens.service");
const _dropboxtokenentity = require("./dropbox-token.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DropboxTokensModule = class DropboxTokensModule {
};
DropboxTokensModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _dropboxtokenentity.DropboxToken
            ], 'mongo')
        ],
        providers: [
            _dropboxtokensservice.DropboxTokensService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _dropboxtokensservice.DropboxTokensService
        ]
    })
], DropboxTokensModule);

//# sourceMappingURL=token-blacklist.module.js.map