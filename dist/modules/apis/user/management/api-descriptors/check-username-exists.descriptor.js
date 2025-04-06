// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkUsernameExistsDescriptor", {
    enumerable: true,
    get: function() {
        return checkUsernameExistsDescriptor;
    }
});
const checkUsernameExistsDescriptor = {
    summary: 'Check if username exists',
    description: 'Checks if the username already exists',
    responses: [
        {
            status: 200,
            description: 'Username existence state returned successfully'
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
            name: 'username',
            type: String
        }
    ]
};

//# sourceMappingURL=check-username-exists.descriptor.js.map