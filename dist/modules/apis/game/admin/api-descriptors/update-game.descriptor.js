// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateGameDescriptor", {
    enumerable: true,
    get: function() {
        return updateGameDescriptor;
    }
});
const _updategamedto = require("../dtos/update-game.dto");
const updateGameDescriptor = {
    summary: 'Update Game',
    description: 'Updates a new game',
    responses: [
        {
            status: 200,
            description: 'Game updated successfully'
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
    body: {
        type: _updategamedto.UpdateGameDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-game.descriptor.js.map