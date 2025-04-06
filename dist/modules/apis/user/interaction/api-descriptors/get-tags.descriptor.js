// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTagsDescriptor", {
    enumerable: true,
    get: function() {
        return getTagsDescriptor;
    }
});
const getTagsDescriptor = {
    summary: 'Get User Tags',
    description: "Get the tags of a user's items",
    responses: [
        {
            status: 200,
            description: 'User tags returned successfully'
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

//# sourceMappingURL=get-tags.descriptor.js.map