// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLanguagesDescriptor", {
    enumerable: true,
    get: function() {
        return getLanguagesDescriptor;
    }
});
const getLanguagesDescriptor = {
    summary: 'Get Languages',
    description: 'Get languages',
    responses: [
        {
            status: 200,
            description: 'Languages returned successfully'
        },
        {
            status: 404,
            description: 'No languages found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    parameters: [
        {
            name: 'ids',
            type: String,
            required: true,
            description: 'The ids of the languages comma separated'
        }
    ]
};

//# sourceMappingURL=get-languages.descriptor.js.map