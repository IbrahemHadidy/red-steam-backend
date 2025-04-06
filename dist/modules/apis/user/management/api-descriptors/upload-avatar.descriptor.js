// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "uploadAvatarDescriptor", {
    enumerable: true,
    get: function() {
        return uploadAvatarDescriptor;
    }
});
const uploadAvatarDescriptor = {
    summary: 'Upload User Avatar',
    description: 'Uploads the user avatar',
    responses: [
        {
            status: 200,
            description: 'User avatar uploaded successfully'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ],
    consumes: [
        'multipart/form-data'
    ]
};

//# sourceMappingURL=upload-avatar.descriptor.js.map