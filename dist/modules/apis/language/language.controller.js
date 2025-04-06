// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LanguageController", {
    enumerable: true,
    get: function() {
        return LanguageController;
    }
});
const _common = require("@nestjs/common");
const _serializedecorator = require("../../../common/decorators/serialize.decorator");
const _apidescriptordecorator = require("../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _parsejsonpipe = require("../../../common/pipes/parse-json.pipe");
const _uniontypevalidationpipe = require("../../../common/pipes/union-type-validation.pipe");
const _adminguard = require("../../../common/guards/admin.guard");
const _jwtaccessauthguard = require("../../../common/guards/jwt-access-auth.guard");
const _languageservice = require("./language.service");
const _createlanguagedto = require("./dtos/create-language.dto");
const _updatelanguagedto = require("./dtos/update-language.dto");
const _languagesearchquerydto = require("./dtos/language-search-query.dto");
const _languagedto = require("./serializer-dtos/language.dto");
const _paginatedlanguagesdatadto = require("./serializer-dtos/paginated-languages-data.dto");
const _createlanguagedescriptor = require("./api-descriptors/create-language.descriptor");
const _deletelanguagedescriptor = require("./api-descriptors/delete-language.descriptor");
const _getalllanguagesdescriptor = require("./api-descriptors/get-all-languages.descriptor");
const _getlanguagedescriptor = require("./api-descriptors/get-language.descriptor");
const _getlanguagespaginateddescriptor = require("./api-descriptors/get-languages-paginated.descriptor");
const _getlanguagesdescriptor = require("./api-descriptors/get-languages.descriptor");
const _updatelanguagedescriptor = require("./api-descriptors/update-language.descriptor");
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
let LanguageController = class LanguageController {
    constructor(languageService){
        this.languageService = languageService;
    }
    async createLanguage(body) {
        const result = await this.languageService.createLanguage(body);
        // Send the response
        return result;
    }
    async getLanguage(id) {
        const result = await this.languageService.getLanguage(id);
        // Send the response
        return result;
    }
    async getLanguages(ids) {
        const result = await this.languageService.getLanguages(ids);
        // Send the response
        return result;
    }
    async getAllLanguages() {
        const result = await this.languageService.getAllLanguages();
        // Send the response
        return result;
    }
    async getLanguagesPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.languageService.getLanguagesPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async updateLanguage(id, body) {
        const result = await this.languageService.updateLanguage(id, body);
        // Send the response
        return result;
    }
    async deleteLanguage(id) {
        const result = await this.languageService.deleteLanguage(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createlanguagedescriptor.createLanguageDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createlanguagedto.CreateLanguageDto === "undefined" ? Object : _createlanguagedto.CreateLanguageDto
    ]),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "createLanguage", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getlanguagedescriptor.getLanguageDescriptor),
    (0, _serializedecorator.Serialize)(_languagedto.LanguageDto),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguage", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getlanguagesdescriptor.getLanguagesDescriptor),
    (0, _serializedecorator.Serialize)(_languagedto.LanguageDto),
    (0, _common.Get)('bulk/:ids'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('ids', new _common.ParseArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguages", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getalllanguagesdescriptor.getAllLanguagesDescriptor),
    (0, _serializedecorator.Serialize)(_languagedto.LanguageDto),
    (0, _common.Get)(),
    (0, _common.HttpCode)(200),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "getAllLanguages", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getlanguagespaginateddescriptor.getLanguagesPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedlanguagesdatadto.PaginatedLanguagesDataDto),
    (0, _common.Get)('paginated'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('page', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_param(2, (0, _common.Query)('orderBy', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'id',
        'name'
    ]))),
    _ts_param(3, (0, _common.Query)('order', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'ASC',
        'DESC'
    ]))),
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_languagesearchquerydto.LanguageQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _languagesearchquerydto.LanguageQueryDto === "undefined" ? Object : _languagesearchquerydto.LanguageQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "getLanguagesPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatelanguagedescriptor.updateLanguageDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updatelanguagedto.UpdateLanguageDto === "undefined" ? Object : _updatelanguagedto.UpdateLanguageDto
    ]),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "updateLanguage", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletelanguagedescriptor.deleteLanguageDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], LanguageController.prototype, "deleteLanguage", null);
LanguageController = _ts_decorate([
    (0, _swagger.ApiTags)('Language'),
    (0, _common.Controller)('language'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _languageservice.LanguageService === "undefined" ? Object : _languageservice.LanguageService
    ])
], LanguageController);

//# sourceMappingURL=language.controller.js.map