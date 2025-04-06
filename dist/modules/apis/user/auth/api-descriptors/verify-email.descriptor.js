// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "verifyEmailDescriptor", {
    enumerable: true,
    get: function() {
        return verifyEmailDescriptor;
    }
});
const _verifyemaildto = require("../dtos/verify-email.dto");
const verifyEmailDescriptor = {
    summary: 'Verify Email',
    description: 'Verifies email',
    responses: [
        {
            status: 200,
            description: 'Email verified successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Invalid verification token'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    body: {
        type: _verifyemaildto.VerifyEmailDto
    }
};

//# sourceMappingURL=verify-email.descriptor.js.map