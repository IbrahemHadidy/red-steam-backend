// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDevelopersDescriptor", {
    enumerable: true,
    get: function() {
        return getDevelopersDescriptor;
    }
});
const getDevelopersDescriptor = {
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
    ],
    parameters: [
        {
            name: 'ids',
            type: String,
            required: true,
            description: 'The ids of the developers comma separated'
        }
    ]
};

//# sourceMappingURL=get-developers.descriptor.js.map