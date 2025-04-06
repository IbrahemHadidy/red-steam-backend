// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "autoLoginDescriptor", {
    enumerable: true,
    get: function() {
        return autoLoginDescriptor;
    }
});
const autoLoginDescriptor = {
    summary: 'Auto Login',
    description: 'Checks if the refresh token is still valid and returns the user data with new access token',
    responses: [
        {
            status: 201,
            description: 'User logged in successfully'
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
        'refreshToken'
    ]
};

//# sourceMappingURL=auto-login.descriptor.js.map