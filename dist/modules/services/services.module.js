// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ServicesModule", {
    enumerable: true,
    get: function() {
        return ServicesModule;
    }
});
const _common = require("@nestjs/common");
const _databasemodule = require("./database/database.module");
const _dropboxmodule = require("./dropbox/dropbox.module");
const _nodemailermodule = require("./node-mailer/node-mailer.module");
const _paypalmodule = require("./paypal/paypal.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ServicesModule = class ServicesModule {
};
ServicesModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _nodemailermodule.NodeMailerModule,
            _dropboxmodule.DropboxModule,
            _paypalmodule.PaypalModule
        ]
    })
], ServicesModule);

//# sourceMappingURL=services.module.js.map