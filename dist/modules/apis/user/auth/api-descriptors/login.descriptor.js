// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loginDescriptor", {
    enumerable: true,
    get: function() {
        return loginDescriptor;
    }
});
const _logindto = require("../dtos/login.dto");
const loginDescriptor = {
    summary: 'Login User',
    description: 'Validates user credentials and returns user data with access token and refresh token',
    responses: [
        {
            status: 201,
            description: 'User logged in successfully'
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
    body: {
        type: _logindto.LoginDto
    }
};

//# sourceMappingURL=login.descriptor.js.map