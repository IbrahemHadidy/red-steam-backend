// Body DTOs
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "changeCountryDescriptor", {
    enumerable: true,
    get: function() {
        return changeCountryDescriptor;
    }
});
const _changecountrydto = require("../dtos/change-country.dto");
const changeCountryDescriptor = {
    summary: 'Change Country',
    description: 'Changes the user country',
    responses: [
        {
            status: 201,
            description: 'Country changed successfully'
        },
        {
            status: 400,
            description: 'Invalid parameters'
        },
        {
            status: 401,
            description: 'Invalid credentials'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ],
    security: [
        'accessToken'
    ],
    body: {
        type: _changecountrydto.ChangeCountryDto
    }
};

//# sourceMappingURL=change-country.descriptor.js.map