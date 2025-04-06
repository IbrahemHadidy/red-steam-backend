// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagController", {
    enumerable: true,
    get: function() {
        return TagController;
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
const _tagservice = require("./tag.service");
const _createtagdto = require("./dtos/create-tag.dto");
const _updatetagdto = require("./dtos/update-tag.dto");
const _tagsearchquerydto = require("./dtos/tag-search-query.dto");
const _paginatedtagsdatadto = require("./serializer-dtos/paginated-tags-data.dto");
const _tagdto = require("./serializer-dtos/tag.dto");
const _createtagdescriptor = require("./api-descriptors/create-tag.descriptor");
const _deletetagdescriptor = require("./api-descriptors/delete-tag.descriptor");
const _getalltagsdescriptor = require("./api-descriptors/get-all-tags.descriptor");
const _gettagdescriptor = require("./api-descriptors/get-tag.descriptor");
const _gettagspaginateddescriptor = require("./api-descriptors/get-tags-paginated.descriptor");
const _gettagsdescriptor = require("./api-descriptors/get-tags.descriptor");
const _updatetagdescriptor = require("./api-descriptors/update-tag.descriptor");
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
let TagController = class TagController {
    constructor(tagService){
        this.tagService = tagService;
    }
    async createTag(body) {
        const result = await this.tagService.createTag(body);
        // Send the response
        return result;
    }
    async getTag(id) {
        const result = await this.tagService.getTag(id);
        // Send the response
        return result;
    }
    async getTags(ids) {
        const result = await this.tagService.getTags(ids);
        // Send the response
        return result;
    }
    async getAllTags() {
        const result = await this.tagService.getAllTags();
        // Send the response
        return result;
    }
    async getTagsPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.tagService.getTagsPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async updateTag(id, body) {
        const result = await this.tagService.updateTag(id, body);
        // Send the response
        return result;
    }
    async deleteTag(id) {
        const result = await this.tagService.deleteTag(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createtagdescriptor.createTagDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createtagdto.CreateTagDto === "undefined" ? Object : _createtagdto.CreateTagDto
    ]),
    _ts_metadata("design:returntype", Promise)
], TagController.prototype, "createTag", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_gettagdescriptor.getTagDescriptor),
    (0, _serializedecorator.Serialize)(_tagdto.TagDto),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], TagController.prototype, "getTag", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_gettagsdescriptor.getTagsDescriptor),
    (0, _serializedecorator.Serialize)(_tagdto.TagDto),
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
], TagController.prototype, "getTags", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getalltagsdescriptor.getAllTagsDescriptor),
    (0, _serializedecorator.Serialize)(_tagdto.TagDto),
    (0, _common.Get)(),
    (0, _common.HttpCode)(200),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], TagController.prototype, "getAllTags", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_gettagspaginateddescriptor.getTagsPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedtagsdatadto.PaginatedTagsDataDto),
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
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_tagsearchquerydto.TagQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _tagsearchquerydto.TagQueryDto === "undefined" ? Object : _tagsearchquerydto.TagQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], TagController.prototype, "getTagsPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updatetagdescriptor.updateTagDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updatetagdto.UpdateTagDto === "undefined" ? Object : _updatetagdto.UpdateTagDto
    ]),
    _ts_metadata("design:returntype", Promise)
], TagController.prototype, "updateTag", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletetagdescriptor.deleteTagDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], TagController.prototype, "deleteTag", null);
TagController = _ts_decorate([
    (0, _swagger.ApiTags)('Tag'),
    (0, _common.Controller)('tag'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _tagservice.TagService === "undefined" ? Object : _tagservice.TagService
    ])
], TagController);

//# sourceMappingURL=tag.controller.js.map