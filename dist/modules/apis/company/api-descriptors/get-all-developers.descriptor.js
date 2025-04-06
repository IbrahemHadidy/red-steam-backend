// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllDevelopersDescriptor", {
    enumerable: true,
    get: function() {
        return getAllDevelopersDescriptor;
    }
});
const getAllDevelopersDescriptor = {
    summary: 'Get All Developers',
    description: 'Get all developers',
    responses: [
        {
            status: 200,
            description: 'Developers returned successfully'
        },
        {
            status: 404,
            description: 'No developers found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ]
};

//# sourceMappingURL=get-all-developers.descriptor.js.map