// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deletePublisherDescriptor", {
    enumerable: true,
    get: function() {
        return deletePublisherDescriptor;
    }
});
const deletePublisherDescriptor = {
    summary: 'Delete Publisher',
    description: 'Deletes a publisher',
    responses: [
        {
            status: 200,
            description: 'Publisher deleted successfully'
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

//# sourceMappingURL=delete-publisher.descriptor.js.map