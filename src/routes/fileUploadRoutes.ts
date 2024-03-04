import express from 'express';
import { uploadAvatarMiddleware } from '../middlewares/multer';
import fileUploadController from '../controllers/fileUploadController';
const { uploadAvatar } = fileUploadController;

const router = express.Router();

router.post('/upload-avatar', uploadAvatarMiddleware, uploadAvatar);

export default router;
