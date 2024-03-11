import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    // Make a POST request to Google reCAPTCHA verification endpoint
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    );

    // Check if the verification was successful
    if (response.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA token:', error);
    return false;
  }
}

export default verifyRecaptchaToken;