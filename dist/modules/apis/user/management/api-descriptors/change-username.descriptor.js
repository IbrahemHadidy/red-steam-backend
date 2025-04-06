// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "changeUsernameDescriptor", {
    enumerable: true,
    get: function() {
        return changeUsernameDescriptor;
    }
});
const _changeusernamedto = require("../dtos/change-username.dto");
const changeUsernameDescriptor = {
    summary: 'Change Username',
    description: 'Changes the user username',
    responses: [
        {
            status: 201,
            description: 'Username changed successfully'
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
        type: _changeusernamedto.ChangeUsernameDto
    }
};

//# sourceMappingURL=change-username.descriptor.js.map