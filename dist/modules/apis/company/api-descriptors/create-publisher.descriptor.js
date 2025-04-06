// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPublisherDescriptor", {
    enumerable: true,
    get: function() {
        return createPublisherDescriptor;
    }
});
const _createpublisherdto = require("../dtos/create-publisher.dto");
const createPublisherDescriptor = {
    summary: 'Create Publisher',
    description: 'Creates a new publisher',
    responses: [
        {
            status: 201,
            description: 'Publisher created successfully'
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
        type: _createpublisherdto.CreatePublisherDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-publisher.descriptor.js.map