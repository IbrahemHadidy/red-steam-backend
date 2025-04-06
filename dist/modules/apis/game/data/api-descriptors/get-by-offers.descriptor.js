// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getByOffersDescriptor", {
    enumerable: true,
    get: function() {
        return getByOffersDescriptor;
    }
});
const getByOffersDescriptor = {
    summary: 'Get Games By Offers',
    description: 'Get games by offers',
    responses: [
        {
            status: 200,
            description: 'Games returned successfully'
        },
        {
            status: 404,
            description: 'No games found'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ]
};

//# sourceMappingURL=get-by-offers.descriptor.js.map