// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createLanguageDescriptor", {
    enumerable: true,
    get: function() {
        return createLanguageDescriptor;
    }
});
const _createlanguagedto = require("../dtos/create-language.dto");
const createLanguageDescriptor = {
    summary: 'Create Language',
    description: 'Creates a new language',
    responses: [
        {
            status: 201,
            description: 'Language created successfully'
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
    body: {
        type: _createlanguagedto.CreateLanguageDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-language.descriptor.js.map