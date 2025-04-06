// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getByPartialNameDescriptor", {
    enumerable: true,
    get: function() {
        return getByPartialNameDescriptor;
    }
});
const getByPartialNameDescriptor = {
    summary: 'Get Games By Partial Name',
    description: 'Returns an array of games by partial name',
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
    parameters: [
        {
            name: 'partialName',
            type: String,
            description: 'The partial name of the games to retrieve'
        }
    ]
};

//# sourceMappingURL=get-by-partial-name.descriptor.js.map