import { passwordResetEmailContent, emailVerificationContent } from './emailContentConfig';
import dotenv from 'dotenv';
dotenv.config();

export const verifyEmailOptions = {
  from: `Red Steam ${process.env.EMAIL_USER}`,
  subject: 'Verify Your Email Address',
};

export const getVerifyEmailOptions = (to: string, verificationToken: string) => {
  return {
    ...verifyEmailOptions,
    to,
    html: emailVerificationContent.replace('{verificationToken}', verificationToken).replace('{BASE_URL}', process.env.BASE_URL as string),
  };
};

export const resetPasswordMailOptions = {
  from: `Red Steam ${process.env.EMAIL_USER}`,
  subject: 'Red Steam Password Reset',
};

export const getPasswordResetMailOptions = (to: string, username: string, resetToken: string) => {
  return {
    ...resetPasswordMailOptions,
    to,
    html: passwordResetEmailContent
      .replace('{resetToken}', resetToken)
      .replace('{userName}', username)
      .replace('{FRONT_URL}', process.env.BASE_URL as string),
  };
};