// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "verificationStatusDescriptor", {
    enumerable: true,
    get: function() {
        return verificationStatusDescriptor;
    }
});
const verificationStatusDescriptor = {
    summary: 'Get Verification Status',
    description: 'Returns the verification status',
    responses: [
        {
            status: 200,
            description: 'Verification status returned successfully'
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

//# sourceMappingURL=verification-status.descriptor.js.map