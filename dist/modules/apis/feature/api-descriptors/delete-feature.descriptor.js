// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteFeatureDescriptor", {
    enumerable: true,
    get: function() {
        return deleteFeatureDescriptor;
    }
});
const deleteFeatureDescriptor = {
    summary: 'Delete Feature',
    description: 'Deletes a feature',
    responses: [
        {
            status: 200,
            description: 'Feature deleted successfully'
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

//# sourceMappingURL=delete-feature.descriptor.js.map