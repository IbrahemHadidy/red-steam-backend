// TypeORM
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlacklistedToken", {
    enumerable: true,
    get: function() {
        return BlacklistedToken;
    }
});
const _typeorm = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BlacklistedToken = class BlacklistedToken extends _typeorm.BaseEntity {
};
_ts_decorate([
    (0, _typeorm.ObjectIdColumn)(),
    _ts_metadata("design:type", typeof _typeorm.ObjectId === "undefined" ? Object : _typeorm.ObjectId)
], BlacklistedToken.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], BlacklistedToken.prototype, "token", void 0);
BlacklistedToken = _ts_decorate([
    (0, _typeorm.Entity)('blacklisted_tokens')
], BlacklistedToken);

//# sourceMappingURL=blacklisted-token.entity.js.map