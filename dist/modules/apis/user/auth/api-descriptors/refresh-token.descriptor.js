// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "refreshTokenDescriptor", {
    enumerable: true,
    get: function() {
        return refreshTokenDescriptor;
    }
});
const refreshTokenDescriptor = {
    summary: 'Refresh Access Token',
    description: 'Checks if the refresh token is still valid and returns a new access token',
    responses: [
        {
            status: 201,
            description: 'Access token refreshed successfully'
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

//# sourceMappingURL=refresh-token.descriptor.js.map