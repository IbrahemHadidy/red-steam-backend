// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NodeMailerModule", {
    enumerable: true,
    get: function() {
        return NodeMailerModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _mailer = require("@nestjs-modules/mailer");
const _nodemailerservice = require("./node-mailer.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let NodeMailerModule = class NodeMailerModule {
};
NodeMailerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _mailer.MailerModule.forRootAsync({
                imports: [
                    _config.ConfigModule
                ],
                inject: [
                    _config.ConfigService
                ],
                useFactory: (configService)=>({
                        transport: {
                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            secure: configService.get('NODE_ENV') === 'production',
                            auth: {
                                user: configService.get('SMTP_USER'),
                                pass: configService.get('SMTP_PASSWORD')
                            }
                        }
                    })
            })
        ],
        providers: [
            _nodemailerservice.NodeMailerService,
            _common.Logger,
            _config.ConfigService
        ],
        exports: [
            _nodemailerservice.NodeMailerService
        ]
    })
], NodeMailerModule);

//# sourceMappingURL=node-mailer.module.js.map