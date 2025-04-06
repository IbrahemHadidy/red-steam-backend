// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createOfferDescriptor", {
    enumerable: true,
    get: function() {
        return createOfferDescriptor;
    }
});
const _createofferdto = require("../dtos/create-offer.dto");
const createOfferDescriptor = {
    summary: 'Create Offer',
    description: 'Creates a new offer',
    responses: [
        {
            status: 201,
            description: 'Offer created successfully'
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
        type: _createofferdto.CreateOfferDto
    },
    security: [
        'accessToken'
    ]
};

//# sourceMappingURL=create-offer.descriptor.js.map