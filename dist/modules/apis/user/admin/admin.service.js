// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminService", {
    enumerable: true,
    get: function() {
        return AdminService;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("../../../repositories/sql/users/users.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminService = class AdminService {
    constructor(user, logger){
        this.user = user;
        this.logger = logger;
    }
    /**
   * Get paginated users
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated users and the total number of users
   */ async getUsersPaginated(page, limit, orderBy, order, searchQuery) {
        this.logger.log(`Retrieving users, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`);
        // Send the response
        return await this.user.getUsersPaginated(page, limit, orderBy, order, searchQuery);
    }
    /**
   * Update user
   * @param id - The ID of the user
   * @param data - The new data for the user
   * @returns The updated user
   */ async updateUser(id, data) {
        const { isAdmin, isVerified } = data;
        this.logger.log(`Updating user with ID ${id}`);
        await this.user.update(id, {
            isAdmin,
            isVerified
        });
        return {
            message: 'user updated successfully'
        };
    }
    /**
   * Delete user
   * @param id - The ID of the user
   * @returns A message indicating the success of the delete
   */ async deleteUser(id) {
        this.logger.log(`Deleting user with ID ${id}`);
        // Delete the user
        await this.user.remove(id);
        // Send success message
        return {
            message: 'User deleted successfully'
        };
    }
};
AdminService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], AdminService);

//# sourceMappingURL=admin.service.js.map