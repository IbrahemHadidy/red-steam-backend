// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteOfferDescriptor", {
    enumerable: true,
    get: function() {
        return deleteOfferDescriptor;
    }
});
const deleteOfferDescriptor = {
    summary: 'Delete Offer',
    description: 'Delete a offer',
    responses: [
        {
            status: 200,
            description: 'Offer deleted successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=delete-offer.descriptor.js.map