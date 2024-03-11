export const isValidAvatar = (file: Express.Multer.File) => {
  // Define the allowed file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  // Check if the file type is included in the allowed types
  return allowedTypes.includes(file.mimetype);
};
