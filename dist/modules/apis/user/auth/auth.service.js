// NestJS
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _crypto = require("crypto");
const _jwt = require("@nestjs/jwt");
const _tokenblacklistservice = require("../../../repositories/mongo/token-blacklist/token-blacklist.service");
const _nodemailerservice = require("../../../services/node-mailer/node-mailer.service");
const _userservice = require("../user.service");
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
let AuthService = class AuthService {
    constructor(jwt, userTools, user, mailer, logger, tokenBlacklist, config){
        this.jwt = jwt;
        this.userTools = userTools;
        this.user = user;
        this.mailer = mailer;
        this.logger = logger;
        this.tokenBlacklist = tokenBlacklist;
        this.config = config;
        this.accessTokenSecret = this.config.get('JWT_ACCESS_TOKEN_SECRET');
        this.refreshTokenSecret = this.config.get('JWT_REFRESH_TOKEN_SECRET');
    }
    /**
   * Signs up a new user
   * @param data An object containing username, email, password, and country
   * @returns The created user data
   */ async signup(data) {
        const { username, email, password, country } = data;
        this.logger.log(`Signing up user ${email}`);
        // Hash password
        const hashedPassword = await this.userTools.hashPassword(password);
        // Create user
        const user = await this.user.create({
            email,
            username,
            country,
            password: hashedPassword
        });
        // Create verification token
        const verificationToken = await this.createVerificationToken();
        // Send verification email
        await this.mailer.sendVerificationEmail(user.email, user.username, verificationToken);
        // Update user verification token in database
        await this.user.updateVerificationToken(user.id, verificationToken);
        // Send successful signup response
        this.logger.log(`Signed up user with email ${email} and username ${username} successfully`);
        return {
            message: 'Signup successful'
        };
    }
    /**
   * Logs in a user
   * @param data An object containing identifier, password, and rememberMe
   * @returns Message, user data, access and refresh tokens if login is successful
   * @throws `InternalServerErrorException` if login fails
   */ async login(data) {
        const { identifier, password, rememberMe } = data;
        this.logger.log(`Logging in user with username/email: ${identifier}, rememberMe: ${rememberMe}`);
        // Find the user by email or username
        const user = await this.userTools.findUser(identifier, 'identifier');
        // Compare password hashes
        await this.userTools.comparePassword(password, user.password);
        // Create and sign JWT tokens
        const accessToken = await this.createJwtToken(user, '1d', 'access');
        const refreshToken = await this.createJwtToken(user, '30d', 'refresh');
        // SignIn User in database
        await this.user.setLoginStatus(user.id, true);
        // Send successful login response with tokens
        this.logger.log(`Logged in user with username/email: ${identifier}`);
        return {
            message: 'Login successful',
            loggingIn: true,
            accessToken,
            refreshToken,
            isSessionLoggedIn: rememberMe ? false : true,
            userData: user
        };
    }
    /**
   * Auto logs in a user when reopening the browser
   * @param headers The request headers, containing the refresh token
   * @returns Success message, user data and access token if login is successful
   * @throws `InternalServerErrorException` if user is not logged out
   */ async autoLogin(data) {
        const { userId } = data;
        this.logger.log(`Auto logging in user with id: ${userId}`);
        // Get user data
        const user = await this.userTools.findUser(userId, 'id');
        // SignIn User in database
        await this.user.setLoginStatus(user.id, true);
        // Create and sign new access token
        const newAccessToken = await this.createJwtToken(user, '1h', 'access');
        // Send successful auto login response
        this.logger.log(`Auto logged in user with id: ${userId}`);
        return {
            message: 'Auto login successful',
            userData: user,
            accessToken: newAccessToken
        };
    }
    /**
   * Logs out a user
   * @param headers The request headers, containing the access token
   * @returns Message if logout is successful
   */ async logout(data) {
        const { userId, accessToken, refreshToken } = data;
        this.logger.log(`Logging out user with id: ${userId}`);
        // set user to logged out
        await this.user.setLoginStatus(userId, false);
        // Blacklist access and refresh tokens
        await this.tokenBlacklist.blacklistToken(accessToken);
        await this.tokenBlacklist.blacklistToken(refreshToken);
        // Return success message
        this.logger.log(`Logged out user with id: ${userId}`);
        return {
            message: 'Logout successful'
        };
    }
    /**
   * Refreshes an access token
   * @param headers The request headers, containing the refresh token
   * @returns Message and new access token if refresh is successful
   * @throws `InternalServerErrorException` if user is not logged in
   */ async refreshToken(data) {
        const { userId } = data;
        this.logger.log(`Refreshing access token for user with id: ${userId}`);
        // Get user data
        const user = await this.userTools.findUser(userId, 'id');
        // If user is not loggedin in database, throw an exception
        if (!user.isLoggedIn) throw new _common.InternalServerErrorException('Failed to login user');
        // Create and sign new access
        const newAccessToken = await this.createJwtToken(user, '1h', 'access');
        // Return success message and new access token
        this.logger.log(`Refreshed access token for user with id: ${userId}`);
        return {
            message: 'Refresh token successful',
            accessToken: newAccessToken
        };
    }
    /**
   * Gets user data
   * @param headers The request headers, containing the access token
   * @returns User data
   */ async getUserData(data) {
        const { userId } = data;
        this.logger.log(`Getting user data for user with id: ${userId}`);
        // Get user data
        const userData = await this.userTools.findUser(userId, 'id');
        // Return user data
        this.logger.log(`Got user data for user with id: ${userId}`);
        return {
            userData
        };
    }
    /**
   * Gets verification status
   * @param data An object containing the email
   * @returns Verification status
   */ async getVerificationStatus(data) {
        const { email } = data;
        this.logger.log(`Getting verification status for user with email: ${email}`);
        // Check and get user
        const user = await this.userTools.findUser(email, 'email');
        // return verification status
        this.logger.log(`Got verification status for user with email: ${email}`);
        return {
            verified: user.isVerified
        };
    }
    /**
   * Resends verification token
   * @param data An object containing the email
   * @returns Success message
   */ async resendVerificationToken(data) {
        const { email } = data;
        this.logger.log(`Resending verification token for user with email: ${email}`);
        // Check and get user
        const user = await this.userTools.findUser(email, 'email');
        // Check if user is already verified
        if (user.isVerified) {
            this.logger.log(`User with email: ${email} is already verified`);
            throw new _common.BadRequestException('User is already verified');
        }
        // generate verification token
        const verificationToken = await this.createVerificationToken();
        // Send verification email
        await this.mailer.sendVerificationEmail(user.email, user.username, verificationToken);
        // update user verification token in database
        await this.user.updateVerificationToken(user.id, verificationToken);
        // Block the verification token after 20 minutes
        setTimeout(async ()=>{
            await this.user.updateVerificationToken(user.id, null);
        }, 20 * 60 * 1000);
        // Return success message
        this.logger.log(`Resent verification token for user with email: ${email}`);
        return {
            message: 'Verification email sent'
        };
    }
    /**
   * Verifies email
   * @param data email and verification token
   * @returns success message if verification is successful
   * @throws `BadRequestException` if verification token is invalid
   */ async verifyEmail(data) {
        const { username, token } = data;
        this.logger.log(`Verifying email for user with username: ${username}`);
        // Check and get user
        const user = await this.userTools.findUser(username, 'username');
        // Verify token and throw an exception if invalid
        if (user.verificationToken !== token) {
            this.logger.log(`Invalid verification token for user with username: ${username}`);
            throw new _common.BadRequestException('Invalid verification token');
        }
        // Verify user in database
        await this.user.verify(user.id);
        // Return success message
        this.logger.log(`Verified email for user with username: ${username}`);
        return {
            message: 'Email verified successfully'
        };
    }
    /**
   * Update access and refresh token
   * @param data access token and refresh token
   * @returns new access token and refresh token
   */ async updateTokens(data) {
        const { userId, accessToken, refreshToken } = data;
        this.logger.log(`Updating access and refresh token`);
        // Check and get user
        const user = await this.userTools.findUser(userId, 'id');
        // Blacklist access and refresh tokens
        await this.tokenBlacklist.blacklistToken(accessToken);
        await this.tokenBlacklist.blacklistToken(refreshToken);
        // Create and sign new access and refresh token
        const newAccessToken = await this.createJwtToken(user, '1h', 'access');
        const newRefreshToken = await this.createJwtToken(user, '30d', 'refresh');
        // Return access and refresh token
        this.logger.log(`Updated access and refresh token`);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        };
    }
    /**
   * Gets waiting time for email verification
   * @returns Waiting time in milliseconds
   */ getWaitingTime() {
        this.logger.log(`Getting waiting time for email verification`);
        const waitingTime = 20 * 60 * 1000;
        this.logger.log(`Got waiting time for email verification`);
        return {
            waitingTime
        };
    }
    /**
   * Creates a new access/refresh token
   * @param user The user to create the access/refresh token for
   * @param expiry The token expiry
   * @param type The type of token to create
   * @returns The prefixed access token
   */ async createJwtToken(user, expiry, type) {
        this.logger.log(`Creating ${type} token for user ${user.id}`);
        // Create payload
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            admin: user.isAdmin,
            verified: user.isVerified
        };
        // Create jwt token
        const jwtToken = await this.jwt.signAsync(payload, {
            expiresIn: expiry,
            secret: type === 'access' ? this.accessTokenSecret : this.refreshTokenSecret
        });
        // Prefix jwt token
        const prefixedJwtToken = `Bearer ${jwtToken}`;
        // Return prefixed jwt token
        this.logger.log(`Created ${type} token for user ${user.id}`);
        return prefixedJwtToken;
    }
    /**
   * Creates a new verification token
   * @returns The verification token
   */ async createVerificationToken() {
        this.logger.log('Creating verification token');
        // Generate verification token
        const verificationToken = (0, _crypto.randomUUID)();
        // Send verification email
        this.logger.log('Created verification token');
        return verificationToken;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _nodemailerservice.NodeMailerService === "undefined" ? Object : _nodemailerservice.NodeMailerService,
        typeof _common.Logger === "undefined" ? Object : _common.Logger,
        typeof _tokenblacklistservice.TokenBlacklistService === "undefined" ? Object : _tokenblacklistservice.TokenBlacklistService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map