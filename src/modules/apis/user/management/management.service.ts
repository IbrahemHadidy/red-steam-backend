// NestJS
import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Services
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { AvatarStorageService } from '@services/dropbox/avatar-storage.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';

import { UserService } from '@apis/user/user.service'; // Api service (The Extended Service)
import { UsersService } from '@repositories/sql/users/users.service'; // Repository service (The Injected Service)

// Types
import type { File } from '@nest-lab/fastify-multer';

@Injectable()
export class ManagementService {
  private readonly resetTokenSecret: string;

  constructor(
    private readonly jwt: JwtService,
    private readonly userTools: UserService,
    private readonly user: UsersService,
    private readonly mailer: NodeMailerService,
    private readonly logger: Logger,
    private readonly config: ConfigService,
    private readonly tokenBlacklist: TokenBlacklistService,
    private readonly avatarStorage: AvatarStorageService,
  ) {
    this.resetTokenSecret = this.config.get('JWT_RESET_TOKEN_SECRET');
  }

  /**
   * Check if email exists
   * @param email The email to check
   * @returns The result of the check
   */
  public async checkEmailExists(data: { email: string }): Promise<{ exists: boolean; message: string }> {
    const { email } = data;

    this.logger.log(`Checking if email exists: ${email}`);

    // Get user by email
    const user = await this.user.getByEmail(email);

    // If email exists, return true
    if (user) return { exists: true, message: 'Email already exists' };

    // Else return false
    return { exists: false, message: 'Email available' };
  }

  /**
   * Check if username exists
   * @param username The username to check
   * @returns The result of the check
   */
  public async checkUsernameExists(data: { username: string }): Promise<{ exists: boolean; message: string }> {
    const { username } = data;

    this.logger.log(`Checking if username exists: ${username}`);

    // Get user by username
    const user = await this.user.getByUsername(username);

    // If username exists, return true
    if (user) return { exists: true, message: 'Username already exists' };

    // Else return false
    return { exists: false, message: 'Username available' };
  }

