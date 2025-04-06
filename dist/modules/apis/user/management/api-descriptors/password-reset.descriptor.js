// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "passwordResetDescriptor", {
    enumerable: true,
    get: function() {
        return passwordResetDescriptor;
    }
});
const _passwordresetdto = require("../dtos/password-reset.dto");
const passwordResetDescriptor = {
    summary: 'Submit Password Reset',
    description: 'Submits a password reset request',
    responses: [
        {
            status: 200,
            description: 'Password reset request submitted successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    body: {
        type: _passwordresetdto.PasswordResetDto
    }
};

//# sourceMappingURL=password-reset.descriptor.js.map