// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addToCartDescriptor", {
    enumerable: true,
    get: function() {
        return addToCartDescriptor;
    }
});
const _addtocartdto = require("../dtos/add-to-cart.dto");
const addToCartDescriptor = {
    summary: 'Add Items to Cart',
    description: "Adds items to the user's cart",
    responses: [
        {
            status: 200,
            description: 'Items added to cart successfully'
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
        type: _addtocartdto.AddToCartDto
    }
};

//# sourceMappingURL=add-to-cart.descriptor.js.map