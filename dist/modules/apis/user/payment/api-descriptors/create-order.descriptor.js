// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createOrderDescriptor", {
    enumerable: true,
    get: function() {
        return createOrderDescriptor;
    }
});
const _createorderdto = require("../dtos/create-order.dto");
const createOrderDescriptor = {
    summary: 'Create Order',
    description: 'Creates an order',
    responses: [
        {
            status: 200,
            description: 'Order created successfully'
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
        type: _createorderdto.CreateOrderDto
    }
};

//# sourceMappingURL=create-order.descriptor.js.map