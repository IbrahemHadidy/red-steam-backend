// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeFromCartDescriptor", {
    enumerable: true,
    get: function() {
        return removeFromCartDescriptor;
    }
});
const _removefromcartdto = require("../dtos/remove-from-cart.dto");
const removeFromCartDescriptor = {
    summary: 'Remove Items from Cart',
    description: "Removes items from the user's cart",
    responses: [
        {
            status: 200,
            description: 'Items removed from cart successfully'
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
        type: _removefromcartdto.RemoveFromCartDto,
        required: false
    }
};

//# sourceMappingURL=remove-from-cart.descriptor.js.map