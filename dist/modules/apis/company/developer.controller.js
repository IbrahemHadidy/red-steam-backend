// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeveloperController", {
    enumerable: true,
    get: function() {
        return DeveloperController;
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
const _companyservice = require("./company.service");
const _createdeveloperdto = require("./dtos/create-developer.dto");
const _updatedeveloperdto = require("./dtos/update-developer.dto");
const _developersearchquerydto = require("./dtos/developer-search-query.dto");
const _companydto = require("./serializer-dtos/company.dto");
const _paginatedcompaniesdatadto = require("./serializer-dtos/paginated-companies-data.dto");
const _createdeveloperdescriptor = require("./api-descriptors/create-developer.descriptor");
const _deletedeveloperdescriptor = require("./api-descriptors/delete-developer.descriptor");
const _getalldevelopersdescriptor = require("./api-descriptors/get-all-developers.descriptor");
const _getdeveloperdescriptor = require("./api-descriptors/get-developer.descriptor");
const _getdeveloperspaginateddescriptor = require("./api-descriptors/get-developers-paginated.descriptor");
const _getdevelopersdescriptor = require("./api-descriptors/get-developers.descriptor");
const _updatedeveloperdescriptor = require("./api-descriptors/update-developer.descriptor");
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
let DeveloperController = class DeveloperController {
    constructor(companyService){
        this.companyService = companyService;
    }
    async createDeveloper(body) {
        const result = await this.companyService.createDeveloper(body);
        // Send the response
        return result;
    }
    async getDeveloper(id) {
        const result = await this.companyService.getDeveloper(id);
        // Send the response
        return result;
    }
    async getDevelopers(ids) {
        const result = await this.companyService.getDevelopers(ids);
        // Send the response
        return result;
    }
    async getAllDevelopers() {
        const result = await this.companyService.getAllDevelopers();
        // Send the response
        return result;
    }
    async getDevelopersPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.companyService.getDevelopersPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async updateDeveloper(id, body) {
        const result = await this.companyService.updateDeveloper(id, body);
        // Send the response
        return result;
    }
    async deleteDeveloper(id) {
        const result = await this.companyService.deleteDeveloper(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createdeveloperdescriptor.createDeveloperDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createdeveloperdto.CreateDeveloperDto === "undefined" ? Object : _createdeveloperdto.CreateDeveloperDto
    ]),
    _ts_metadata("design:returntype", Promise)
], DeveloperController.prototype, "createDeveloper", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getdeveloperdescriptor.getDeveloperDescriptor),
    (0, _serializedecorator.Serialize)(_companydto.CompanyDto),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DeveloperController.prototype, "getDeveloper", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getdevelopersdescriptor.getDevelopersDescriptor),
    (0, _serializedecorator.Serialize)(_companydto.CompanyDto),
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
], DeveloperController.prototype, "getDevelopers", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getalldevelopersdescriptor.getAllDevelopersDescriptor),
    (0, _serializedecorator.Serialize)(_companydto.CompanyDto),
    (0, _common.Get)(),
    (0, _common.HttpCode)(200),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], DeveloperController.prototype, "getAllDevelopers", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getdeveloperspaginateddescriptor.getDevelopersPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedcompaniesdatadto.PaginatedCompaniesDataDto),
    (0, _common.Get)('paginated'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('page', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_param(2, (0, _common.Query)('orderBy', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'id',
        'name',
        'website'
    ]))),
    _ts_param(3, (0, _common.Query)('order', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'ASC',
        'DESC'
    ]))),
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_developersearchquerydto.DeveloperQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _developersearchquerydto.DeveloperQueryDto === "undefined" ? Object : _developersearchquerydto.DeveloperQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], DeveloperController.prototype, "getDevelopersPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatedeveloperdescriptor.updateDeveloperDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updatedeveloperdto.UpdateDeveloperDto === "undefined" ? Object : _updatedeveloperdto.UpdateDeveloperDto
    ]),
    _ts_metadata("design:returntype", Promise)
], DeveloperController.prototype, "updateDeveloper", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletedeveloperdescriptor.deleteDeveloperDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DeveloperController.prototype, "deleteDeveloper", null);
DeveloperController = _ts_decorate([
    (0, _swagger.ApiTags)('Developer'),
    (0, _common.Controller)('developer'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _companyservice.CompanyService === "undefined" ? Object : _companyservice.CompanyService
    ])
], DeveloperController);

//# sourceMappingURL=developer.controller.js.map