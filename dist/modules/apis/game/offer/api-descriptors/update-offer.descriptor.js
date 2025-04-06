// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateOfferDescriptor", {
    enumerable: true,
    get: function() {
        return updateOfferDescriptor;
    }
});
const _updateofferdto = require("../dtos/update-offer.dto");
const updateOfferDescriptor = {
    summary: 'Update Offer',
    description: 'Updates a new offer',
    responses: [
        {
            status: 201,
            description: 'Offer updated successfully'
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
    body: {
        type: _updateofferdto.UpdateOfferDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=update-offer.descriptor.js.map