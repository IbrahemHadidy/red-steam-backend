// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateTagDescriptor", {
    enumerable: true,
    get: function() {
        return updateTagDescriptor;
    }
});
const _updatetagdto = require("../dtos/update-tag.dto");
const updateTagDescriptor = {
    summary: 'Update Tag',
    description: 'Updates a Tag',
    responses: [
        {
            status: 200,
            description: 'Tag updated successfully'
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
        type: _updatetagdto.UpdateTagDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-tag.descriptor.js.map