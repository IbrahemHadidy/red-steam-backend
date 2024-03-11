import { uploadAvatar } from '../configs/storageConfigs';

// Multer middleware
export const uploadAvatarMiddleware = uploadAvatar.single('avatar');
