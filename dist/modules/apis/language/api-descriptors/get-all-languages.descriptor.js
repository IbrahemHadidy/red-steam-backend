// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllLanguagesDescriptor", {
    enumerable: true,
    get: function() {
        return getAllLanguagesDescriptor;
    }
});
const getAllLanguagesDescriptor = {
    summary: 'Get All Languages',
    description: 'Get all languages',
    responses: [
        {
            status: 200,
            description: 'languages returned successfully'
        },
        {
            status: 404,
            description: 'No languages found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ]
};

//# sourceMappingURL=get-all-languages.descriptor.js.map