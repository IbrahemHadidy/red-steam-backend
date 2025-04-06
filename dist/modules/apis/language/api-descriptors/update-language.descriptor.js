// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateLanguageDescriptor", {
    enumerable: true,
    get: function() {
        return updateLanguageDescriptor;
    }
});
const _updatelanguagedto = require("../dtos/update-language.dto");
const updateLanguageDescriptor = {
    summary: 'Update Language',
    description: 'Updates a language',
    responses: [
        {
            status: 200,
            description: 'Language updated successfully'
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
        type: _updatelanguagedto.UpdateLanguageDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-language.descriptor.js.map