// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updatePublisherDescriptor", {
    enumerable: true,
    get: function() {
        return updatePublisherDescriptor;
    }
});
const _updatepublisherdto = require("../dtos/update-publisher.dto");
const updatePublisherDescriptor = {
    summary: 'Update Publisher',
    description: 'Updates a publisher',
    responses: [
        {
            status: 200,
            description: 'Publisher updated successfully'
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
        type: _updatepublisherdto.UpdatePublisherDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-publisher.descriptor.js.map