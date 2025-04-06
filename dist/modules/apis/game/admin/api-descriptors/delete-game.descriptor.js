// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteGameDescriptor", {
    enumerable: true,
    get: function() {
        return deleteGameDescriptor;
    }
});
const deleteGameDescriptor = {
    summary: 'Delete Game',
    description: 'Delete a game',
    responses: [
        {
            status: 200,
            description: 'Game deleted successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=delete-game.descriptor.js.map