// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeFromWishlistDescriptor", {
    enumerable: true,
    get: function() {
        return removeFromWishlistDescriptor;
    }
});
const _removefromwishlistdto = require("../dtos/remove-from-wishlist.dto");
const removeFromWishlistDescriptor = {
    summary: 'Remove Items from Wishlist',
    description: "Removes items from the user's wishlist",
    responses: [
        {
            status: 200,
            description: 'Items removed from wishlist successfully'
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
        type: _removefromwishlistdto.RemoveFromWishlistDto,
        required: false
    }
};

//# sourceMappingURL=remove-from-wishlist.descriptor.js.map