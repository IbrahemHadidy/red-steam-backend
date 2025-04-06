// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteAccountDescriptor", {
    enumerable: true,
    get: function() {
        return deleteAccountDescriptor;
    }
});
const _deleteaccountdto = require("../dtos/delete-account.dto");
const deleteAccountDescriptor = {
    summary: 'Delete Account',
    description: 'Deletes the account',
    responses: [
        {
            status: 200,
            description: 'Account deleted successfully'
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
        type: _deleteaccountdto.DeleteAccountDto
    }
};

//# sourceMappingURL=delete-account.descriptor.js.map