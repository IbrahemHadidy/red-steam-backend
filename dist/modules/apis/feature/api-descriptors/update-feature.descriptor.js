// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateFeatureDescriptor", {
    enumerable: true,
    get: function() {
        return updateFeatureDescriptor;
    }
});
const _updatefeaturedto = require("../dtos/update-feature.dto");
const updateFeatureDescriptor = {
    summary: 'Update Feature',
    description: 'Updates a feature',
    responses: [
        {
            status: 200,
            description: 'Feature updated successfully'
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
        type: _updatefeaturedto.UpdateFeatureDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-feature.descriptor.js.map