import transporter from '../configs/emailTransporterConfig';
import { getVerifyEmailOptions } from '../configs/mailOptionsConfig';

export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
  const mailOptions = getVerifyEmailOptions(email, verificationToken);

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};
