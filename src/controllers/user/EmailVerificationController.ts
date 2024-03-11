import { Request, Response } from 'express';
import User from '../../models/User';

class EmailVerificationController {
  async verifyEmail(req: Request, res: Response) {
    const { verificationToken } = req.params;

    try {
      // Find the user by verification token
      const user = await User.findOne({ verificationToken });

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found or token expired' });
      }

      // Update user's verification status
      user.isVerified = true;
      user.verificationToken = undefined; // Remove verification token
      await user.save();

      // Redirect to a success page or send a success message
      res.status(200).json({ message: 'Email verification successful' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default new EmailVerificationController;