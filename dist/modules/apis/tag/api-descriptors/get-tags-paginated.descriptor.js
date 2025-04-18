// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTagsPaginatedDescriptor", {
    enumerable: true,
    get: function() {
        return getTagsPaginatedDescriptor;
    }
});
const getTagsPaginatedDescriptor = {
    summary: 'Get Tags Paginated',
    description: 'Get tags paginated with optional filtering',
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
            name: 'page',
            type: Number,
            required: true,
            description: 'The page number'
        },
        {
            name: 'limit',
            type: Number,
            required: true,
            description: 'The number of items per page'
        },
        {
            name: 'orderBy',
            type: String,
            required: true,
            description: 'The order by field'
        },
        {
            name: 'order',
            type: String,
            required: true,
            description: 'The order direction'
        },
        {
            name: 'searchQuery',
            type: String,
            required: false,
            description: 'The search query'
        }
    ]
};

//# sourceMappingURL=get-tags-paginated.descriptor.js.map