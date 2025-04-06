// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReviewController", {
    enumerable: true,
    get: function() {
        return ReviewController;
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
const _reviewservice = require("./review.service");
const _reviewsearchquerydto = require("./dtos/review-search-query.dto");
const _paginatedreviewsdatadto = require("./serializer-dtos/paginated-reviews-data.dto");
const _deletereviewdescriptor = require("./api-descriptors/delete-review.descriptor");
const _getreviewspaginateddescriptor = require("./api-descriptors/get-reviews-paginated.descriptor");
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
let ReviewController = class ReviewController {
    constructor(reviewService){
        this.reviewService = reviewService;
    }
    async getReviewsPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.reviewService.getReviewsPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async deleteReview(id) {
        const result = await this.reviewService.deleteReview(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getreviewspaginateddescriptor.getReviewsPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedreviewsdatadto.PaginatedReviewsDataDto),
    (0, _common.Get)('paginated'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('page', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_param(2, (0, _common.Query)('orderBy', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'id',
        'username',
        'gameName',
        'content',
        'rating'
    ]))),
    _ts_param(3, (0, _common.Query)('order', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'ASC',
        'DESC'
    ]))),
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_reviewsearchquerydto.ReviewQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _reviewsearchquerydto.ReviewQueryDto === "undefined" ? Object : _reviewsearchquerydto.ReviewQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewsPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deletereviewdescriptor.deleteReviewDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id', _common.ParseIntPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number
    ]),
    _ts_metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
ReviewController = _ts_decorate([
    (0, _swagger.ApiTags)('Review'),
    (0, _common.Controller)('review'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _reviewservice.ReviewService === "undefined" ? Object : _reviewservice.ReviewService
    ])
], ReviewController);

//# sourceMappingURL=review.controller.js.map