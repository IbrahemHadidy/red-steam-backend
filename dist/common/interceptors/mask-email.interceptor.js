// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    MaskEmailInterceptor: function() {
        return MaskEmailInterceptor;
    },
    maskEmail: function() {
        return maskEmail;
    }
});
const _common = require("@nestjs/common");
const _operators = require("rxjs/operators");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MaskEmailInterceptor = class MaskEmailInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, _operators.map)((data)=>this.maskEmailsRecursive(data)));
    }
    maskEmailsRecursive(data) {
        if (Array.isArray(data)) {
            // If data is an array, recursively mask emails in each item
            return data.map((item)=>this.maskEmailsRecursive(item));
        } else if (typeof data === 'object' && data !== null) {
            // If data is an object, recursively mask emails in the object
            for(const key in data){
                if (data.hasOwnProperty(key)) {
                    data[key] = this.maskEmailsRecursive(data[key]);
                }
            }
        } else if (typeof data === 'string') {
            // If data is a string, check if it is an email and mask it
            return this.isEmail(data) ? maskEmail(data) : data;
        }
        return data;
    }
    isEmail(value) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
};
MaskEmailInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], MaskEmailInterceptor);
const maskEmail = (email)=>{
    // Split the email address into local part and domain part
    const [localPart, domainPart] = email.split('@');
    // Mask all characters except the first two in the local part
    const hiddenLocalPart = localPart.substring(0, 2) + localPart.substring(2).replace(/./g, '*');
    // Construct the masked email address
    const maskedEmail = hiddenLocalPart + '@' + domainPart;
    return maskedEmail;
};

//# sourceMappingURL=mask-email.interceptor.js.map