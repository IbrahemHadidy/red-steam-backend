// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeFromLibraryDescriptor", {
    enumerable: true,
    get: function() {
        return removeFromLibraryDescriptor;
    }
});
const _removefromlibrarydto = require("../dtos/remove-from-library.dto");
const removeFromLibraryDescriptor = {
    summary: 'Remove Items From Library',
    description: "Removes items from the user's library",
    responses: [
        {
            status: 200,
            description: 'Items removed from library successfully'
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
        type: _removefromlibrarydto.RemoveFromLibraryDto,
        required: false
    }
};

//# sourceMappingURL=remove-from-library.descriptor.js.map