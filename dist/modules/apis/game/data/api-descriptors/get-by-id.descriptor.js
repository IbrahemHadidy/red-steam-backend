// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getByIdDescriptor", {
    enumerable: true,
    get: function() {
        return getByIdDescriptor;
    }
});
const getByIdDescriptor = {
    summary: 'Get Game By Id',
    description: 'Returns a game by id',
    responses: [
        {
            status: 200,
            description: 'Game returned successfully'
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
            name: 'id',
            description: 'The id of the game',
            required: true,
            type: Number
        }
    ]
};

//# sourceMappingURL=get-by-id.descriptor.js.map