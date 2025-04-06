// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ManagementController", {
    enumerable: true,
    get: function() {
        return ManagementController;
    }
});
const _common = require("@nestjs/common");
const _fastify = require("fastify");
const _googlerecaptcha = require("@nestlab/google-recaptcha");
const _fastifymulter = require("@nest-lab/fastify-multer");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _removeresponsecookiesdecorator = require("../../../../common/decorators/remove-response-cookies.decorator");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _verifieduserguard = require("../../../../common/guards/verified-user.guard");
const _managementservice = require("./management.service");
const _changecountrydto = require("./dtos/change-country.dto");
const _changeemaildto = require("./dtos/change-email.dto");
const _changepassworddto = require("./dtos/change-password.dto");
const _changeusernamedto = require("./dtos/change-username.dto");
const _deleteaccountdto = require("./dtos/delete-account.dto");
const _forgotpassworddto = require("./dtos/forgot-password.dto");
const _passwordresetdto = require("./dtos/password-reset.dto");
const _changecountrydescriptor = require("./api-descriptors/change-country.descriptor");
const _changeemaildescriptor = require("./api-descriptors/change-email.descriptor");
const _changepassworddescriptor = require("./api-descriptors/change-password.descriptor");
const _changeusernamedescriptor = require("./api-descriptors/change-username.descriptor");
const _checkemailexistsdescriptor = require("./api-descriptors/check-email-exists.descriptor");
const _checkusernameexistsdescriptor = require("./api-descriptors/check-username-exists.descriptor");
const _deleteaccountdescriptor = require("./api-descriptors/delete-account.descriptor");
const _deleteavatardescriptor = require("./api-descriptors/delete-avatar.descriptor");
const _forgotpassworddescriptor = require("./api-descriptors/forgot-password.descriptor");
const _passwordresetdescriptor = require("./api-descriptors/password-reset.descriptor");
const _uploadavatardescriptor = require("./api-descriptors/upload-avatar.descriptor");
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
let ManagementController = class ManagementController {
    constructor(managementService){
        this.managementService = managementService;
    }
    async checkEmailExists(email) {
        const data = {
            email
        };
        const result = await this.managementService.checkEmailExists(data);
        // Send the response
        return result;
    }
    async checkUsernameExists(username) {
        const data = {
            username
        };
        const result = await this.managementService.checkUsernameExists(data);
        // Send the response
        return result;
    }
    async changeUsername(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.managementService.changeUsername(data);
        // Send the response
        return result;
    }
    async changeEmail(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.managementService.changeEmail(data);
        // Send the response
        return result;
    }
    async changeCountry(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.managementService.changeCountry(data);
        // Send the response
        return result;
    }
    async uploadAvatar(request, avatar) {
        const data = {
            avatar,
            userId: request['userId']
        };
        const result = await this.managementService.uploadAvatar(data);
        // Send the response
        return result;
    }
    async deleteAvatar(request) {
        const data = {
            userId: request['userId']
        };
        const result = await this.managementService.deleteAvatar(data);
        // Send the response
        return result;
    }
    async changePassword(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.managementService.changePassword(data);
        // Send the response
        return result;
    }
    async forgotPassword(data) {
        const result = await this.managementService.forgotPassword(data);
        // Send the response
        return result;
    }
    async passwordReset(data) {
        const result = await this.managementService.passwordReset(data);
        // Send the response
        return result;
    }
    async deleteAccount(request, bodyData) {
        const data = {
            ...bodyData,
            userId: request['userId']
        };
        const result = await this.managementService.deleteAccount(data);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_checkemailexistsdescriptor.checkEmailExistsDescriptor),
    (0, _common.Get)('email/:email'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('email')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "checkEmailExists", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_checkusernameexistsdescriptor.checkUsernameExistsDescriptor),
    (0, _common.Get)('username/:username'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('username')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "checkUsernameExists", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_changeusernamedescriptor.changeUsernameDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Patch)('username'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _changeusernamedto.ChangeUsernameDto === "undefined" ? Object : _changeusernamedto.ChangeUsernameDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "changeUsername", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_changeemaildescriptor.changeEmailDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Patch)('email'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _changeemaildto.ChangeEmailDto === "undefined" ? Object : _changeemaildto.ChangeEmailDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "changeEmail", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_changecountrydescriptor.changeCountryDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Patch)('country'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _changecountrydto.ChangeCountryDto === "undefined" ? Object : _changecountrydto.ChangeCountryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "changeCountry", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_uploadavatardescriptor.uploadAvatarDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Patch)('avatar'),
    (0, _common.UseInterceptors)((0, _fastifymulter.FileInterceptor)('avatar')),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof File === "undefined" ? Object : File
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "uploadAvatar", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deleteavatardescriptor.deleteAvatarDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Delete)('avatar'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "deleteAvatar", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_changepassworddescriptor.changePasswordDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _common.Patch)('password/change'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _changepassworddto.ChangePasswordDto === "undefined" ? Object : _changepassworddto.ChangePasswordDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "changePassword", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_forgotpassworddescriptor.forgotPasswordDescriptor),
    (0, _googlerecaptcha.Recaptcha)(),
    (0, _common.Post)('password/forgot'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _forgotpassworddto.ForgotPasswordDto === "undefined" ? Object : _forgotpassworddto.ForgotPasswordDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "forgotPassword", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_passwordresetdescriptor.passwordResetDescriptor),
    (0, _common.Patch)('password/reset'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _passwordresetdto.PasswordResetDto === "undefined" ? Object : _passwordresetdto.PasswordResetDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "passwordReset", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deleteaccountdescriptor.deleteAccountDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _verifieduserguard.VerifiedUserGuard),
    (0, _removeresponsecookiesdecorator.RemoveResponseCookies)(),
    (0, _common.Delete)('account'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fastify.FastifyRequest === "undefined" ? Object : _fastify.FastifyRequest,
        typeof _deleteaccountdto.DeleteAccountDto === "undefined" ? Object : _deleteaccountdto.DeleteAccountDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ManagementController.prototype, "deleteAccount", null);
ManagementController = _ts_decorate([
    (0, _swagger.ApiTags)('User Management'),
    (0, _common.Controller)('user/management'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _managementservice.ManagementService === "undefined" ? Object : _managementservice.ManagementService
    ])
], ManagementController);

//# sourceMappingURL=management.controller.js.map