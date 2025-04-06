// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "changeTagsDescriptor", {
    enumerable: true,
    get: function() {
        return changeTagsDescriptor;
    }
});
const _changetagsdto = require("../dtos/change-tags.dto");
const changeTagsDescriptor = {
    summary: 'Change User Tags',
    description: 'Changes the user tags',
    responses: [
        {
            status: 200,
            description: 'User tags changed successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Invalid credentials'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ],
    body: {
        type: _changetagsdto.ChangeTagsDto
    }
};

//# sourceMappingURL=change-tags.descriptor.js.map