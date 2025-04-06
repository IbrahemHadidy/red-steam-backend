// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateUserDescriptor", {
    enumerable: true,
    get: function() {
        return updateUserDescriptor;
    }
});
const _updateuserdto = require("../dtos/update-user.dto");
const updateUserDescriptor = {
    summary: 'Update User',
    description: 'Updates a user',
    responses: [
        {
            status: 200,
            description: 'User updated successfully'
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
        type: _updateuserdto.UpdateUserDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-user.descriptor.js.map