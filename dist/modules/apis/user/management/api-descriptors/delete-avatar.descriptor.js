// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteAvatarDescriptor", {
    enumerable: true,
    get: function() {
        return deleteAvatarDescriptor;
    }
});
const deleteAvatarDescriptor = {
    summary: 'Delete User Avatar',
    description: 'Deletes the user avatar',
    responses: [
        {
            status: 200,
            description: 'User avatar deleted successfully'
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

//# sourceMappingURL=delete-avatar.descriptor.js.map