// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GamesPricingModule", {
    enumerable: true,
    get: function() {
        return GamesPricingModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _gamespricingservice = require("./games-pricing.service");
const _gamepricingentity = require("./game-pricing.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GamesPricingModule = class GamesPricingModule {
};
GamesPricingModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _gamepricingentity.GamePricing
            ], 'sql')
        ],
        providers: [
            _gamespricingservice.GamesPricingService,
            _common.Logger
        ],
        exports: [
            _typeorm.TypeOrmModule,
            _gamespricingservice.GamesPricingService
        ]
    })
], GamesPricingModule);

//# sourceMappingURL=games-pricing.module.js.map