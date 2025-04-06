// NodeJS crypto
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserService", {
    enumerable: true,
    get: function() {
        return UserService;
    }
});
const _crypto = require("crypto");
const _common = require("@nestjs/common");
const _usersservice = require("../../repositories/sql/users/users.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UserService = class UserService {
    constructor(user, logger){
        this.user = user;
        this.logger = logger;
    }
    /**
   * Hashes a password using the Scrypt algorithm
   * @param password The password to hash
   * @returns The hashed password
   */ async hashPassword(password) {
        this.logger.log('Hashing password');
        // Generate a random salt
        const salt = (0, _crypto.randomBytes)(8).toString('hex');
        // Hash the password
        const hashBuffer = (0, _crypto.scryptSync)(password, salt, 64);
        // Create the hashed password
        const hashedPassword = `${salt}:${hashBuffer.toString('hex')}`;
        // Return the hashed password
        this.logger.log('Password hashed successfully');
        return hashedPassword;
    }
    /**
   * Compares a plain text password with a hashed password
   * @param plainPassword The plain text password
   * @param hashedPassword The hashed password
   * @returns True if the passwords match, false otherwise
   * @throws `UnauthorizedException` if the passwords don't match
   */ async comparePassword(plainPassword, hashedPassword) {
        this.logger.log('Comparing passwords');
        // Extract the salt from the hashed password
        const [salt, storedHash] = hashedPassword.split(':');
        // Hash the plain text password
        const hashBuffer = (0, _crypto.scryptSync)(plainPassword, salt, 64);
        // Create the hashed password
        const hash = hashBuffer.toString('hex');
        // Compare the hashes and throw an unauthorized exception if they don't match
        if (storedHash !== hash) {
            this.logger.warn('Password comparison failed');
            throw new _common.UnauthorizedException('Invalid password');
        }
        // Return true if the passwords match
        this.logger.log('Password comparison successful');
        return true;
    }
    /**
   * Finds a user by email, username, id or identifier
   * @param key The identifier of the user
   * @param {'username' | 'email' | 'id' | 'identifier'} type The type of the identifier;
   * @returns The created user data
   */ async findUser(key, type, reviews = false) {
        this.logger.log(`findUser called with ${type}: ${key}`);
        let user;
        switch(type){
            case 'email':
                user = await this.user.getByEmail(key, reviews);
                break;
            case 'username':
                user = await this.user.getByUsername(key, reviews);
                break;
            case 'id':
                user = await this.user.getById(key, reviews);
                break;
            case 'identifier':
                user = await this.user.getByEmailOrUsername(key, reviews);
                break;
        }
        if (!user) {
            // Throw a not found exception if the user does not exist
            this.logger.error(`Could not find a user with ${type}: ${key}`);
            throw new _common.NotFoundException('User not found');
        }
        // Return the user if it exists
        this.logger.log(`User found with ${type}: ${key}`);
        return user;
    }
    /**
   * Check if user is verified
   * @param user The user object
   * @throws `UnauthorizedException` If user is not verified
   */ async checkVerified(user) {
        if (!user.isVerified) {
            // Throw an unauthorized exception if the user is not verified
            this.logger.error(`User is not verified`);
            throw new _common.UnauthorizedException('User is not verified');
        }
    }
};
UserService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger
    ])
], UserService);

//# sourceMappingURL=user.service.js.map