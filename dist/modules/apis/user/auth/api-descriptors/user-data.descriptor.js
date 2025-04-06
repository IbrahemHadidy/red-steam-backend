// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userDataDescriptor", {
    enumerable: true,
    get: function() {
        return userDataDescriptor;
    }
});
const userDataDescriptor = {
    summary: 'Get User Data',
    description: 'Returns the user data',
    responses: [
        {
            status: 200,
            description: 'User data returned successfully'
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

//# sourceMappingURL=user-data.descriptor.js.map