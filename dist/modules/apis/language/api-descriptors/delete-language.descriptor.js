// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteLanguageDescriptor", {
    enumerable: true,
    get: function() {
        return deleteLanguageDescriptor;
    }
});
const deleteLanguageDescriptor = {
    summary: 'Delete Language',
    description: 'Deletes a language',
    responses: [
        {
            status: 200,
            description: 'Language deleted successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Unauthorized'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=delete-language.descriptor.js.map