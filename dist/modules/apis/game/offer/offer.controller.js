// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OfferController", {
    enumerable: true,
    get: function() {
        return OfferController;
    }
});
const _common = require("@nestjs/common");
const _fastifymulter = require("@nest-lab/fastify-multer");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _serializedecorator = require("../../../../common/decorators/serialize.decorator");
const _swagger = require("@nestjs/swagger");
const _parsejsonpipe = require("../../../../common/pipes/parse-json.pipe");
const _uniontypevalidationpipe = require("../../../../common/pipes/union-type-validation.pipe");
const _adminguard = require("../../../../common/guards/admin.guard");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _offerservice = require("./offer.service");
const _createofferdto = require("./dtos/create-offer.dto");
const _updateofferdto = require("./dtos/update-offer.dto");
const _offersearchquerydto = require("./dtos/offer-search-query.dto");
const _paginatedgamesdatadto = require("../serializer-dtos/paginated-games-data.dto");
const _createofferdescriptor = require("./api-descriptors/create-offer.descriptor");
const _deleteofferdescriptor = require("./api-descriptors/delete-offer.descriptor");
const _getofferspaginateddescriptor = require("./api-descriptors/get-offers-paginated.descriptor");
const _updateofferdescriptor = require("./api-descriptors/update-offer.descriptor");
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
let OfferController = class OfferController {
    constructor(offerService){
        this.offerService = offerService;
    }
    async create(body) {
        const result = await this.offerService.createOffer(body);
        // Send the response
        return result;
    }
    async getOffersPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.offerService.getOffersPaginated(page, limit, orderBy, order, searchQuery, true);
        // Send the response
        return result;
    }
    async updateOffer(id, body) {
        const result = await this.offerService.updateOffer({
            id,
            ...body
        });
        // Send the response
        return result;
    }
    async deleteOffer(id) {
        const result = await this.offerService.delete(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_createofferdescriptor.createOfferDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.UseInterceptors)((0, _fastifymulter.AnyFilesInterceptor)()),
    (0, _common.Post)(),
    (0, _common.HttpCode)(201),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createofferdto.CreateOfferDto === "undefined" ? Object : _createofferdto.CreateOfferDto
    ]),
    _ts_metadata("design:returntype", Promise)
], OfferController.prototype, "create", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getofferspaginateddescriptor.getOffersPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedgamesdatadto.PaginatedGamesDataDto),
    (0, _common.Get)('paginated'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('page', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_param(2, (0, _common.Query)('orderBy', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'id',
        'name',
        'discountPrice',
        'basePrice',
        'discountPercentage',
        'offerType',
        'discountStartDate',
        'discountEndDate'
    ]))),
    _ts_param(3, (0, _common.Query)('order', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'ASC',
        'DESC'
    ]))),
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_offersearchquerydto.OfferQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _offersearchquerydto.OfferQueryDto === "undefined" ? Object : _offersearchquerydto.OfferQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], OfferController.prototype, "getOffersPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updateofferdescriptor.updateOfferDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        typeof _updateofferdto.UpdateOfferDto === "undefined" ? Object : _updateofferdto.UpdateOfferDto
    ]),
    _ts_metadata("design:returntype", Promise)
], OfferController.prototype, "updateOffer", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deleteofferdescriptor.deleteOfferDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)('/:id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], OfferController.prototype, "deleteOffer", null);
OfferController = _ts_decorate([
    (0, _swagger.ApiTags)('Game Offer'),
    (0, _common.Controller)('game/offer'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _offerservice.OfferService === "undefined" ? Object : _offerservice.OfferService
    ])
], OfferController);

//# sourceMappingURL=offer.controller.js.map