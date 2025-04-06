// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPublishersDescriptor", {
    enumerable: true,
    get: function() {
        return getPublishersDescriptor;
    }
});
const getPublishersDescriptor = {
    summary: 'Get Publishers',
    description: 'Get publishers',
    responses: [
        {
            status: 200,
            description: 'Publishers returned successfully'
        },
        {
            status: 404,
            description: 'No publishers found'
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
            description: 'The ids of the publishers comma separated'
        }
    ]
};

//# sourceMappingURL=get-publishers.descriptor.js.map