// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "logoutDescriptor", {
    enumerable: true,
    get: function() {
        return logoutDescriptor;
    }
});
const logoutDescriptor = {
    summary: 'Logout User',
    description: 'Logs out a user',
    responses: [
        {
            status: 200,
            description: 'Logout successful'
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
        'refreshToken',
        'accessToken'
    ]
};

//# sourceMappingURL=logout.discriptor.js.map