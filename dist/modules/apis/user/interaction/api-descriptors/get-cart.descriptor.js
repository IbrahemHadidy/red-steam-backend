// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCartDescriptor", {
    enumerable: true,
    get: function() {
        return getCartDescriptor;
    }
});
const getCartDescriptor = {
    summary: 'Get User Cart',
    description: "Returns the user's cart",
    responses: [
        {
            status: 200,
            description: 'User cart retrieved successfully'
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

//# sourceMappingURL=get-cart.descriptor.js.map