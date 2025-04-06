// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBySpecialsDescriptor", {
    enumerable: true,
    get: function() {
        return getBySpecialsDescriptor;
    }
});
const getBySpecialsDescriptor = {
    summary: 'Get Games By Top Sales',
    description: 'Get games by top sales',
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

//# sourceMappingURL=get-by-specials.descriptor.js.map