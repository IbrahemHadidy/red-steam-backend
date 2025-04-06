// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "changePasswordDescriptor", {
    enumerable: true,
    get: function() {
        return changePasswordDescriptor;
    }
});
const _changepassworddto = require("../dtos/change-password.dto");
const changePasswordDescriptor = {
    summary: 'Change Password',
    description: 'Changes the user password',
    responses: [
        {
            status: 201,
            description: 'Password changed successfully'
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
        type: _changepassworddto.ChangePasswordDto
    }
};

//# sourceMappingURL=change-password.descriptor.js.map