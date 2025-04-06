// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkEmailExistsDescriptor", {
    enumerable: true,
    get: function() {
        return checkEmailExistsDescriptor;
    }
});
const checkEmailExistsDescriptor = {
    summary: 'Check Email Exists',
    description: 'Checks if an email exists',
    responses: [
        {
            status: 200,
            description: 'Email existence state returned successfully'
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
    parameters: [
        {
            name: 'email',
            type: String
        }
    ]
};

//# sourceMappingURL=check-email-exists.descriptor.js.map