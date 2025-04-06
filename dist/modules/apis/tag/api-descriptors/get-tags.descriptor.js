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
    summary: 'Get Tags',
    description: 'Get tags',
    responses: [
        {
            status: 200,
            description: 'Tags returned successfully'
        },
        {
            status: 404,
            description: 'No tags found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    parameters: [
        {
            name: 'ids',
            type: String,
            required: true,
            description: 'The ids of the tags comma separated'
        }
    ]
};

//# sourceMappingURL=get-tags.descriptor.js.map