// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MongoModule", {
    enumerable: true,
    get: function() {
        return MongoModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _typeorm = require("@nestjs/typeorm");
const _tokenblacklistmodule = require("./dropbox-tokens/token-blacklist.module");
const _tokenblacklistmodule1 = require("./token-blacklist/token-blacklist.module");
const _databaseservice = require("../../services/database/database.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MongoModule = class MongoModule {
};
MongoModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forRootAsync({
                inject: [
                    _databaseservice.DatabaseService
                ],
                extraProviders: [
                    _databaseservice.DatabaseService,
                    _common.Logger,
                    _config.ConfigService
                ],
                name: 'mongo',
                useFactory: async (databaseService)=>{
                    return databaseService.getMongoTypeOrmConfig();
                }
            }),
            _tokenblacklistmodule1.TokenBlacklistModule,
            _tokenblacklistmodule.DropboxTokensModule
        ]
    })
], MongoModule);

//# sourceMappingURL=mongo.module.js.map