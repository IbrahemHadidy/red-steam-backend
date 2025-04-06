// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getByTagsDescriptor", {
    enumerable: true,
    get: function() {
        return getByTagsDescriptor;
    }
});
const getByTagsDescriptor = {
    summary: 'Get Games By Tags',
    description: 'Get games by tags',
    responses: [
        {
            status: 200,
            description: 'Games returned successfully'
        },
        {
            status: 404,
            description: 'No games found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    queries: [
        {
            name: 'tags',
            type: String,
            required: false,
            description: 'Tags of the games comma separated'
        },
        {
            name: 'limit',
            type: Number,
            required: false,
            description: 'The number of games to return'
        }
    ]
};

//# sourceMappingURL=get-by-tags.descriptor.js.map