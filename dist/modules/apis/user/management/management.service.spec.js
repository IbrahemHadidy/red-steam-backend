"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _testing = require("@nestjs/testing");
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _jwt = require("@nestjs/jwt");
const _usersservice = require("../../../repositories/sql/users/users.service");
const _config = require("@nestjs/config");
const _managementservice = require("./management.service");
const _tokenblacklistservice = require("../../../repositories/mongo/token-blacklist/token-blacklist.service");
const _nodemailerservice = require("../../../services/node-mailer/node-mailer.service");
const _dropboxservice = require("../../../services/dropbox/dropbox.service");
const _authservice = require("../auth/auth.service");
const _tokenblacklistmodule = require("../../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamestagsmodule = require("../../../repositories/sql/games-tags/games-tags.module");
const _reviewsmodule = require("../../../repositories/sql/reviews/reviews.module");
const _usersmodule = require("../../../repositories/sql/users/users.module");
const _nodemailermodule = require("../../../services/node-mailer/node-mailer.module");
const _integrationsetup = require("../../../../../test/integration-setup");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('ManagementService', ()=>{
    let data;
    let authService;
    let managementService;
    let usersService;
    let tokenBlacklistService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _config.ConfigModule.forRoot(_integrationsetup.environmentConfig),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    name: 'sql',
                    useFactory: async (configService)=>(0, _integrationsetup.getSqlTypeOrmConfig)(configService)
                }),
                _typeorm.TypeOrmModule.forRootAsync({
                    inject: [
                        _config.ConfigService
                    ],
                    useFactory: async (configService)=>(0, _integrationsetup.getMongoTypeOrmConfig)(configService)
                }),
                _usersmodule.UsersModule,
                _gamestagsmodule.GamesTagsModule,
                _nodemailermodule.NodeMailerModule,
                _tokenblacklistmodule.TokenBlacklistModule,
                _reviewsmodule.ReviewsModule
            ],
            providers: [
                _authservice.AuthService,
                _managementservice.ManagementService,
                _jwt.JwtService,
                _usersservice.UsersService,
                _nodemailerservice.NodeMailerService,
                _config.ConfigService,
                _tokenblacklistservice.TokenBlacklistService,
                _dropboxservice.DropboxService,
                _common.Logger
            ]
        }).compile();
        usersService = module.get(_usersservice.UsersService);
        tokenBlacklistService = module.get(_tokenblacklistservice.TokenBlacklistService);
        managementService = module.get(_managementservice.ManagementService);
        authService = module.get(_authservice.AuthService);
        // register a user and login to get data sample for testing
        await authService.signup({
            username: 'test',
            email: 'testuser3@me.com',
            password: 'password',
            country: 'test'
        });
        data = await authService.login({
            identifier: 'test',
            password: 'password',
            rememberMe: true
        });
    });
    afterEach(async ()=>{
        await usersService.removeAll();
        await tokenBlacklistService.clearAll();
    });
    describe('checkEmailExists', ()=>{
        it('should return true if email exists', async ()=>{
            // Call the checkEmailExists method
            const result = await managementService.checkEmailExists({
                email: data.userData.email
            });
            // Assert
            expect(result).toEqual({
                exists: true,
                message: 'Email already exists'
            });
        });
        it('should return false if email does not exist', async ()=>{
            // Call the checkEmailExists method
            const result = await managementService.checkEmailExists({
                email: 'non-existing-email'
            });
            // Assert
            expect(result).toEqual({
                exists: false,
                message: 'Email available'
            });
        });
    });
    describe('checkUsernameExists', ()=>{
        it('should return true if username exists', async ()=>{
            // Call the checkUsernameExists method
            const result = await managementService.checkUsernameExists({
                username: data.userData.username
            });
            // Assert
            expect(result).toEqual({
                exists: true,
                message: 'Username already exists'
            });
        });
        it('should return false if username does not exist', async ()=>{
            // Call the checkUsernameExists method
            const result = await managementService.checkUsernameExists({
                username: 'non-existing-username'
            });
            // Assert
            expect(result).toEqual({
                exists: false,
                message: 'Username available'
            });
        });
    });
    describe('changeUsername', ()=>{
        it('should change username successfully and return true', async ()=>{
            // Call the changeUsername method
            const result = await managementService.changeUsername({
                userId: data.userData.id,
                password: 'password',
                newUsername: 'new-username'
            });
            // Assert
            expect(result).toEqual({
                message: 'Username changed successfully'
            });
        });
        it('should throw a bad request error if new username is the same as the old one', async ()=>{
            // Call the changeUsername method with username that already exists
            await expect(managementService.changeUsername({
                userId: data.userData.id,
                password: 'password',
                newUsername: data.userData.username
            })).rejects.toThrow(_common.BadRequestException);
        });
        it('should throw an conflict error if new username already exists', async ()=>{
            // Create a new user with username 'new-username'
            await authService.signup({
                username: 'new-username',
                email: 'new-email@test.com',
                password: 'password',
                country: 'TS'
            });
            // Call the changeUsername method with username 'new-username' that already exists
            await expect(managementService.changeUsername({
                userId: data.userData.id,
                password: 'password',
                newUsername: 'new-username'
            })).rejects.toThrow(_common.ConflictException);
        });
    });
    describe('changeEmail', ()=>{
        it('should change email successfully', async ()=>{
            // Call the changeEmail method
            const result = await managementService.changeEmail({
                userId: data.userData.id,
                password: 'password',
                currentEmail: data.userData.email,
                newEmail: 'new-email@test.com'
            });
            // Assert
            expect(result).toEqual({
                message: 'Email changed successfully'
            });
        });
        it('should throw a bad request error if new email is the same as the old one', async ()=>{
            // Call the changeEmail method
            await expect(managementService.changeEmail({
                userId: data.userData.id,
                password: 'password',
                currentEmail: data.userData.email,
                newEmail: data.userData.email
            })).rejects.toThrow(_common.BadRequestException);
        });
        it('should throw an conflict error if new email already exists', async ()=>{
            // Create a new user with email 'new-email@test.com'
            await authService.signup({
                username: 'new-username',
                email: 'new-email@test.com',
                password: 'password',
                country: 'TS'
            });
            // Call the changeEmail method with email 'new-email@test.com' that already exists
            await expect(managementService.changeEmail({
                userId: data.userData.id,
                password: 'password',
                currentEmail: data.userData.email,
                newEmail: 'new-email@test.com'
            })).rejects.toThrow(_common.ConflictException);
        });
        it('should throw an unauthorized if current email is incorrect', async ()=>{
            // Call the changeEmail method
            await expect(managementService.changeEmail({
                userId: data.userData.id,
                password: 'password',
                currentEmail: 'wrong-email@test.com',
                newEmail: 'new-email@test.com'
            })).rejects.toThrow(_common.UnauthorizedException);
        });
    });
    describe('changeCountry', ()=>{
        it('should change country successfully', async ()=>{
            // Call the changeCountry method
            const result = await managementService.changeCountry({
                userId: data.userData.id,
                newCountry: 'TS'
            });
            // Assert
            expect(result).toEqual({
                message: 'Country changed successfully'
            });
        });
        it('should throw bad request if new country is the same as the old one', async ()=>{
            // Call the changeCountry method
            await expect(managementService.changeCountry({
                userId: data.userData.id,
                newCountry: data.userData.country
            })).rejects.toThrow(_common.BadRequestException);
        });
    });
    describe('uploadAvatar', ()=>{
        it('should upload avatar successfully', async ()=>{
            const filePath = _path.default.resolve(__dirname, 'test.png');
            const fileContent = Buffer.from([
                1,
                2,
                3
            ]);
            // Create a test file
            if (!_fs.default.existsSync(filePath)) {
                _fs.default.writeFileSync(filePath, fileContent);
            }
            const file = {
                fieldname: 'avatar',
                originalname: 'avatar.png',
                encoding: '7bit',
                mimetype: 'image/png',
                size: fileContent.length,
                buffer: fileContent,
                path: filePath
            };
            // Call the uploadAvatar method
            const result = await managementService.uploadAvatar({
                avatar: file,
                userId: data.userData.id
            });
            // Assert
            expect(result).toEqual({
                message: 'Avatar uploaded successfully'
            });
            // Delete the test file
            _fs.default.unlinkSync(filePath);
        });
    });
    describe('deleteAvatar', ()=>{
        it('should delete avatar successfully', async ()=>{
            const filePath = _path.default.resolve(__dirname, 'test.png');
            const fileContent = Buffer.from([
                1,
                2,
                3
            ]);
            // Create a test file
            if (!_fs.default.existsSync(filePath)) {
                _fs.default.writeFileSync(filePath, fileContent);
            }
            const file = {
                fieldname: 'avatar',
                originalname: 'avatar.png',
                encoding: '7bit',
                mimetype: 'image/png',
                size: fileContent.length,
                buffer: fileContent,
                path: filePath
            };
            // Call the uploadAvatar method
            await managementService.uploadAvatar({
                avatar: file,
                userId: data.userData.id
            });
            // Call the deleteAvatar method
            const result = await managementService.deleteAvatar({
                userId: data.userData.id
            });
            // Assert
            expect(result).toEqual({
                message: 'Avatar deleted successfully'
            });
        });
    });
    describe('changePassword', ()=>{
        it('should change password successfully', async ()=>{
            // Call the changePassword method
            const result = await managementService.changePassword({
                userId: data.userData.id,
                oldPassword: 'password',
                newPassword: 'new-password'
            });
            // Assert
            expect(result).toEqual({
                message: 'Password changed successfully'
            });
        });
        it('should throw bad request if new password is the same as the old one', async ()=>{
            // Call the changePassword method
            await expect(managementService.changePassword({
                userId: data.userData.id,
                oldPassword: 'password',
                newPassword: 'password'
            })).rejects.toThrow(_common.BadRequestException);
        });
    });
    describe('forgotPassword', ()=>{
        it('should forgot password successfully', async ()=>{
            // Call the forgotPassword method
            const result = await managementService.forgotPassword({
                email: data.userData.email
            });
            // Assert
            expect(result).toEqual({
                message: 'Reset email sent successfully'
            });
        });
    });
    describe('passwordReset', ()=>{
        it('should return true if password is changed', async ()=>{
            // Call the forgotPassword method
            await managementService.forgotPassword({
                email: data.userData.email
            });
            // Call the passwordReset method to reset the password with the captured token
            const result = await managementService.passwordReset({
                token: 'test-reset-token',
                newPassword: 'new-password'
            });
            // Assert
            expect(result).toEqual({
                message: 'Password reset successful'
            });
        });
    });
    describe('deleteAccount', ()=>{
        it('should delete account successfully', async ()=>{
            // Call the deleteAccount method
            const result = await managementService.deleteAccount({
                userId: data.userData.id,
                password: 'password'
            });
            // Assert
            expect(result).toEqual({
                message: 'Account deleted successfully'
            });
        });
    });
});

//# sourceMappingURL=management.service.spec.js.map