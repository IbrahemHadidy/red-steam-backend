import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/User';
import { generateResetToken, sendPasswordResetEmail } from '../../utils/tokenUtils';

class passwordController {
  async changePassword(req: Request, res: Response) {
    // Extract user input from request body
    const { userId, oldPassword, newPassword } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare old password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      // If old password doesn't match, return 401 Unauthorized
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid old password' });
      }

      // Check if old password is the same as the new password
      const isNewPasswordSameAsOld = await bcrypt.compare(newPassword, user.password);
      if (isNewPasswordSameAsOld) {
          return res.status(400).json({ message: 'New password must be different from old password' });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password with the new hashed password
      user.password = hashedNewPassword;
      await user.save();

      // Return success response
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // If user is not found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a password reset token (you can use a library like jsonwebtoken for this)
      const resetToken = generateResetToken();

      // Save the reset token to the user document and set an expiration time (e.g., 1 hour)
      await user.save(); // Save updated user document with token

      // Send a password reset email to the user with the reset token
      await sendPasswordResetEmail(user.email, user.username, resetToken);

      // Return success response
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default new passwordController;
