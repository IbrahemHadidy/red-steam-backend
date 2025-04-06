// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompanyModule", {
    enumerable: true,
    get: function() {
        return CompanyModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistmodule = require("../../repositories/mongo/token-blacklist/token-blacklist.module");
const _companiesmodule = require("../../repositories/sql/companies/companies.module");
const _usersmodule = require("../../repositories/sql/users/users.module");
const _companyservice = require("./company.service");
const _companiesservice = require("../../repositories/sql/companies/companies.service");
const _developercontroller = require("./developer.controller");
const _publishercontroller = require("./publisher.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CompanyModule = class CompanyModule {
};
CompanyModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _companiesmodule.CompaniesModule,
            _usersmodule.UsersModule,
            _tokenblacklistmodule.TokenBlacklistModule,
            _jwt.JwtModule
        ],
        providers: [
            _companyservice.CompanyService,
            _companiesservice.CompaniesService,
            _common.Logger
        ],
        controllers: [
            _developercontroller.DeveloperController,
            _publishercontroller.PublisherController
        ],
        exports: [
            _companyservice.CompanyService
        ]
    })
], CompanyModule);

//# sourceMappingURL=company.module.js.map