  /**
   * Change username
   * @param data An object containing the userId, password, and newUsername
   * @returns The result of the change
   * @throws `ConflictException` If the new username already exists
   * @throws `BadRequestException` If the new username is the same as the current one
   */
  public async changeUsername(data: {
    userId: string;
    currentPassword: string;
    newUsername: string;
  }): Promise<{ message: string }> {
    const { userId, currentPassword, newUsername } = data;

    this.logger.log(`Changing username for user with id: ${userId} to: ${newUsername}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Compare password hashes
    await this.userTools.comparePassword(currentPassword, user.password);

    // Check if new username is the same as the old one
    if (newUsername === user.username) {
      this.logger.warn(`New username must be different from the current one for userId: ${userId}`);
      throw new BadRequestException('New username must be different');
    }

    // Check if new username is available
    const checkUsername = await this.checkUsernameExists({ username: newUsername });
    if (checkUsername.exists) {
      this.logger.warn(`Username already exists: ${newUsername}`);
      throw new ConflictException('Username already exists');
    }

    // Update username
    await this.user.updateUsername(userId, newUsername);

    // Return success
    this.logger.log(`Username changed successfully for userId: ${userId}`);
    return { message: 'Username changed successfully' };
  }

  /**
   * Change email
   * @param data An object containing the userId, password, currentEmail, and newEmail
   * @returns The result of the change
   * @throws `UnauthorizedException` If the current email is incorrect
   * @throws `BadRequestException` If the new email is the same as the current one
   * @throws `ConflictException` If the new email already exists
   */
  public async changeEmail(data: {
    userId: string;
    currentPassword: string;
    currentEmail: string;
    newEmail: string;
  }): Promise<{ message: string }> {
    const { userId, currentPassword, currentEmail, newEmail } = data;

    this.logger.log(`Changing email for user with id: ${userId} to: ${newEmail}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Compare password hashes
    await this.userTools.comparePassword(currentPassword, user.password);

    // Check if current email is the same as the old one
    if (currentEmail !== user.email) {
      this.logger.warn(`Current email is incorrect for userId: ${userId}`);
      throw new UnauthorizedException('Current email is incorrect');
    }

    // Check if new email is the same as the old one
    if (newEmail === user.email) {
      this.logger.warn(`New email must be different from the current one for userId: ${userId}`);
      throw new BadRequestException('New email must be different');
    }

    // Check if new email is available
    const checkEmail = await this.checkEmailExists({ email: newEmail });
    if (checkEmail.exists) {
      this.logger.warn(`Email already exists: ${newEmail}`);
      throw new ConflictException('Email already exists');
    }

    // Update email
    await this.user.updateEmail(userId, newEmail, true);

    // Return success message
    this.logger.log(`Email changed successfully for userId: ${userId}`);
    return { message: 'Email changed successfully, please verify your email' };
  }

  /**
   * Change country
   * @param data An object containing the userId and newCountry
   * @returns The result of the change
   * @throws `BadRequestException` If the new country is the same as the current one
   */
  public async changeCountry(data: { userId: string; newCountry: string }): Promise<{ message: string }> {
    const { userId, newCountry } = data;

    this.logger.log(`Changing country for user with id: ${userId} to: ${newCountry}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Check if new country is the same as the old one
    if (newCountry === user.country) {
      this.logger.warn(`New country must be different from the current one for userId: ${userId}`);
      throw new BadRequestException('New country must be different');
    }

    // Update country
    await this.user.updateCountry(userId, newCountry);

    // Return success message
    this.logger.log(`Country changed successfully for userId: ${userId}`);
    return { message: 'Country changed successfully' };
  }

  /**
   * Upload avatar
   * @param avatar The avatar to upload
   * @param userId The user id to upload the avatar
   * @returns The result of the upload
   */
  public async uploadAvatar(data: { avatar: File; userId: string }): Promise<{ message: string }> {
    const { avatar, userId } = data;

    this.logger.log(`Uploading avatar for user with id: ${userId}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Delete old avatar
    if (user.profilePicture) {
      const oldAvatar = user.profilePicture.split('/avatar-')[1].split('?')[0];
      await this.avatarStorage.deleteAvatar(`/avatars/avatar-${oldAvatar}`);
      this.user.removeAvatar(userId);
    }

    // Upload avatar
    const uploadResponse = await this.avatarStorage.uploadAvatar(avatar);

    // Update the user's profile picture in the database
    await this.user.updateAvatar(userId, uploadResponse.sharedLink);

    // Return success message
    this.logger.log(`Avatar uploaded successfully for userId: ${userId}`);
    return { message: 'Avatar uploaded successfully' };
  }

  /**
   * Delete avatar
   * @param userId The user id to delete the avatar
   * @returns The result of the delete
   */
  public async deleteAvatar(data: { userId: string }): Promise<{ message: string }> {
    const { userId } = data;

    this.logger.log(`Deleting avatar for user with id: ${userId}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Delete old avatar
    const oldAvatar = user.profilePicture.split('/avatar-')[1].split('?')[0];
    if (user.profilePicture) await this.avatarStorage.deleteAvatar(`/avatars/avatar-${oldAvatar}`);

    // Update the user's profile picture in the database to null
    await this.user.removeAvatar(userId);

    // Return success message
    this.logger.log(`Avatar deleted successfully for userId: ${userId}`);
    return { message: 'Avatar deleted successfully' };
  }

  /**
   * Change password
   * @param data An object containing the userId, oldPassword, and newPassword
   * @returns The result of the change
   * @throws `BadRequestException` If the new password is the same as the old one
   */
  public async changePassword(data: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    const { userId, currentPassword, newPassword } = data;

    this.logger.log(`Changing password for user with id: ${userId}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Compare password hashes
    await this.userTools.comparePassword(currentPassword, user.password);

    // Check if new password is the same as the old one
    if (newPassword === currentPassword) {
      this.logger.warn(`New password must be different from the current one for userId: ${userId}`);
      throw new BadRequestException('New password must be different');
    }

    // Hash password
    const hashedPassword = await this.userTools.hashPassword(newPassword);

    // Update password
    await this.user.updatePassword(userId, hashedPassword);

    // Return success message
    this.logger.log(`Password changed successfully for userId: ${userId}`);
    return { message: 'Password changed successfully' };
  }

  /**
   * Forgot password
   * @param data An object containing the email
   * @returns The result of the change
   */
  public async forgotPassword(data: { email: string }): Promise<{ message: string }> {
    const { email } = data;

    this.logger.log(`Sending password reset email for email: ${email}`);

    // Check if email exists
    const user = await this.userTools.findUser(email, 'email');

    // Generate a password reset token
    const resetToken = await this.generateResetToken(email);

    // Send password reset email
    await this.mailer.sendPasswordResetEmail(email, user.username, resetToken);

    // Set user's verification token
    await this.user.updateVerificationToken(user.id, resetToken);

    // Return success message
    this.logger.log(`Password reset email sent for email: ${email}`);
    return { message: 'Reset email sent successfully' };
  }

  /**
   * Submit password reset
   * @param data An object containing the token and newPassword
   * @returns The result of the change
   * @throws `UnauthorizedException` If the token is blacklisted
   */
  public async passwordReset(data: { token: string; newPassword: string }): Promise<{ message: string }> {
    const { token, newPassword } = data;

    this.logger.log(`Submitting password reset for token: ${token}`);

    // Verify token
    const userEmail = await this.verifyResetToken(token);

    // Check and get user
    const user = await this.userTools.findUser(userEmail, 'email');

    // Check if token is blacklisted
    const isBlacklisted = await this.tokenBlacklist.isBlacklisted(token);
    if (isBlacklisted) {
      this.logger.warn(`Token ${token} is blacklisted`);
      throw new UnauthorizedException('Token is blacklisted');
    }

    // Hash password
    const hashedPassword = await this.userTools.hashPassword(newPassword);

    // Update password
    await this.user.updatePassword(user.id, hashedPassword);

    // Blacklist token if not in test mode
    if (process.env.NODE_ENV !== 'test') {
      await this.tokenBlacklist.blacklistToken(token);
    }

    // Return success message
    this.logger.log(`Password reset successful for userId: ${user.id}`);
    return { message: 'Password reset successful' };
  }

  /**
   * Delete account
   * @param data An object containing the userId and password
   * @returns The result of the delete
   */
  public async deleteAccount(data: { userId: string; currentPassword: string }): Promise<{ message: string }> {
    const { userId, currentPassword } = data;

    this.logger.log(`Deleting account for user with id: ${userId}`);

    // Check and get user
    const user = await this.userTools.findUser(userId, 'id');

    // Compare password hashes
    await this.userTools.comparePassword(currentPassword, user.password);

    // Delete user
    await this.user.remove(userId);

    // Return success message
    this.logger.log(`Account deleted successfully for userId: ${userId}`);
    return { message: 'Account deleted successfully' };
  }

  /**
   * Generates a reset token
   * @param id The user id to generate the token for
   * @returns The generated token
   */
  private async generateResetToken(email: string): Promise<string> {
    this.logger.log(`Generating reset token for email: ${email}`);

    // if in test mode, return 'test-reset-token' (used for e2e testing)
    if (process.env.NODE_ENV === 'test') {
      return 'test-reset-token';
    }

    const payload = { email };

    // Generate reset token
    const resetToken = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.resetTokenSecret,
    });
    return resetToken;
  }

  /**
   * Verifies a reset token
   * @param token The token to verify
   * @returns The user id if the token is valid
   * @throws `UnauthorizedException` If the token is invalid
   */
  private async verifyResetToken(token: string): Promise<string> {
    this.logger.log(`Verifying reset token: ${token}`);

    // if in test mode, return 'testuser3@me.com' (used for e2e testing)
    if (process.env.NODE_ENV === 'test') {
      if (token === 'test-reset-token') {
        return 'testuser3@me.com';
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }

    try {
      const decoded = await this.jwt.verifyAsync(token, {
        secret: this.resetTokenSecret,
      });

      return decoded.email;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
