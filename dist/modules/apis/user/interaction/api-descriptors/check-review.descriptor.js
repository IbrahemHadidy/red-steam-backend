// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkReviewDescriptor", {
    enumerable: true,
    get: function() {
        return checkReviewDescriptor;
    }
});
const checkReviewDescriptor = {
    summary: 'Check Review',
    description: 'Checks if a user has reviewed a game',
    responses: [
        {
            status: 200,
            description: 'Review found'
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

//# sourceMappingURL=check-review.descriptor.js.map