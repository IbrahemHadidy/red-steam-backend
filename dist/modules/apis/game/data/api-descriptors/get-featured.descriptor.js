// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFeaturedDescriptor", {
    enumerable: true,
    get: function() {
        return getFeaturedDescriptor;
    }
});
const getFeaturedDescriptor = {
    summary: 'Get Featured Games',
    description: 'Get featured games',
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
            name: 'limit',
            type: Number,
            required: false,
            description: 'The number of games to return'
        }
    ]
};

//# sourceMappingURL=get-featured.descriptor.js.map