// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createTagDescriptor", {
    enumerable: true,
    get: function() {
        return createTagDescriptor;
    }
});
const _createtagdto = require("../dtos/create-tag.dto");
const createTagDescriptor = {
    summary: 'Create Tag',
    description: 'Creates a new tag',
    responses: [
        {
            status: 201,
            description: 'Tag created successfully'
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
        type: _createtagdto.CreateTagDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-tag.descriptor.js.map