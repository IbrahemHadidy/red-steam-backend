// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DataController", {
    enumerable: true,
    get: function() {
        return DataController;
    }
});
const _common = require("@nestjs/common");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _serializedecorator = require("../../../../common/decorators/serialize.decorator");
const _parsequeryarraypipe = require("../../../../common/pipes/parse-query-array.pipe");
const _parsequerybooleanpipe = require("../../../../common/pipes/parse-query-boolean.pipe");
const _parsequeryintegerpipe = require("../../../../common/pipes/parse-query-integer.pipe");
const _uniontypevalidationpipe = require("../../../../common/pipes/union-type-validation.pipe");
const _dataservice = require("./data.service");
const _gamedto = require("../serializer-dtos/game.dto");
const _reviewdto = require("../../review/serializer-dtos/review.dto");
const _getbyiddescriptor = require("./api-descriptors/get-by-id.descriptor");
const _getbyidsdescriptor = require("./api-descriptors/get-by-ids.descriptor");
const _getbynewestdescriptor = require("./api-descriptors/get-by-newest.descriptor");
const _getbyoffersdescriptor = require("./api-descriptors/get-by-offers.descriptor");
const _getbyparametersdescriptor = require("./api-descriptors/get-by-parameters.descriptor");
const _getbypartialnamedescriptor = require("./api-descriptors/get-by-partial-name.descriptor");
const _getbyspecialsdescriptor = require("./api-descriptors/get-by-specials.descriptor");
const _getbytagsdescriptor = require("./api-descriptors/get-by-tags.descriptor");
const _getbytopsalesdescriptor = require("./api-descriptors/get-by-top-sales.descriptor");
const _getbyupcomingdescriptor = require("./api-descriptors/get-by-upcoming.descriptor");
const _getfeatureddescriptor = require("./api-descriptors/get-featured.descriptor");
const _getgamereviewsdescriptor = require("./api-descriptors/get-game-reviews.descriptor");
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
let DataController = class DataController {
    constructor(dataService){
        this.dataService = dataService;
    }
    async search(partialName) {
        const result = await this.dataService.getByPartialName(partialName);
        // Send the response
        return result;
    }
    async getByParameters(sort, partialName, maxPrice, tags, excludeTags, paid, offers, platforms, publishers, developers, features, languages, featured, excludeMature, excludedGames, upcomingMode, page, limit) {
        const result = await this.dataService.getByParameters({
            sort,
            partialName,
            maxPrice,
            tags,
            excludeTags,
            paid,
            offers,
            platforms,
            publishers,
            developers,
            features,
            languages,
            featured,
            excludeMature,
            excludedGames,
            upcomingMode
        }, {
            page,
            limit
        });
        // Send the response
        return result;
    }
    async getFeatured(excludedGames = [], limit = 10) {
        const result = await this.dataService.getFeaturedGames(excludedGames, limit);
        // Send the response
        return result;
    }
    async getByUserTags(tags = [], excludedGames = [], limit) {
        const result = await this.dataService.getByUserTags(tags, excludedGames, limit);
        // Send the response
        return result;
    }
    async getById(id) {
        const result = await this.dataService.getById(id);
        // Send the response
        return result;
    }
    async getByIds(ids) {
        const result = await this.dataService.getByIds(ids);
        // Send the response
        return result;
    }
    async getByOffers(excludedGames = []) {
        const result = await this.dataService.getByOffers(excludedGames);
        // Send the response
        return result;
    }
    async getByNewest(excludedGames = []) {
        const result = await this.dataService.getByNewest(excludedGames);
        // Send the response
        return result;
    }
    async getByTopSales(excludedGames = []) {
        const result = await this.dataService.getByTopSales(excludedGames);
        // Send the response
        return result;
    }
    async getBySpecials(excludedGames = []) {
        const result = await this.dataService.getBySpecials(excludedGames);
        // Send the response
        return result;
    }
    async getByUpcoming(excludedGames = []) {
        const result = await this.dataService.getByUpcoming(excludedGames);
        // Send the response
        return result;
    }
    async getGameReviews(gameId, filter, sort, offset, limit) {
        const result = await this.dataService.getGameReviews(gameId, filter, sort, {
            offset,
            limit
        });
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbypartialnamedescriptor.getByPartialNameDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('search/:partialName'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('partialName')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "search", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbyparametersdescriptor.getByParametersDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('search'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('sort', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'relevance',
        'name',
        'lowestPrice',
        'highestPrice',
        'releaseDate',
        'reviews',
        'totalSales'
    ], {
        optional: true
    }))),
    _ts_param(1, (0, _common.Query)('partialName')),
    _ts_param(2, (0, _common.Query)('maxPrice')),
    _ts_param(3, (0, _common.Query)('tags', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(4, (0, _common.Query)('excludeTags', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(5, (0, _common.Query)('paid', new _parsequerybooleanpipe.ParseQueryBoolPipe())),
    _ts_param(6, (0, _common.Query)('offers', new _parsequerybooleanpipe.ParseQueryBoolPipe())),
    _ts_param(7, (0, _common.Query)('platforms', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: String
    }))),
    _ts_param(8, (0, _common.Query)('publishers', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(9, (0, _common.Query)('developers', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(10, (0, _common.Query)('features', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(11, (0, _common.Query)('languages', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(12, (0, _common.Query)('featured', new _parsequerybooleanpipe.ParseQueryBoolPipe())),
    _ts_param(13, (0, _common.Query)('excludeMature', new _parsequerybooleanpipe.ParseQueryBoolPipe())),
    _ts_param(14, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(15, (0, _common.Query)('upcomingMode', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'onlyUpcoming',
        'exclude'
    ], {
        optional: true
    }))),
    _ts_param(16, (0, _common.Query)('page', new _parsequeryintegerpipe.ParseQueryIntPipe())),
    _ts_param(17, (0, _common.Query)('limit', new _parsequeryintegerpipe.ParseQueryIntPipe())),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        Array,
        Array,
        Boolean,
        Boolean,
        Array,
        Array,
        Array,
        Array,
        Array,
        Boolean,
        Boolean,
        Array,
        String,
        Number,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByParameters", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getfeatureddescriptor.getFeaturedDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('featured'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(1, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getFeatured", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbytagsdescriptor.getByTagsDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('tags'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('tags', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(1, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_param(2, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        Array,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByUserTags", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbyiddescriptor.getByIdDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getById", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbyidsdescriptor.getByIdsDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('bulk'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('ids', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByIds", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbyoffersdescriptor.getByOffersDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('offers'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByOffers", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbynewestdescriptor.getByNewestDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('newest'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByNewest", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbytopsalesdescriptor.getByTopSalesDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('top-sales'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByTopSales", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbyspecialsdescriptor.getBySpecialsDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('specials'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getBySpecials", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getbyupcomingdescriptor.getByUpcomingDescriptor),
    (0, _serializedecorator.Serialize)(_gamedto.GameDto),
    (0, _common.Get)('upcoming'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('excludedGames', new _parsequeryarraypipe.ParseQueryArrayPipe({
        items: Number
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getByUpcoming", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getgamereviewsdescriptor.getGameReviewsDescriptor),
    (0, _serializedecorator.Serialize)(_reviewdto.ReviewDto),
    (0, _common.Get)(':gameId/reviews'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('gameId', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Query)('filter', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'positive',
        'negative',
        'all'
    ]))),
    _ts_param(2, (0, _common.Query)('sort', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'newest',
        'oldest'
    ]))),
    _ts_param(3, (0, _common.Query)('offset', _common.ParseIntPipe)),
    _ts_param(4, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        String,
        String,
        Number,
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], DataController.prototype, "getGameReviews", null);
DataController = _ts_decorate([
    (0, _swagger.ApiTags)('Game Data'),
    (0, _common.Controller)('game/data'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dataservice.DataService === "undefined" ? Object : _dataservice.DataService
    ])
], DataController);

//# sourceMappingURL=data.controller.js.map