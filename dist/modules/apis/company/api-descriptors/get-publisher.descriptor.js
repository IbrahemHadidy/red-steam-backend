// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPublisherDescriptor", {
    enumerable: true,
    get: function() {
        return getPublisherDescriptor;
    }
});
const getPublisherDescriptor = {
    summary: 'Get Publisher',
    description: 'Get publisher',
    responses: [
        {
            status: 200,
            description: 'Publisher returned successfully'
        },
        {
            status: 404,
            description: 'No publisher found'
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
            description: 'The id of the publisher'
        }
    ]
};

//# sourceMappingURL=get-publisher.descriptor.js.map