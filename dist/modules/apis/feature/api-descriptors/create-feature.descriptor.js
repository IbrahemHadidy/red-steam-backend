// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createFeatureDescriptor", {
    enumerable: true,
    get: function() {
        return createFeatureDescriptor;
    }
});
const _createfeaturedto = require("../dtos/create-feature.dto");
const createFeatureDescriptor = {
    summary: 'Create Feature',
    description: 'Creates a new feature',
    responses: [
        {
            status: 201,
            description: 'Feature created successfully'
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
        type: _createfeaturedto.CreateFeatureDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-feature.descriptor.js.map