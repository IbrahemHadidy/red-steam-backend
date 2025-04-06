// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FeatureController", {
    enumerable: true,
    get: function() {
        return FeatureController;
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
const _featureservice = require("./feature.service");
const _createfeaturedto = require("./dtos/create-feature.dto");
const _updatefeaturedto = require("./dtos/update-feature.dto");
const _featuresearchquerydto = require("./dtos/feature-search-query.dto");
const _featuredto = require("./serializer-dtos/feature.dto");
const _paginatedfeaturesdatadto = require("./serializer-dtos/paginated-features-data.dto");
const _createfeaturedescriptor = require("./api-descriptors/create-feature.descriptor");
const _deletefeaturedescriptor = require("./api-descriptors/delete-feature.descriptor");
const _getallfeaturesdescriptor = require("./api-descriptors/get-all-features.descriptor");
const _getfeaturedescriptor = require("./api-descriptors/get-feature.descriptor");
const _getfeaturespaginateddescriptor = require("./api-descriptors/get-features-paginated.descriptor");
const _getfeaturesdescriptor = require("./api-descriptors/get-features.descriptor");
const _updatefeaturedescriptor = require("./api-descriptors/update-feature.descriptor");
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
let FeatureController = class FeatureController {
    constructor(featureService){
        this.featureService = featureService;
    }
    async createTag(body) {
        const result = await this.featureService.createFeature(body);
        // Send the response
        return result;
    }
    async getFeature(id) {
        const result = await this.featureService.getFeature(id);
        // Send the response
        return result;
    }
    async getFeatures(ids) {
        const result = await this.featureService.getFeatures(ids);
        // Send the response
        return result;
    }
    async getAllFeatures() {
        const result = await this.featureService.getAllFeatures();
        // Send the response
        return result;
    }
    async getFeaturesPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.featureService.getFeaturesPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async updateFeature(id, body) {
        const result = await this.featureService.updateFeature(id, body);
        // Send the response
        return result;
    }
    async deleteFeature(id) {
        const result = await this.featureService.deleteFeature(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createfeaturedescriptor.createFeatureDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createfeaturedto.CreateFeatureDto === "undefined" ? Object : _createfeaturedto.CreateFeatureDto
    ]),
    _ts_metadata("design:returntype", Promise)
], FeatureController.prototype, "createTag", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getfeaturedescriptor.getFeatureDescriptor),
    (0, _serializedecorator.Serialize)(_featuredto.FeatureDto),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], FeatureController.prototype, "getFeature", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getfeaturesdescriptor.getFeaturesDescriptor),
    (0, _serializedecorator.Serialize)(_featuredto.FeatureDto),
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
], FeatureController.prototype, "getFeatures", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getallfeaturesdescriptor.getAllFeaturesDescriptor),
    (0, _serializedecorator.Serialize)(_featuredto.FeatureDto),
    (0, _common.Get)(),
    (0, _common.HttpCode)(200),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], FeatureController.prototype, "getAllFeatures", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getfeaturespaginateddescriptor.getFeaturesPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedfeaturesdatadto.PaginatedFeaturesDataDto),
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
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_featuresearchquerydto.FeatureQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _featuresearchquerydto.FeatureQueryDto === "undefined" ? Object : _featuresearchquerydto.FeatureQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], FeatureController.prototype, "getFeaturesPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatefeaturedescriptor.updateFeatureDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updatefeaturedto.UpdateFeatureDto === "undefined" ? Object : _updatefeaturedto.UpdateFeatureDto
    ]),
    _ts_metadata("design:returntype", Promise)
], FeatureController.prototype, "updateFeature", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletefeaturedescriptor.deleteFeatureDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], FeatureController.prototype, "deleteFeature", null);
FeatureController = _ts_decorate([
    (0, _swagger.ApiTags)('Feature'),
    (0, _common.Controller)('feature'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _featureservice.FeatureService === "undefined" ? Object : _featureservice.FeatureService
    ])
], FeatureController);

//# sourceMappingURL=feature.controller.js.map