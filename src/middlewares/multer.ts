import fs from 'fs';
import path from 'path';
import { upload } from '../configs/storageConfigs';

// Multer middleware
export const uploadAvatarMiddleware = upload.single('avatar');

// Function to empty the directory after upload to drive
export const emptyDirectory = (directoryPath: string) => {
  // Read the contents of the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // Iterate over each file in the directory
    files.forEach((file) => {
      // Construct the full path of the file
      const filePath = path.join(directoryPath, file);

      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully:', filePath);
        }
      });
    });
  });
}