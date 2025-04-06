// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createGameDescriptor", {
    enumerable: true,
    get: function() {
        return createGameDescriptor;
    }
});
const _creategamedto = require("../dtos/create-game.dto");
const createGameDescriptor = {
    summary: 'Create Game',
    description: 'Creates a new game',
    responses: [
        {
            status: 201,
            description: 'Game created successfully'
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
        type: _creategamedto.CreateGameDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-game.descriptor.js.map