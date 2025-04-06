// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLanguageDescriptor", {
    enumerable: true,
    get: function() {
        return getLanguageDescriptor;
    }
});
const getLanguageDescriptor = {
    summary: 'Get Language',
    description: 'Get language',
    responses: [
        {
            status: 200,
            description: 'Language returned successfully'
        },
        {
            status: 404,
            description: 'No language found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    parameters: [
        {
            name: 'id',
            type: Number,
            required: true,
            description: 'The id of the language'
        }
    ]
};

//# sourceMappingURL=get-language.descriptor.js.map