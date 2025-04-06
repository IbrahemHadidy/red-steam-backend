// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOffersPaginatedDescriptor", {
    enumerable: true,
    get: function() {
        return getOffersPaginatedDescriptor;
    }
});
const getOffersPaginatedDescriptor = {
    summary: 'Get Offers Paginated',
    description: 'Get offers paginated with optional filtering',
    responses: [
        {
            status: 200,
            description: 'Offers returned successfully'
        },
        {
            status: 404,
            description: 'No offers found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    queries: [
        {
            name: 'page',
            type: Number,
            required: true,
            description: 'The page number'
        },
        {
            name: 'limit',
            type: Number,
            required: true,
            description: 'The number of items per page'
        },
        {
            name: 'orderBy',
            type: String,
            required: true,
            description: 'The order by field'
        },
        {
            name: 'order',
            type: String,
            required: true,
            description: 'The order direction'
        },
        {
            name: 'searchQuery',
            type: String,
            required: false,
            description: 'The search query'
        }
    ]
};

//# sourceMappingURL=get-offers-paginated.descriptor.js.map