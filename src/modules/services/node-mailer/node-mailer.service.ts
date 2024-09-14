// NestJS
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Sercices
import { MailerService } from '@nestjs-modules/mailer';

// Templates
import { emailVerification } from '@services/node-mailer/templates/email-verification';
import { passwordReset } from '@services/node-mailer/templates/password-reset';
import { gameCard, paymentConfirmation } from '@services/node-mailer/templates/payment-confirmation';

// Types
import type { Game } from '@repositories/sql/games/game.entity';

@Injectable()
export class NodeMailerService {
  private readonly email: string;
  private readonly baseUrl: string;
  private readonly frontUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly mailer: MailerService,
    private readonly logger: Logger,
  ) {
    this.email = `Red Steam ${this.config.get('EMAIL_USER')}`;
    this.baseUrl = this.config.get('BASE_URL');
    this.frontUrl = this.config.get('FRONT_URL');
  }

  /**
   * Sends an email
   * @param to The email address of the recipient
   * @param subject The subject of the email
   * @param html The HTML content of the email
   * @returns void
   * @throws `InternalServerErrorException` If there is an error sending the email
   */
  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await this.mailer.sendMail({
      from: this.email,
      to,
      subject,
      html: html.replace(/{BASE_URL}/g, this.baseUrl).replace(/{FRONT_URL}/g, this.frontUrl),
    });
  }

  /**
   * Sends a verification email
   * @param to The email address of the recipient
   * @param verificationToken The verification token
   */
  public async sendVerificationEmail(to: string, username: string, verificationToken: string): Promise<void> {
    // Log the initiation of the email verification process
    this.logger.log(`Sending verification email to ${to}`);

    // Send verification email
    await this.sendEmail(
      to,
      'Verify Your Email Address',
      emailVerification.replace(/{verificationToken}/g, verificationToken).replace(/{userName}/g, username),
    );

    // Log that a verification email has been sent to the specified address
    this.logger.log(`Verification email sent to ${to}`);
  }

  /**
   * Sends a password reset email
   * @param to The email address of the recipient
   * @param username The username of the user
   * @param resetToken The reset token
   */
  public async sendPasswordResetEmail(to: string, username: string, resetToken: string): Promise<void> {
    // Log the initiation of the password reset process
    this.logger.log(`Sending password reset email to ${to}`);

    // Send password reset email
    await this.sendEmail(
      to,
      'Red Steam Password Reset',
      passwordReset.replace(/{resetToken}/g, resetToken).replace(/{userName}/g, username),
    );

    // Log that a password reset email has been sent to the specified address
    this.logger.log(`Password reset email sent to ${to}`);
  }

  /**
   * Sends a payment confirmation email
   * @param to The email address of the recipient
   * @param orderId The order id
   * @param data The data of the payment (order id, account name, games)
   */
  public async sendPaymentConfirmationEmail(
    to: string,
    data: { orderId: string; accountName: string; games: Game[] },
  ): Promise<void> {
    // Log the initiation of the payment confirmation email
    this.logger.log(`Sending payment confirmation email to ${to}`);

    // Replace the placeholders in the payment confirmation email template
    const gameCards = data.games.map((game) => {
      return gameCard
        .replace(/{gameName}/g, game.name)
        .replace(
          /{gamePrice}/g,
          game.pricing.discount ? game.pricing.discountPrice.toFixed(2) : game.pricing.basePrice.toFixed(2),
        )
        .replace(/{gameImage}/g, game.thumbnailEntries.tabImage);
    });
    const currentDate = new Date().toISOString();
    const totalPrice = data.games
      .reduce((total: number, game: Game) => {
        return total + Number(game.pricing.discount ? game.pricing.discountPrice : game.pricing.basePrice);
      }, 0)
      .toFixed(2);

    paymentConfirmation
      .replace(/{accountName}/g, data.accountName)
      .replace(/{orderId}/g, data.orderId)
      .replace(/{currentDate}/g, currentDate)
      .replace(/{totalPrice}/g, totalPrice)
      .replace(/{gameCards}/g, gameCards.join(''));

    // Send payment confirmation email
    await this.sendEmail(to, 'Payment Confirmation', paymentConfirmation);

    // Log that a payment confirmation email has been sent to the specified address
    this.logger.log(`Payment confirmation email sent to ${to}`);
  }
}
