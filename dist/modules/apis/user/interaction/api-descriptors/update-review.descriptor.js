// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateReviewDescriptor", {
    enumerable: true,
    get: function() {
        return updateReviewDescriptor;
    }
});
const _updatereviewdto = require("../dtos/update-review.dto");
const updateReviewDescriptor = {
    summary: 'Update Review',
    description: 'Updates a review',
    responses: [
        {
            status: 200,
            description: 'Review updated successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Invalid credentials'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ],
    body: {
        type: _updatereviewdto.UpdateReviewDto
    }
};

//# sourceMappingURL=update-review.descriptor.js.map