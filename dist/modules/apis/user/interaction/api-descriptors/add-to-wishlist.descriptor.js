// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addToWishlistDescriptor", {
    enumerable: true,
    get: function() {
        return addToWishlistDescriptor;
    }
});
const _addtowishlistdto = require("../dtos/add-to-wishlist.dto");
const addToWishlistDescriptor = {
    summary: 'Add Items to Wishlist',
    description: "Adds items to the user's wishlist",
    responses: [
        {
            status: 200,
            description: 'Items added to wishlist successfully'
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
        type: _addtowishlistdto.AddToWishlistDto
    }
};

//# sourceMappingURL=add-to-wishlist.descriptor.js.map