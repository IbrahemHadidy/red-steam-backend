// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminController", {
    enumerable: true,
    get: function() {
        return AdminController;
    }
});
const _common = require("@nestjs/common");
const _serializedecorator = require("../../../../common/decorators/serialize.decorator");
const _apidescriptordecorator = require("../../../../common/decorators/api-descriptor.decorator");
const _swagger = require("@nestjs/swagger");
const _parsejsonpipe = require("../../../../common/pipes/parse-json.pipe");
const _uniontypevalidationpipe = require("../../../../common/pipes/union-type-validation.pipe");
const _adminguard = require("../../../../common/guards/admin.guard");
const _jwtaccessauthguard = require("../../../../common/guards/jwt-access-auth.guard");
const _adminservice = require("./admin.service");
const _updateuserdto = require("./dtos/update-user.dto");
const _usersearchquerydto = require("./dtos/user-search-query.dto");
const _paginatedusersdatadto = require("../serializer-dtos/paginated-users-data.dto");
const _deleteuserdescriptor = require("./api-descriptors/delete-user.descriptor");
const _getuserspaginateddescriptor = require("./api-descriptors/get-users-paginated.descriptor");
const _updateuserdescriptor = require("./api-descriptors/update-user.descriptor");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AdminController = class AdminController {
    constructor(admin){
        this.admin = admin;
    }
    async getUsersPaginated(page, limit, orderBy, order, searchQuery = {}) {
        const result = await this.admin.getUsersPaginated(page, limit, orderBy, order, searchQuery);
        // Send the response
        return result;
    }
    async updateTag(id, body) {
        const result = await this.admin.updateUser(id, body);
        // Send the response
        return result;
    }
    async deleteUser(id) {
        const result = await this.admin.deleteUser(id);
        // Send the response
        return result;
    }
};
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_getuserspaginateddescriptor.getUsersPaginatedDescriptor),
    (0, _serializedecorator.Serialize)(_paginatedusersdatadto.PaginatedUsersDataDto),
    (0, _common.Get)('paginated'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Query)('page', _common.ParseIntPipe)),
    _ts_param(1, (0, _common.Query)('limit', _common.ParseIntPipe)),
    _ts_param(2, (0, _common.Query)('orderBy', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'username',
        'email',
        'country',
        'isVerified',
        'isAdmin',
        'createdAt'
    ]))),
    _ts_param(3, (0, _common.Query)('order', new _uniontypevalidationpipe.UnionTypeValidationPipe([
        'ASC',
        'DESC'
    ]))),
    _ts_param(4, (0, _common.Query)('searchQuery', new _parsejsonpipe.ParseJsonPipe(_usersearchquerydto.UserQueryDto, {
        optional: true,
        validate: true
    }))),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Number,
        Number,
        String,
        String,
        typeof _usersearchquerydto.UserQueryDto === "undefined" ? Object : _usersearchquerydto.UserQueryDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "getUsersPaginated", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_updateuserdescriptor.updateUserDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Put)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateuserdto.UpdateUserDto === "undefined" ? Object : _updateuserdto.UpdateUserDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "updateTag", null);
_ts_decorate([
    (0, _apidescriptordecorator.ApiDescriptor)(_deleteuserdescriptor.deleteUserDescriptor),
    (0, _common.UseGuards)(_jwtaccessauthguard.JwtAccessAuthGuard, _adminguard.AdminGuard),
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(200),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
AdminController = _ts_decorate([
    (0, _swagger.ApiTags)('User Admin'),
    (0, _common.Controller)('user/admin'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _adminservice.AdminService === "undefined" ? Object : _adminservice.AdminService
    ])
], AdminController);

//# sourceMappingURL=admin.controller.js.map