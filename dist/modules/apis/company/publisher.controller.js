// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublisherController", {
    enumerable: true,
    get: function() {
        return PublisherController;
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
const _createpublisherdto = require("./dtos/create-publisher.dto");
const _updatepublisherdto = require("./dtos/update-publisher.dto");
const _publishersearchquerydto = require("./dtos/publisher-search-query.dto");
const _companydto = require("./serializer-dtos/company.dto");
const _paginatedcompaniesdatadto = require("./serializer-dtos/paginated-companies-data.dto");
const _createpublisherdescriptor = require("./api-descriptors/create-publisher.descriptor");
const _deletepublisherdescriptor = require("./api-descriptors/delete-publisher.descriptor");
const _getallpublishersdescriptor = require("./api-descriptors/get-all-publishers.descriptor");
const _getpublisherspaginateddescriptor = require("./api-descriptors/get-publishers-paginated.descriptor");
const _getpublishersdescriptor = require("./api-descriptors/get-publishers.descriptor");
const _updatepublisherdescriptor = require("./api-descriptors/update-publisher.descriptor");
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
let PublisherController = class PublisherController {
    constructor(companyService){
        this.companyService = companyService;
    }
    async createPublisher(body) {
        const result = await this.companyService.createPublisher(body);
        // Send the response
        return result;
    }
    async getPublisher(id) {
        const result = await this.companyService.getPublisher(id);
        // Send the response
        return result;
    }
    async getPublishers(ids) {
        const result = await this.companyService.getPublishers(ids);
        // Send the response
        return result;
    }
    async getAllPublishers() {
        const result = await this.companyService.getAllPublishers();
        // Send the response
        return result;
    }
    async getPublishersPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.companyService.getPublishersPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async updatePublisher(id, body) {
        const result = await this.companyService.updatePublisher(id, body);
        // Send the response
        return result;
    }
    async deletePublisher(id) {
        const result = await this.companyService.deletePublisher(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createpublisherdescriptor.createPublisherDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpublisherdto.CreatePublisherDto === "undefined" ? Object : _createpublisherdto.CreatePublisherDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PublisherController.prototype, "createPublisher", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getpublishersdescriptor.getPublishersDescriptor),
    (0, _serializedecorator.Serialize)(_companydto.CompanyDto),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], PublisherController.prototype, "getPublisher", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getpublishersdescriptor.getPublishersDescriptor),
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
], PublisherController.prototype, "getPublishers", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getallpublishersdescriptor.getAllPublishersDescriptor),
    (0, _serializedecorator.Serialize)(_companydto.CompanyDto),
    (0, _common.Get)(),
    (0, _common.HttpCode)(200),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], PublisherController.prototype, "getAllPublishers", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getpublisherspaginateddescriptor.getPublishersPaginatedDescriptor),
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
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_publishersearchquerydto.PublisherQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _publishersearchquerydto.PublisherQueryDto === "undefined" ? Object : _publishersearchquerydto.PublisherQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PublisherController.prototype, "getPublishersPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatepublisherdescriptor.updatePublisherDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updatepublisherdto.UpdatePublisherDto === "undefined" ? Object : _updatepublisherdto.UpdatePublisherDto
    ]),
    _ts_metadata("design:returntype", Promise)
], PublisherController.prototype, "updatePublisher", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletepublisherdescriptor.deletePublisherDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], PublisherController.prototype, "deletePublisher", null);
PublisherController = _ts_decorate([
    (0, _swagger.ApiTags)('Publisher'),
    (0, _common.Controller)('publisher'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _companyservice.CompanyService === "undefined" ? Object : _companyservice.CompanyService
    ])
], PublisherController);

//# sourceMappingURL=publisher.controller.js.map