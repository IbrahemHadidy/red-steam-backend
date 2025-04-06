// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminGuard", {
    enumerable: true,
    get: function() {
        return AdminGuard;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("../../modules/repositories/sql/users/users.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminGuard = class AdminGuard {
    constructor(usersService){
        this.usersService = usersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const userId = request['userId'];
        // Verify if user exists
        if (!userId) throw new _common.BadRequestException('User ID is missing');
        // Check if user exists
        const user = await this.usersService.getById(userId);
        if (!user) throw new _common.NotFoundException('User not found');
        // Check if user is verified
        if (!user.isAdmin) throw new _common.UnauthorizedException('User is not an admin');
        return true;
    }
};
AdminGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], AdminGuard);

//# sourceMappingURL=admin.guard.js.map