// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getByNewestDescriptor", {
    enumerable: true,
    get: function() {
        return getByNewestDescriptor;
    }
});
const getByNewestDescriptor = {
    summary: 'Get Games By Newest',
    description: 'Get games by newest',
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
    ]
};

//# sourceMappingURL=get-by-newest.descriptor.js.map