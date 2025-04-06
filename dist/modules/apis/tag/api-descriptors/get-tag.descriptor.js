// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTagDescriptor", {
    enumerable: true,
    get: function() {
        return getTagDescriptor;
    }
});
const getTagDescriptor = {
    summary: 'Get Tag',
    description: 'Get tag',
    responses: [
        {
            status: 200,
            description: 'Tags returned successfully'
        },
        {
            status: 404,
            description: 'No tag found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    parameters: [
        {
            name: 'ids',
            type: Number,
            required: true,
            description: 'The id of the tags'
        }
    ]
};

//# sourceMappingURL=get-tag.descriptor.js.map