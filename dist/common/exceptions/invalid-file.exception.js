// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvalidFileException", {
    enumerable: true,
    get: function() {
        return InvalidFileException;
    }
});
const _common = require("@nestjs/common");
let InvalidFileException = class InvalidFileException extends _common.HttpException {
    constructor(message){
        super(message, _common.HttpStatus.BAD_REQUEST);
    }
};

//# sourceMappingURL=invalid-file.exception.js.map