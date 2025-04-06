// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _fastify = require("fastify");
const _googlerecaptcha = require("@nestlab/google-recaptcha");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _maskemaildecorator = require("../../../../common/decorators/mask-email.decorator");
const _removeresponsecookiesdecorator = require("../../../../common/decorators/remove-response-cookies.decorator");
const _serializedecorator = require("../../../../common/decorators/serialize.decorator");
const _setresponsecookiesdecorator = require("../../../../common/decorators/set-response-cookies.decorator");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _jwtrefreshauthguard = require("../../../../common/guards/jwt-refresh-auth.guard");
const _authservice = require("./auth.service");
const _logindto = require("./dtos/login.dto");
const _signupdto = require("./dtos/signup.dto");
const _verifyemaildto = require("./dtos/verify-email.dto");
const _nesteddatadto = require("../serializer-dtos/nested-data.dto");
const _autologindescriptor = require("./api-descriptors/auto-login.descriptor");
const _logindescriptor = require("./api-descriptors/login.descriptor");
const _logoutdiscriptor = require("./api-descriptors/logout.discriptor");
const _refreshtokendescriptor = require("./api-descriptors/refresh-token.descriptor");
const _resendverificationtokendescriptor = require("./api-descriptors/resend-verification-token.descriptor");
const _signupdescriptor = require("./api-descriptors/signup.descriptor");
const _updatetokensdescriptor = require("./api-descriptors/update-tokens.descriptor");
const _userdatadescriptor = require("./api-descriptors/user-data.descriptor");
const _verificationstatusdescriptor = require("./api-descriptors/verification-status.descriptor");
const _verifyemaildescriptor = require("./api-descriptors/verify-email.descriptor");
const _waitingtimedescriptor = require("./api-descriptors/waiting-time.descriptor");
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
let AuthController = class AuthController {
    constructor(authService){
        this.authService = authService;
    }
    async signup(data) {
        const result = await this.authService.signup(data);
        // Send the response
        return result;
    }
    async login(data) {
        const result = await this.authService.login(data);
        // Send the response
        return result;
    }
    async autoLogin(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.authService.autoLogin(data);
        // Send the response
        return result;
    }
    async logout(request) {
        const data = {
            userId: request['userId'],
            accessToken: request['accessToken'],
            refreshToken: request['refreshToken']
        };
        const result = await this.authService.logout(data);
        // Send the response
        return result;
    }
    async refreshToken(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.authService.refreshToken(data);
        // Send the response
        return result;
    }
    async getUserData(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.authService.getUserData(data);
        // Send the response
        return result;
    }
    async getVerificationStatus(request) {
        const data = {
            email: request['email']
        };
        const result = await this.authService.getVerificationStatus(data);
        // Send the response
        return result;
    }
    async resendVerificationToken(request) {
        const data = {
            email: request['email']
        };
        const result = await this.authService.resendVerificationToken(data);
        // Send the response
        return result;
    }
    async verifyEmail(data) {
        const result = await this.authService.verifyEmail(data);
        // Send the response
        return result;
    }
    async updateTokens(request) {
        const data = {
            userId: request['userId'],
            accessToken: request['accessToken'],
            refreshToken: request['refreshToken']
        };
        const result = await this.authService.updateTokens(data);
        // Send the response
        return result;
    }
    getWaitingTime() {
        const result = this.authService.getWaitingTime();
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_signupdescriptor.signupDescriptor),
    (0, _googlerecaptcha.Recaptcha)(),
    (0, _maskemaildecorator.MaskEmail)(),
    (0, _serializedecorator.Serialize)(_nesteddatadto.NestedDataDto),
    (0, _common.Post)('signup'),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _signupdto.SignupDto === "undefined" ? Object : _signupdto.SignupDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_logindescriptor.loginDescriptor),
    (0, _maskemaildecorator.MaskEmail)(),
    (0, _setresponsecookiesdecorator.SetResponseCookies)(),
    (0, _serializedecorator.Serialize)(_nesteddatadto.NestedDataDto),
    (0, _common.Post)('login'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logindto.LoginDto === "undefined" ? Object : _logindto.LoginDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_autologindescriptor.autoLoginDescriptor),
    (0, _common.UseGuards)(_jwtrefreshauthguard.JwtRefreshAuthGuard),
    (0, _setresponsecookiesdecorator.SetResponseCookies)(),
    (0, _serializedecorator.Serialize)(_nesteddatadto.NestedDataDto),
    (0, _maskemaildecorator.MaskEmail)(),
    (0, _common.Post)('auto-login'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "autoLogin", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_logoutdiscriptor.logoutDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _jwtrefreshauthguard.JwtRefreshAuthGuard),
    (0, _removeresponsecookiesdecorator.RemoveResponseCookies)(),
    (0, _common.Post)('logout'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_refreshtokendescriptor.refreshTokenDescriptor),
    (0, _common.UseGuards)(_jwtrefreshauthguard.JwtRefreshAuthGuard),
    (0, _setresponsecookiesdecorator.SetResponseCookies)(),
    (0, _serializedecorator.Serialize)(_nesteddatadto.NestedDataDto),
    (0, _common.Post)('refresh-token'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_userdatadescriptor.userDataDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _serializedecorator.Serialize)(_nesteddatadto.NestedDataDto),
    (0, _maskemaildecorator.MaskEmail)(),
    (0, _common.Get)('user-data'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getUserData", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_verificationstatusdescriptor.verificationStatusDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Get)('verification-status'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getVerificationStatus", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_resendverificationtokendescriptor.resendVerificationTokenDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard),
    (0, _common.Post)('resend-verification-token'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerificationToken", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_verifyemaildescriptor.verifyEmailDescriptor),
    (0, _common.Post)('verify-email'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _verifyemaildto.VerifyEmailDto === "undefined" ? Object : _verifyemaildto.VerifyEmailDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatetokensdescriptor.updateTokensDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _jwtrefreshauthguard.JwtRefreshAuthGuard),
    (0, _setresponsecookiesdecorator.SetResponseCookies)(),
    (0, _serializedecorator.Serialize)(_nesteddatadto.NestedDataDto),
    (0, _common.Post)('update-tokens'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "updateTokens", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_waitingtimedescriptor.waitingTimeDescriptor),
    (0, _common.Get)('waiting-time'),
    (0, _common.HttpCode)(200),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "getWaitingTime", null);
AuthController = _ts_decorate([
    (0, _swagger.ApiTags)('User Authentication'),
    (0, _common.Controller)('user/auth'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map