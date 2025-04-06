// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllPublishersDescriptor", {
    enumerable: true,
    get: function() {
        return getAllPublishersDescriptor;
    }
});
const getAllPublishersDescriptor = {
    summary: 'Get All Publishers',
    description: 'Get all publishers',
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
    ]
};

//# sourceMappingURL=get-all-publishers.descriptor.js.map