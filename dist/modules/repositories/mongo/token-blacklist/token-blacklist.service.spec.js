"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _crypto = require("crypto");
const _tokenblacklistmodule = require("./token-blacklist.module");
const _tokenblacklistservice = require("./token-blacklist.service");
describe('TokenBlacklistService', ()=>{
    let token;
    let tokenBlacklistService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _config.ConfigModule.forRoot(_integrationsetup.environmentConfig),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    name: 'mongo',
                    useFactory: async (configService)=>(0, _integrationsetup.getMongoTypeOrmConfig)(configService)
                }),
                _tokenblacklistmodule.TokenBlacklistModule
            ],
            providers: [
                _tokenblacklistservice.TokenBlacklistService,
                _common.Logger
            ]
        }).compile();
        tokenBlacklistService = module.get(_tokenblacklistservice.TokenBlacklistService);
        token = (0, _crypto.randomUUID)();
    });
    afterEach(async ()=>{
        await tokenBlacklistService.clearAll();
    });
    describe('blacklistToken', ()=>{
        it('should blacklist a token', async ()=>{
            await tokenBlacklistService.blacklistToken(token);
            const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);
            // Assertions
            expect(isBlacklisted).toBe(true);
        });
        it('should throw an error if the token already exists', async ()=>{
            // Add the token to the blacklist
            await tokenBlacklistService.blacklistToken(token);
            // Assertions
            await expect(tokenBlacklistService.blacklistToken(token)).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('isBlacklisted', ()=>{
        it('should return false if the token is not blacklisted', async ()=>{
            const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);
            // Assertions
            expect(isBlacklisted).toBe(false);
        });
        it('should return true if the token is blacklisted', async ()=>{
            // Add the token to the blacklist
            await tokenBlacklistService.blacklistToken(token);
            const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);
            // Assertions
            expect(isBlacklisted).toBe(true);
        });
    });
    describe('clearAll', ()=>{
        it('should clear all tokens from the blacklist', async ()=>{
            // Add the token to the blacklist
            await tokenBlacklistService.blacklistToken(token);
            // Clear all tokens
            await tokenBlacklistService.clearAll();
            // Assertions
            const isBlacklisted = await tokenBlacklistService.isBlacklisted(token);
            expect(isBlacklisted).toBe(false);
        });
    });
});

//# sourceMappingURL=token-blacklist.service.spec.js.map