// NestJS Module
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApisModule", {
    enumerable: true,
    get: function() {
        return ApisModule;
    }
});
const _common = require("@nestjs/common");
const _companymodule = require("./company/company.module");
const _featuremodule = require("./feature/feature.module");
const _gamemodule = require("./game/game.module");
const _languagemodule = require("./language/language.module");
const _reviewmodule = require("./review/review.module");
const _tagmodule = require("./tag/tag.module");
const _usermodule = require("./user/user.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApisModule = class ApisModule {
};
ApisModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _usermodule.UserModule,
            _gamemodule.GameModule,
            _companymodule.CompanyModule,
            _featuremodule.FeatureModule,
            _tagmodule.TagModule,
            _languagemodule.LanguageModule,
            _reviewmodule.ReviewModule
        ]
    })
], ApisModule);

//# sourceMappingURL=apis.module.js.map