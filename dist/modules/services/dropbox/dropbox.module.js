// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropboxModule", {
    enumerable: true,
    get: function() {
        return DropboxModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _tokenblacklistmodule = require("../../repositories/mongo/dropbox-tokens/token-blacklist.module");
const _avatarstorageservice = require("./avatar-storage.service");
const _dropboxservice = require("./dropbox.service");
const _gamestorageservice = require("./game-storage.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DropboxModule = class DropboxModule {
};
DropboxModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _tokenblacklistmodule.DropboxTokensModule
        ],
        providers: [
            _dropboxservice.DropboxService,
            _avatarstorageservice.AvatarStorageService,
            _gamestorageservice.GameStorageService,
            _common.Logger,
            _config.ConfigService
        ],
        exports: [
            _dropboxservice.DropboxService,
            _avatarstorageservice.AvatarStorageService,
            _gamestorageservice.GameStorageService
        ]
    })
], DropboxModule);

//# sourceMappingURL=dropbox.module.js.map