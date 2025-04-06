// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFeaturesDescriptor", {
    enumerable: true,
    get: function() {
        return getFeaturesDescriptor;
    }
});
const getFeaturesDescriptor = {
    summary: 'Get Features',
    description: 'Get features',
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
    ],
    parameters: [
        {
            name: 'ids',
            type: String,
            required: true,
            description: 'The ids of the features comma separated'
        }
    ]
};

//# sourceMappingURL=get-features.descriptor.js.map