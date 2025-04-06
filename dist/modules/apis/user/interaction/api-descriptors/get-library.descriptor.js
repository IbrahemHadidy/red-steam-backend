// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLibraryDescriptor", {
    enumerable: true,
    get: function() {
        return getLibraryDescriptor;
    }
});
const getLibraryDescriptor = {
    summary: 'Get User Library',
    description: "Returns the user's library",
    responses: [
        {
            status: 200,
            description: 'User library retrieved successfully'
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

//# sourceMappingURL=get-library.descriptor.js.map