// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtAccessAuthGuard", {
    enumerable: true,
    get: function() {
        return JwtAccessAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistservice = require("../../modules/repositories/mongo/token-blacklist/token-blacklist.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let JwtAccessAuthGuard = class JwtAccessAuthGuard {
    constructor(config, jwtService, tokenBlacklist){
        this.config = config;
        this.jwtService = jwtService;
        this.tokenBlacklist = tokenBlacklist;
        this.accessTokenSecret = this.config.get('JWT_ACCESS_TOKEN_SECRET');
    }
    async canActivate(context) {
        // Get context and request
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        // Check if there is an access token
        const token = this.extractTokenFromCookies(request.cookies);
        if (!token) throw new _common.UnauthorizedException('Access token not found');
        try {
            // Verify token
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.accessTokenSecret
            });
            // Check if the token is blacklisted
            const isBlacklisted = await this.tokenBlacklist.isBlacklisted(token);
            if (isBlacklisted) throw new _common.UnauthorizedException('Token is blacklisted');
            // Add payload to request
            Object.assign(request, {
                userId: payload.id,
                email: payload.email,
                username: payload.username,
                admin: payload.admin,
                isVerified: payload.verified,
                accessToken: token
            });
            return true;
        } catch (err) {
            throw new _common.UnauthorizedException('Invalid token');
        }
    }
    extractTokenFromCookies(cookies) {
        const accessTokenHeader = cookies['accessToken'];
        if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) return null;
        const token = accessTokenHeader.split(' ')[1];
        return token;
    }
};
JwtAccessAuthGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _tokenblacklistservice.TokenBlacklistService === "undefined" ? Object : _tokenblacklistservice.TokenBlacklistService
    ])
], JwtAccessAuthGuard);

//# sourceMappingURL=jwt-access-auth.guard.js.map