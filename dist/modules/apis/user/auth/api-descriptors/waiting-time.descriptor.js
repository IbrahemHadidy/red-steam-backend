// Types
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "waitingTimeDescriptor", {
    enumerable: true,
    get: function() {
        return waitingTimeDescriptor;
    }
});
const waitingTimeDescriptor = {
    summary: 'Get Waiting Time',
    description: 'Returns the waiting time',
    responses: [
        {
            status: 200,
            description: 'Waiting time returned successfully'
        },
        {
            status: 500,
            description: 'Internal server error'
        }
    ]
};

//# sourceMappingURL=waiting-time.descriptor.js.map