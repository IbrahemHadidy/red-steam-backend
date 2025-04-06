// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getWishlistDescriptor", {
    enumerable: true,
    get: function() {
        return getWishlistDescriptor;
    }
});
const getWishlistDescriptor = {
    summary: 'Get User Wishlist',
    description: "Returns the user's wishlist",
    responses: [
        {
            status: 200,
            description: 'User wishlist retrieved successfully'
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

//# sourceMappingURL=get-wishlist.descriptor.js.map