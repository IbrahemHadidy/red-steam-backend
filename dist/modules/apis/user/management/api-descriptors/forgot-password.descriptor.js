// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "forgotPasswordDescriptor", {
    enumerable: true,
    get: function() {
        return forgotPasswordDescriptor;
    }
});
const _forgotpassworddto = require("../dtos/forgot-password.dto");
const forgotPasswordDescriptor = {
    summary: 'Forgot Password',
    description: 'Sends an email to reset the password',
    responses: [
        {
            status: 200,
            description: 'Email sent successfully'
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
        type: _forgotpassworddto.ForgotPasswordDto
    }
};

//# sourceMappingURL=forgot-password.descriptor.js.map