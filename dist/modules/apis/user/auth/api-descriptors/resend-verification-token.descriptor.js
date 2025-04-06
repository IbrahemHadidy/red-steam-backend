// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resendVerificationTokenDescriptor", {
    enumerable: true,
    get: function() {
        return resendVerificationTokenDescriptor;
    }
});
const resendVerificationTokenDescriptor = {
    summary: 'Resend Verification Token',
    description: 'Resends verification token',
    responses: [
        {
            status: 200,
            description: 'Verification token sent successfully'
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

//# sourceMappingURL=resend-verification-token.descriptor.js.map