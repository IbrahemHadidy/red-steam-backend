// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFeatureDescriptor", {
    enumerable: true,
    get: function() {
        return getFeatureDescriptor;
    }
});
const getFeatureDescriptor = {
    summary: 'Get Feature',
    description: 'Get feature',
    responses: [
        {
            status: 200,
            description: 'Feature returned successfully'
        },
        {
            status: 404,
            description: 'No feature found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    parameters: [
        {
            name: 'id',
            type: Number,
            required: true,
            description: 'The id of the feature'
        }
    ]
};

//# sourceMappingURL=get-feature.descriptor.js.map