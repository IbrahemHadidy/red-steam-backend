// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "signupDescriptor", {
    enumerable: true,
    get: function() {
        return signupDescriptor;
    }
});
const _signupdto = require("../dtos/signup.dto");
const signupDescriptor = {
    summary: 'Register User',
    description: 'Validates and creates a new user',
    responses: [
        {
            status: 201,
            description: 'User created successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 409,
            description: 'User already exists'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    body: {
        type: _signupdto.SignupDto
    }
};

//# sourceMappingURL=signup.descriptor.js.map