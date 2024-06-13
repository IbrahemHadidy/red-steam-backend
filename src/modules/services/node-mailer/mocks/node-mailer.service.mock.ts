export class NodeMailerServiceMock {
  private emailsSent: { to: string; subject: string; html: string }[] = [];

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    this.emailsSent.push({ to, subject, html });
  }

  getEmailsSent(): { to: string; subject: string; html: string }[] {
    return this.emailsSent;
  }

  clearEmailsSent(): void {
    this.emailsSent = [];
  }

  async sendVerificationEmail(to: string, username: string, verificationToken: string): Promise<void> {
    const html = `Mock verification email for user ${username} with token ${verificationToken}`;
    await this.sendEmail(to, 'Verify Your Email Address', html);
  }
  
  async sendPasswordResetEmail(to: string, username: string, resetToken: string): Promise<void> {
    const html = `Mock password reset email for user ${username} with token ${resetToken}`;
    await this.sendEmail(to, 'Red Steam Password Reset', html);
  }

  async sendPaymentConfirmationEmail(to: string, orderId: string): Promise<void> {
    const html = `Mock payment confirmation email for order ${orderId}`;
    await this.sendEmail(to, 'Payment Confirmation', html);
  }
}
