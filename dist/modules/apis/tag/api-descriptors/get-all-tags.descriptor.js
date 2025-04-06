// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllTagsDescriptor", {
    enumerable: true,
    get: function() {
        return getAllTagsDescriptor;
    }
});
const getAllTagsDescriptor = {
    summary: 'Get All Tags',
    description: 'Get all tags',
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
    ]
};

//# sourceMappingURL=get-all-tags.descriptor.js.map