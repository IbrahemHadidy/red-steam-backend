import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import secret from '../configs/jwt';
import transporter from '../configs/emailTransporterConfig';
import { getPasswordResetMailOptions } from '../configs/mailOptionsConfig';

export const generateResetToken = () => {
  // Generate a random string token with JWT
  const resetToken = jwt.sign({ data: 'reset' }, secret, { expiresIn: '1h' });

  return resetToken;
};

export const sendPasswordResetEmail = async (email: string, username: string, resetToken: string) => {
  const mailOptions = getPasswordResetMailOptions(email, username, resetToken);

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const generateVerificationToken = (): string => {
  const token = jwt.sign({ data: uuidv4() }, secret, { expiresIn: '20m' });
  return token;
};