// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addToLibraryDescriptor", {
    enumerable: true,
    get: function() {
        return addToLibraryDescriptor;
    }
});
const _addtolibrarydto = require("../dtos/add-to-library.dto");
const addToLibraryDescriptor = {
    summary: 'Add Items To Library',
    description: "Adds items to the user's library",
    responses: [
        {
            status: 200,
            description: 'Items added to library successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Invalid credentials'
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
        type: _addtolibrarydto.AddToLibraryDto
    }
};

//# sourceMappingURL=add-to-library.descriptor.js.map