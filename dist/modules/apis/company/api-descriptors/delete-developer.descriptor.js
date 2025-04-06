// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteDeveloperDescriptor", {
    enumerable: true,
    get: function() {
        return deleteDeveloperDescriptor;
    }
});
const deleteDeveloperDescriptor = {
    summary: 'Delete Developer',
    description: 'Deletes a developer',
    responses: [
        {
            status: 200,
            description: 'Developer deleted successfully'
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
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=delete-developer.descriptor.js.map