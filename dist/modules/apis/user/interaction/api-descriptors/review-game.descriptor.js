// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reviewGameDescriptor", {
    enumerable: true,
    get: function() {
        return reviewGameDescriptor;
    }
});
const _reviewgamedto = require("../dtos/review-game.dto");
const reviewGameDescriptor = {
    summary: 'Review Game',
    description: 'Reviews a game',
    responses: [
        {
            status: 200,
            description: 'Game reviewed successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Invalid credentials'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ],
    body: {
        type: _reviewgamedto.ReviewGameDto
    }
};

//# sourceMappingURL=review-game.descriptor.js.map