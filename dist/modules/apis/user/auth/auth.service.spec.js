"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jwt = require("@nestjs/jwt");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _integrationsetup = require("../../../../../test/integration-setup");
const _tokenblacklistmodule = require("../../../repositories/mongo/token-blacklist/token-blacklist.module");
const _gamestagsmodule = require("../../../repositories/sql/games-tags/games-tags.module");
const _reviewsmodule = require("../../../repositories/sql/reviews/reviews.module");
const _usersmodule = require("../../../repositories/sql/users/users.module");
const _nodemailermodule = require("../../../services/node-mailer/node-mailer.module");
const _authservice = require("./auth.service");
const _tokenblacklistservice = require("../../../repositories/mongo/token-blacklist/token-blacklist.service");
const _companiesservice = require("../../../repositories/sql/companies/companies.service");
const _gamesfeaturesservice = require("../../../repositories/sql/games-features/games-features.service");
const _gameslanguagesservice = require("../../../repositories/sql/games-languages/games-languages.service");
const _gamespricingservice = require("../../../repositories/sql/games-pricing/games-pricing.service");
const _gamesservice = require("../../../repositories/sql/games/games.service");
const _reviewsservice = require("../../../repositories/sql/reviews/reviews.service");
const _usersservice = require("../../../repositories/sql/users/users.service");
const _nodemailerservice = require("../../../services/node-mailer/node-mailer.service");
describe('AuthController', ()=>{
    let data;
    let authService;
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
                _jwt.JwtService,
                _usersservice.UsersService,
                _nodemailerservice.NodeMailerService,
                _config.ConfigService,
                _gamesservice.GamesService,
                _gamesfeaturesservice.GamesFeaturesService,
                _gameslanguagesservice.GamesLanguagesService,
                _gamespricingservice.GamesPricingService,
                _companiesservice.CompaniesService,
                _tokenblacklistservice.TokenBlacklistService,
                _reviewsservice.ReviewsService,
                _common.Logger
            ]
        }).compile();
        usersService = module.get(_usersservice.UsersService);
        tokenBlacklistService = module.get(_tokenblacklistservice.TokenBlacklistService);
        authService = module.get(_authservice.AuthService);
        // Register a user and login to get data sample for testing
        await authService.signup({
            username: 'test',
            email: 'test@test.com',
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
    describe('signup', ()=>{
        it('should create a new user and send verification email', async ()=>{
            // Call signup function
            const result = await authService.signup({
                username: 'test1',
                email: 'test1@test.com',
                password: 'password1',
                country: 'test1'
            });
            // Assert
            expect(result).toEqual({
                message: 'Signup successful'
            });
        });
    });
    describe('login', ()=>{
        it('should login a user successfully', async ()=>{
            // Call the login method
            const result = await authService.login({
                identifier: 'test',
                password: 'password',
                rememberMe: true
            });
            // Assertions
            expect(result).toEqual(expect.objectContaining({
                userData: expect.objectContaining({
                    country: 'test',
                    email: 'test@test.com',
                    username: 'test'
                })
            }));
        });
    });
    describe('autoLogin', ()=>{
        it('should auto login successfully with valid token', async ()=>{
            // Call the autoLogin method
            const result = await authService.autoLogin({
                userId: data.userData.id
            });
            expect(result).toEqual({
                message: 'Auto login successful',
                userData: expect.objectContaining({
                    country: 'test',
                    email: 'test@test.com',
                    username: 'test'
                }),
                accessToken: expect.stringMatching(/^Bearer .+$/)
            });
        });
    });
    describe('logout', ()=>{
        it('should logout successfully', async ()=>{
            // Call the logout method
            const result = await authService.logout({
                userId: data.userData.id,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            // Assertions
            expect(result).toEqual({
                message: 'Logout successful'
            });
        });
    });
    describe('refreshToken', ()=>{
        it('should refresh access token successfully', async ()=>{
            // Call the refreshToken method
            const result = await authService.refreshToken({
                userId: data.userData.id
            });
            // Assert
            expect(result).toEqual({
                message: 'Refresh token successful',
                accessToken: expect.stringMatching(/^Bearer .+$/)
            });
        });
    });
    describe('getUserData', ()=>{
        it('should get user data successfully', async ()=>{
            // Call the getUserData method
            const result = await authService.getUserData({
                userId: data.userData.id
            });
            // Assertions
            expect(result).toEqual({
                userData: expect.objectContaining({
                    country: 'test',
                    email: 'test@test.com',
                    username: 'test'
                })
            });
        });
    });
    describe('getVerificationStatus', ()=>{
        it('should get verification status successfully', async ()=>{
            // Define the identifier
            data.userData.identifier = data.userData.email || data.userData.username;
            // Call the getVerificationStatus method
            const result = await authService.getVerificationStatus(data.userData);
            // Assertions
            expect(result).toEqual({
                verified: true
            });
        });
    });
    describe('resendVerificationToken', ()=>{
        it('should resend verification token successfully', async ()=>{
            // Call the resendVerificationToken method
            const result = await authService.resendVerificationToken(data.userData);
            // Fast-forward the timers
            jest.useFakeTimers();
            jest.runAllTimers();
            jest.useRealTimers();
            // Assertions
            expect(result).toEqual({
                message: 'Verification email sent'
            });
        });
        it('should throw BadRequestException if user is already verified', async ()=>{
            // Call the resendVerificationToken method and expect it to throw BadRequestException
            await expect(authService.resendVerificationToken(data.userData)).rejects.toThrow(_common.BadRequestException);
        });
    });
    describe('verifyEmail', ()=>{
        it('should verify email successfully', async ()=>{
            // construct verify data
            const verifyData = {
                username: data.userData.username,
                email: data.userData.email,
                token: data.userData.verificationToken
            };
            // Call the verifyEmail method
            const result = await authService.verifyEmail(verifyData);
            // Assertions
            expect(result).toEqual({
                message: 'Email verified successfully'
            });
        });
        it('should throw BadRequestException if verification token is invalid', async ()=>{
            // construct verify data with fake verification token
            const verifyData = {
                username: data.userData.username,
                email: data.userData.email,
                token: 'invalid-token'
            };
            // Call the verifyEmail method and expect it to throw BadRequestException
            await expect(authService.verifyEmail(verifyData)).rejects.toThrow(_common.BadRequestException);
        });
    });
    describe('updateTokens', ()=>{
        it('should update tokens successfully', async ()=>{
            // Call the updateTokens method
            const result = await authService.updateTokens({
                userId: data.userData.id,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            // Assertions
            expect(result).toEqual({
                accessToken: expect.stringMatching(/^Bearer .+$/),
                refreshToken: expect.stringMatching(/^Bearer .+$/)
            });
        });
    });
    describe('getWaitingTime', ()=>{
        it('should return waiting time in milliseconds', ()=>{
            // Call the method
            const result = authService.getWaitingTime();
            // Assert
            expect(result).toEqual({
                waitingTime: 20 * 60 * 1000
            });
        });
    });
});

//# sourceMappingURL=auth.service.spec.js.map