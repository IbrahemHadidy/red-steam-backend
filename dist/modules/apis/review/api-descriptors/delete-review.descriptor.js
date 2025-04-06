// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteReviewDescriptor", {
    enumerable: true,
    get: function() {
        return deleteReviewDescriptor;
    }
});
const deleteReviewDescriptor = {
    summary: 'Delete Review',
    description: 'Deletes a review',
    responses: [
        {
            status: 200,
            description: 'Review deleted successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Unauthorized'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=delete-review.descriptor.js.map