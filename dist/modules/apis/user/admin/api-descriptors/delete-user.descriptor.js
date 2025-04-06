// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteUserDescriptor", {
    enumerable: true,
    get: function() {
        return deleteUserDescriptor;
    }
});
const deleteUserDescriptor = {
    summary: 'Delete User',
    description: 'Deletes a user',
    responses: [
        {
            status: 200,
            description: 'User deleted successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Unauthorized'
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

//# sourceMappingURL=delete-user.descriptor.js.map