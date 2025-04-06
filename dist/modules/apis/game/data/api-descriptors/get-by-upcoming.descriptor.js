// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getByUpcomingDescriptor", {
    enumerable: true,
    get: function() {
        return getByUpcomingDescriptor;
    }
});
const getByUpcomingDescriptor = {
    summary: 'Get Games By Upcoming',
    description: 'Get games by upcoming',
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

//# sourceMappingURL=get-by-upcoming.descriptor.js.map