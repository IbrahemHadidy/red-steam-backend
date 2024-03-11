import express from 'express';
import { uploadAvatarMiddleware } from '../../middlewares/multer';
import FileUploadController from '../../controllers/user/FileUploadController';
const { uploadAvatar, deleteAvatar } = FileUploadController;

const router = express.Router();

router.post('/upload-avatar', uploadAvatarMiddleware, uploadAvatar);
router.post('/delete-avatar', deleteAvatar);

export default router;
