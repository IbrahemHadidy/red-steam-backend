// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "changeEmailDescriptor", {
    enumerable: true,
    get: function() {
        return changeEmailDescriptor;
    }
});
const _changeemaildto = require("../dtos/change-email.dto");
const changeEmailDescriptor = {
    summary: 'Change Country',
    description: 'Changes the user country',
    responses: [
        {
            status: 201,
            description: 'Email changed successfully'
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
        type: _changeemaildto.ChangeEmailDto
    }
};

//# sourceMappingURL=change-email.descriptor.js.map