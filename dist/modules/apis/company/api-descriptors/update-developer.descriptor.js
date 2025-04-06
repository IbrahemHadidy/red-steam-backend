// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateDeveloperDescriptor", {
    enumerable: true,
    get: function() {
        return updateDeveloperDescriptor;
    }
});
const _updatedeveloperdto = require("../dtos/update-developer.dto");
const updateDeveloperDescriptor = {
    summary: 'Update Developer',
    description: 'Updates a developer',
    responses: [
        {
            status: 200,
            description: 'Developer updated successfully'
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
        type: _updatedeveloperdto.UpdateDeveloperDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-developer.descriptor.js.map