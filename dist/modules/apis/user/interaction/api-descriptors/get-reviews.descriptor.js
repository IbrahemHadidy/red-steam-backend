// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getReviewsDescriptor", {
    enumerable: true,
    get: function() {
        return getReviewsDescriptor;
    }
});
const getReviewsDescriptor = {
    summary: 'Get User Reviews',
    description: "Returns the user's reviews",
    responses: [
        {
            status: 200,
            description: 'User reviews retrieved successfully'
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
    ]
};

//# sourceMappingURL=get-reviews.descriptor.js.map