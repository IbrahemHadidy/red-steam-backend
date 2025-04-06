// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenBlacklistService", {
    enumerable: true,
    get: function() {
        return TokenBlacklistService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _blacklistedtokenentity = require("./blacklisted-token.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let TokenBlacklistService = class TokenBlacklistService {
    constructor(blacklistTokenRepository, logger){
        this.blacklistTokenRepository = blacklistTokenRepository;
        this.logger = logger;
    }
    /**
   * Adds a token to the blacklist.
   * @param token - The token to blacklist.
   * @throws ConflictException if the token already exists in the blacklist.
   */ async blacklistToken(token) {
        this.logger.log(`Attempting to blacklist token: ${token}`);
        // Check if the token already exists in the blacklist
        const tokenExists = await this.isBlacklisted(token);
        // If the token already exists, throw a conflict exception
        if (tokenExists) {
            this.logger.warn(`Token already blacklisted: ${token}`);
            throw new _common.ConflictException('Token already exists in blacklist');
        }
        // Add the token to the blacklist
        await this.blacklistTokenRepository.save({
            token
        });
        this.logger.log(`Successfully blacklisted token: ${token}`);
    }
    /**
   * Checks if a token is blacklisted.
   * @param token - The token to check.
   * @returns A boolean indicating whether the token is blacklisted.
   */ async isBlacklisted(token) {
        this.logger.log(`Checking if token is blacklisted: ${token}`);
        // Check if the token already exists in the blacklist
        const blacklistedToken = await this.blacklistTokenRepository.findOne({
            where: {
                token
            }
        });
        // If the token exists, return true
        const isBlacklisted = !!blacklistedToken;
        this.logger.log(`Token blacklisted status for ${token}: ${isBlacklisted}`);
        // Return the boolean indicating whether the token is blacklisted
        return isBlacklisted;
    }
    /**
   * Removes all tokens from the blacklist.
   */ async clearAll() {
        this.logger.log('Clearing all tokens from the blacklist');
        // Remove all tokens from the blacklist
        await this.blacklistTokenRepository.delete({});
        this.logger.log('All tokens successfully removed from the blacklist');
    }
};
TokenBlacklistService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_blacklistedtokenentity.BlacklistedToken, 'mongo')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], TokenBlacklistService);

//# sourceMappingURL=token-blacklist.service.js.map