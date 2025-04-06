// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllFeaturesDescriptor", {
    enumerable: true,
    get: function() {
        return getAllFeaturesDescriptor;
    }
});
const getAllFeaturesDescriptor = {
    summary: 'Get All Features',
    description: 'Get all features',
    responses: [
        {
            status: 200,
            description: 'Features returned successfully'
        },
        {
            status: 404,
            description: 'No features found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ]
};

//# sourceMappingURL=get-all-features.descriptor.js.map