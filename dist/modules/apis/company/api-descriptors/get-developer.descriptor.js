// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDeveloperDescriptor", {
    enumerable: true,
    get: function() {
        return getDeveloperDescriptor;
    }
});
const getDeveloperDescriptor = {
    summary: 'Get All Developer',
    description: 'Get all developer',
    responses: [
        {
            status: 200,
            description: 'Developer returned successfully'
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
            name: 'id',
            type: Number,
            required: true,
            description: 'The ids of the developer'
        }
    ]
};

//# sourceMappingURL=get-developer.descriptor.js.map