import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync } from 'crypto';
import { UsersService } from '@repositories/sql/users/users.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { User } from '@repositories/sql/users/user.entity';

@Injectable()
export class UserService {
  constructor(
    protected readonly user: UsersService,
    protected readonly logger?: Logger,
    protected readonly jwt?: JwtService,
    protected readonly mailer?: NodeMailerService,
  ) {}

  /**
   * Hashes a password using the Scrypt algorithm
   * @param password The password to hash
   * @returns The hashed password
   */
  protected async hashPassword(password: string): Promise<string> {
    this.logger.log('Hashing password');

    const salt = randomBytes(8).toString('hex');
    const hashBuffer = scryptSync(password, salt, 64);
    const hashedPassword = `${salt}:${hashBuffer.toString('hex')}`;

    this.logger.log('Password hashed successfully');
    return hashedPassword;
  }

  /**
   * Compares a plain text password with a hashed password
   * @param plainPassword The plain text password
   * @param hashedPassword The hashed password
   * @returns True if the passwords match, false otherwise
   * @throws UnauthorizedException if the passwords don't match
   */
  protected async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    this.logger.log('Comparing passwords');

    const [salt, storedHash] = hashedPassword.split(':');
    const hashBuffer = scryptSync(plainPassword, salt, 64);
    const hash = hashBuffer.toString('hex');

    if (storedHash !== hash) {
      this.logger.warn('Password comparison failed');
      throw new UnauthorizedException('Invalid password');
    }

    this.logger.log('Password comparison successful');
    return true;
  }

  /**
   * Finds a user by email, username, id or identifier
   * @param key The identifier of the user
   * @param {'username' | 'email' | 'id' | 'identifier'} type The type of the identifier;
   * @returns The created user data
   */
  protected async findUser(key: string, type: 'email' | 'username' | 'id' | 'identifier'): Promise<User> {
    this.logger.log(`findUser called with ${type}: ${key}`);

    let user: User;
    switch (type) {
      case 'email':
        user = await this.user.getByEmail(key);
        break;
      case 'username':
        user = await this.user.getByUsername(key);
        break;
      case 'id':
        user = await this.user.getById(key);
        break;
      case 'identifier':
        user = await this.user.getByEmailOrUsername(key);
        break;
    }
    if (!user) {
      this.logger.error(`Could not find a user with ${type}: ${key}`);
      throw new NotFoundException('User not found');
    }

    this.logger.log(`User found with ${type}: ${key}`);
    return user;
  }

  /**
   * Check if user is verified
   * @param user The user object
   * @throws {UnauthorizedException} If user is not verified
   */
  protected async checkVerified(user: User) {
    if (!user.isVerified) {
      this.logger.error(`User is not verified`);
      throw new UnauthorizedException('User is not verified');
    }
  }
}
