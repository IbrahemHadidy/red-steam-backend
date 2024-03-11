import fs from 'fs';
import { Request, Response } from 'express';
import User from '../../models/User';
import { isValidAvatar } from '../../utils/fileUtils';
import dotenv from 'dotenv';
import { drive } from '../../configs/storageConfigs';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

class fileUploadController {
  async uploadAvatar(req: Request, res: Response) {
    try {
      const avatar = req.file;
      const { userId } = req.body;

      // Check if file and identifier are provided
      if (!avatar) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      if (!userId) {
        return res.status(400).json({ message: 'No user ID provided' });
      }

      // Validate file type and size
      if (!isValidAvatar(avatar)) {
        return res.status(400).json({ message: 'Invalid file type' });
      }

      // Retrieve the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the old avatar file if it exists
      if (user.profilePicture) {
        await drive.files.delete({ fileId: user.profilePicture });
      }

      // Upload the file to Google Drive
      const uploadResponse = await drive.files.create({
        requestBody: {
          name: 'avatar-' + Date.now() + uuidv4(),
          mimeType: avatar.mimetype,
          parents: [`${process.env.DRIVE_FOLDER_ID}`],
        },
        media: {
          mimeType: avatar.mimetype,
          // Read file stream from Multer temporary file
          body: fs.createReadStream(avatar.path),
        },
        fields: 'id',
      });

      // Add permission to the uploaded file
      const fileId = uploadResponse.data.id as string;
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      // Delete the temporary file uploaded by Multer
      fs.unlinkSync(avatar.path);

      // Update the user's profile picture in the database
      if (uploadResponse.data.id) {
        user.profilePicture = uploadResponse.data.id as string;
      } else {
        return res.status(500).json({ message: 'id is not defined' });
      }
      await user.save();

      res.status(200).json({ message: 'Avatar uploaded successfully', avatar: uploadResponse.data.id });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      res.status(500).json({ message: 'Error uploading avatar' });
    }
  }

  async deleteAvatar(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      // Retrieve the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the old avatar file if it exists
      if (user.profilePicture) {
        await drive.files.delete({ fileId: user.profilePicture });
      }

      // Update the user's profile picture in the database
      user.profilePicture = undefined;
      await user.save();

      res.status(200).json({ message: 'Avatar deleted successfully' });
    } catch (error) {
      console.error('Error deleting avatar:', error);
      res.status(500).json({ message: 'Error deleting avatar' });
    }
  }
};

export default new fileUploadController;
