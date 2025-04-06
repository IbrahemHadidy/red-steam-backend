// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeveloperDescriptor", {
    enumerable: true,
    get: function() {
        return createDeveloperDescriptor;
    }
});
const _createdeveloperdto = require("../dtos/create-developer.dto");
const createDeveloperDescriptor = {
    summary: 'Create Developer',
    description: 'Creates a new developer',
    responses: [
        {
            status: 201,
            description: 'Developer created successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Unauthorized'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    body: {
        type: _createdeveloperdto.CreateDeveloperDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-developer.descriptor.js.map