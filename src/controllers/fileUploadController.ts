import fs from 'fs';
import { Request, Response } from 'express';
import User from '../models/User';
import { isValidFileType } from '../utils/fileUtils';
import dotenv from 'dotenv';
import { drive } from '../configs/storageConfigs';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const fileUploadController = {
  async uploadAvatar(req: Request, res: Response) {
    try {
      const file = req.file;
      const { identifier } = req.body;

      // Check if file and identifier are provided
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      if (!identifier) {
        return res.status(400).json({ message: 'Identifier is required' });
      }

      // Validate file type and size
      if (!isValidFileType(file)) {
        return res.status(400).json({ message: 'Invalid file type' });
      }

      // Retrieve the user
      const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
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
          mimeType: file.mimetype,
          parents: [`${process.env.DRIVE_FOLDER_ID}`],
        },
        media: {
          mimeType: file.mimetype,
          // Read file stream from Multer temporary file
          body: fs.createReadStream(file.path),
        },
        fields: 'id',
      });

      // Delete the temporary file uploaded by Multer
      fs.unlinkSync(file.path);

      // Update the user's profile picture in the database
      user.profilePicture = uploadResponse.data.id as string;
      await user.save();

      res.json({ message: 'Avatar uploaded successfully', avatar: uploadResponse.data.id });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      res.status(500).json({ message: 'Error uploading avatar' });
    }
  },
};

export default fileUploadController;
