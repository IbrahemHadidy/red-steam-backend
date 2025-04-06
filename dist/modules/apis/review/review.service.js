// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReviewService", {
    enumerable: true,
    get: function() {
        return ReviewService;
    }
});
const _common = require("@nestjs/common");
const _reviewsservice = require("../../repositories/sql/reviews/reviews.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ReviewService = class ReviewService {
    constructor(logger, review){
        this.logger = logger;
        this.review = review;
    }
    /**
   * Get paginated reviews
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated reviews and the total number of reviews
   */ async getReviewsPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving reviews, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        // Send the paginated reviews
        return await this.review.getReviewsPaginated(page, limit, orderBy, order, searchQuery);
    }
    /**
   * Delete review
   * @param id - The ID of the review
   * @returns A message indicating the success of the delete
   */ async deleteReview(id) {
        this.logger.log(`Deleting review with ID ${id}`);
        // Delete the review
        await this.review.remove(id);
        // Send a success message
        return {
            message: 'Review deleted successfully'
        };
    }
};
ReviewService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _reviewsservice.ReviewsService === "undefined" ? Object : _reviewsservice.ReviewsService
    ])
], ReviewService);

//# sourceMappingURL=review.service.js.map