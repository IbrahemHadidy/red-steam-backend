import { Request, Response } from 'express';
import User from '../../models/User';

class PhoneController {
  async sendOTP(req: Request, res: Response) {
    const { phoneNumber } = req.body;

    try {
      // Placeholder logic for sending OTP
      // Replace this with your actual OTP sending mechanism

      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async resendOTP(req: Request, res: Response) {
    const { phoneNumber } = req.body;

    try {
      // Placeholder logic for resending OTP
      // Replace this with your actual OTP resending mechanism

      const user = await User.findOne({ phoneNumber });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error resending OTP:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async verifyOTP(req: Request, res: Response) {
    // const { phoneNumber, otp } = req.body; // uncoment when using otp
    const { phoneNumber } = req.body; // delete when using otp

    try {
      // Validate phoneNumber and otp here

      // Placeholder logic for finding the user by phoneNumber
      const user = await User.findOne({ phoneNumber });

      // Handle case where user is not found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Placeholder logic for verifying OTP
      // Replace this with your actual OTP verification mechanism

      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async changePhoneNumber(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      // Placeholder logic for changing phone number
      // Replace this with your actual phone number change mechanism

      const user = await User.findById( userId );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.phoneNumber = req.body.phoneNumber;
      await user.save();

      res.status(200).json({ message: 'Phone number changed successfully' });
    } catch (error) {
      console.error('Error changing phone number:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async removePhoneNumber(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      // Placeholder logic for removing phone number
      // Replace this with your actual phone number removal mechanism

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.phoneNumber = undefined;
      user.isPhoneVerified = undefined;
      await user.save();

      res.status(200).json({ message: 'Phone number removed successfully' });
    } catch (error) {
      console.error('Error removing phone number:', error);
    }
  }

  async verifyPhoneNumber(req: Request, res: Response) {
    const { phoneNumber } = req.body;

    try {
      // Placeholder logic for verifying phone number
      // Replace this with your actual phone number verification mechanism

      const user = await User.findOne({ phoneNumber });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Phone number verified successfully' });
    } catch (error) {
      console.error('Error verifying phone number:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async sendVerificationCode(req: Request, res: Response) {
    const { phoneNumber } = req.body;

    try {
      // Placeholder logic for sending verification code
      // Replace this with your actual verification code sending mechanism

      const user = await User.findOne({ phoneNumber });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async verifyVerificationCode(req: Request, res: Response) {
    const { phoneNumber, verificationCode } = req.body;

    try {
      // Placeholder logic for verifying verification code
      // Replace this with your actual verification code verification mechanism

      const user = await User.findOne({ phoneNumber });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.phoneVerificationCode !== verificationCode) {
        return res.status(401).json({ message: 'Invalid verification code' });
      }

      // Update user phoneVerificationCode and phoneVerified fields
      user.phoneVerificationCode = undefined;
      user.isPhoneVerified = true;
      await user.save();

      res.status(200).json({ message: 'Verification code verified successfully' });
    } catch (error) {
      console.error('Error verifying verification code:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new PhoneController();