import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as UUIDv4 } from 'uuid';
import { UserService } from '@apis/user/user.service';
import { User } from '@repositories/sql/users/user.entity';
import { UsersService } from '@repositories/sql/users/users.service';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';

@Injectable()
export class AuthService extends UserService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(
    protected readonly jwt: JwtService,
    protected readonly user: UsersService,
    protected readonly mailer: NodeMailerService,
    protected readonly logger: Logger,
    private readonly tokenBlacklist: TokenBlacklistService,
    private readonly config: ConfigService,
  ) {
    super(user);
    this.accessTokenSecret = this.config.get('JWT_ACCESS_TOKEN_SECRET');
    this.refreshTokenSecret = this.config.get('JWT_REFRESH_TOKEN_SECRET');
  }

  /**
   * Creates a new access/refresh token
   * @param user The user to create the access/refresh token for
   * @param expiry The token expiry
   * @param type The type of token to create
   * @returns The prefixed access token
   */
  private async createJwtToken(user: User, expiry: string, type: 'access' | 'refresh') {
    this.logger.log(`Creating ${type} token for user ${user.id}`);

    // Create payload
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      admin: user.isAdmin,
      verified: user.isVerified,
    };

    // Create jwt token
    const jwtToken = await this.jwt.signAsync(payload, {
      expiresIn: expiry,
      secret: type === 'access' ? this.accessTokenSecret : this.refreshTokenSecret,
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
   */
  private async createVerificationToken() {
    this.logger.log('Creating verification token');
    // Generate verification token
    const verificationToken = UUIDv4();

    // Send verification email
    this.logger.log('Created verification token');
    return verificationToken;
  }

  /**
   * Signs up a new user
   * @param data An object containing username, email, password, and country
   * @returns The created user data
   */
  public async signup(data: { username: string; email: string; password: string; country: string }) {
    const { username, email, password, country } = data;

    this.logger.log(`Signing up user ${email}`);

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const user = await this.user.create({
      email,
      username,
      country,
      password: hashedPassword,
    });

    // Create verification token
    const verificationToken = await this.createVerificationToken();

    // Send verification email
    await this.mailer.sendVerificationEmail(user.email, user.username, verificationToken);

    // Update user verification token in database
    await this.user.updateVerificationToken(user.id, verificationToken);

    // Send successful signup response
    this.logger.log(`Signed up user with email ${email} and username ${username} successfully`);
    return { message: 'Signup successful' };
  }

  /**
   * Logs in a user
   * @param data An object containing identifier, password, and rememberMe
   * @returns Message, user data, access and refresh tokens if login is successful
   * @throws InternalServerErrorException if login fails
   */
  public async login(data: { identifier: string; password: string; rememberMe: boolean }) {
    const { identifier, password, rememberMe } = data;

    this.logger.log(`Logging in user with username/email: ${identifier}`);

    // Find the user by email or username
    const user = await this.findUser(identifier, 'identifier');

    // Compare password hashes
    await this.comparePassword(password, user.password);

    // Create and sign JWT tokens
    const accessToken = await this.createJwtToken(user, '1d', 'access');
    const refreshToken = await this.createJwtToken(user, rememberMe ? '30d' : '1h', 'refresh');

    // SignIn User in database
    await this.user.setLoginStatus(user.id, true);

    // Send successful login response with tokens
    this.logger.log(`Logged in user with username/email: ${identifier}`);
    return {
      message: 'Login successful',
      accessToken,
      refreshToken,
      userData: user,
    };
  }

  /**
   * Auto logs in a user when reopening the browser
   * @param headers The request headers, containing the refresh token
   * @returns Message, user data and access token if login is successful
   * @throws InternalServerErrorException if user is not logged out
   */
  public async autoLogin(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Auto logging in user with id: ${userId}`);

    // Get user data
    const user = await this.findUser(userId, 'id');

    // SignIn User in database
    await this.user.setLoginStatus(user.id, true);

    // Create and sign new access token
    const newAccessToken = await this.createJwtToken(user, '1h', 'access');

    // Send successful auto login response
    this.logger.log(`Auto logged in user with id: ${userId}`);
    return { message: 'Auto login successful', userData: user, accessToken: newAccessToken };
  }

  /**
   * Logs out a user
   * @param headers The request headers, containing the access token
   * @returns Message if logout is successful
   */
  public async logout(data: { userId: string; accessToken: string; refreshToken: string }) {
    const { userId, accessToken, refreshToken } = data;

    this.logger.log(`Logging out user with id: ${userId}`);

    // set user to logged out
    await this.user.setLoginStatus(userId, false);

    // Blacklist access and refresh tokens
    await this.tokenBlacklist.blacklistToken(accessToken);
    await this.tokenBlacklist.blacklistToken(refreshToken);

    // Return success message
    this.logger.log(`Logged out user with id: ${userId}`);
    return { message: 'Logout successful' };
  }

  /**
   * Refreshes an access token
   * @param headers The request headers, containing the refresh token
   * @returns Message and new access token if refresh is successful
   * @throws InternalServerErrorException if user is not logged in
   */
  public async refreshToken(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Refreshing access token for user with id: ${userId}`);

    // Get user data
    const user = await this.findUser(userId, 'id');

    // If user is not loggedin in database, throw an exception
    if (!user.isLoggedIn) throw new InternalServerErrorException('Failed to login user');

    // Create and sign new access
    const newAccessToken = await this.createJwtToken(user, '1h', 'access');

    // Return success message and new access token
    this.logger.log(`Refreshed access token for user with id: ${userId}`);
    return { message: 'Refresh token successful', accessToken: newAccessToken };
  }

  /**
   * Gets user data
   * @param headers The request headers, containing the access token
   * @returns User data
   */
  public async getUserData(data: { userId: string }) {
    const { userId } = data;

    this.logger.log(`Getting user data for user with id: ${userId}`);

    // Get user data
    const userData = await this.findUser(userId, 'id');

    // Return user data
    this.logger.log(`Got user data for user with id: ${userId}`);
    return { userData };
  }

  /**
   * Gets verification status
   * @param data An object containing the identifier
   * @returns Verification status
   */
  public async getVerificationStatus(data: { identifier: string }) {
    const { identifier } = data;

    this.logger.log(`Getting verification status for user with identifier: ${identifier}`);

    // Check and get user
    const user = await this.findUser(identifier, 'identifier');

    // return verification status
    this.logger.log(`Got verification status for user with identifier: ${identifier}`);
    return { verified: user.isVerified };
  }

  /**
   * Resends verification token
   * @param data An object containing the email
   * @returns Message
   */
  public async resendVerificationToken(data: { email: string }) {
    const { email } = data;

    this.logger.log(`Resending verification token for user with email: ${email}`);

    // Check and get user
    const user = await this.findUser(email, 'email');

    // Check if user is already verified
    if (user.isVerified) {
      this.logger.log(`User with email: ${email} is already verified`);
      throw new BadRequestException('User is already verified');
    }

    // generate verification token
    const verificationToken = await this.createVerificationToken();

    // Send verification email
    await this.mailer.sendVerificationEmail(user.email, user.username, verificationToken);

    // update user verification token in database
    await this.user.updateVerificationToken(user.id, verificationToken);

    // Block the verification token after 20 minutes
    setTimeout(
      async () => {
        await this.user.updateVerificationToken(user.id, null);
      },
      20 * 60 * 1000,
    );

    // Return success message
    this.logger.log(`Resent verification token for user with email: ${email}`);
    return { message: 'Verification email sent' };
  }

  /**
   * Verifies email
   * @param data email and verification token
   * @returns success message if verification is successful
   * @throws BadRequestException if verification token is invalid
   */
  public async verifyEmail(data: { email: string; token: string }) {
    const { email, token } = data;

    this.logger.log(`Verifying email for user with email: ${email}`);

    // Check and get user
    const user = await this.findUser(email, 'email');

    // Verify token and throw an exception if invalid
    if (user.verificationToken !== token) {
      this.logger.log(`Invalid verification token for user with email: ${email}`);
      throw new BadRequestException('Invalid verification token');
    }

    // Verify user in database
    await this.user.verify(user.id);

    // Return success message
    this.logger.log(`Verified email for user with email: ${email}`);
    return { message: 'Email verified successfully' };
  }

  /**
   * Update access and refresh token
   * @param data access token and refresh token
   * @returns new access token and refresh token
   */
  public async updateTokens(data: { userId: string; accessToken: string; refreshToken: string }) {
    const { userId, accessToken, refreshToken } = data;

    this.logger.log(`Updating access and refresh token`);

    // Check and get user
    const user = await this.findUser(userId, 'id');

    // Blacklist access and refresh tokens
    await this.tokenBlacklist.blacklistToken(accessToken);
    await this.tokenBlacklist.blacklistToken(refreshToken);

    // Create and sign new access and refresh token
    const newAccessToken = await this.createJwtToken(user, '1h', 'access');
    const newRefreshToken = await this.createJwtToken(user, '7d', 'refresh');

    // Return access and refresh token
    this.logger.log(`Updated access and refresh token`);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  /**
   * Gets waiting time for email verification
   * @returns Waiting time in milliseconds
   */
  public getWaitingTime() {
    this.logger.log(`Getting waiting time for email verification`);
    const waitingTime = 20 * 60 * 1000;
    this.logger.log(`Got waiting time for email verification`);
    return { waitingTime };
  }
}
