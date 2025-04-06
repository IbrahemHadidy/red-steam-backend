// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateTokensDescriptor", {
    enumerable: true,
    get: function() {
        return updateTokensDescriptor;
    }
});
const updateTokensDescriptor = {
    summary: 'Update Tokens',
    description: 'Updates the access and refresh tokens',
    responses: [
        {
            status: 200,
            description: 'Tokens updated successfully'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'refreshToken',
        'accessToken'
    ]
};

//# sourceMappingURL=update-tokens.descriptor.js.map