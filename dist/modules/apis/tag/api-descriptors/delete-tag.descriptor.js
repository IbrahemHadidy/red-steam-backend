// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteTagDescriptor", {
    enumerable: true,
    get: function() {
        return deleteTagDescriptor;
    }
});
const deleteTagDescriptor = {
    summary: 'Delete Tag',
    description: 'Deletes a tag',
    responses: [
        {
            status: 200,
            description: 'Tag deleted successfully'
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

//# sourceMappingURL=delete-tag.descriptor.js.map