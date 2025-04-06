// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "captureOrderDescriptor", {
    enumerable: true,
    get: function() {
        return captureOrderDescriptor;
    }
});
const _captureorderdto = require("../dtos/capture-order.dto");
const captureOrderDescriptor = {
    summary: 'Capture Order',
    description: 'Captures an order',
    responses: [
        {
            status: 200,
            description: 'Order captured successfully'
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
        type: _captureorderdto.CaptureOrderDto
    }
};

//# sourceMappingURL=capture-order.descriptor.js.map