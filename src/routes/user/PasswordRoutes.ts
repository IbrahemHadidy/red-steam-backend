import express from 'express';
import { sanitize } from '../../middlewares/validators';
import PasswordController from '../../controllers/user/PasswordController';
const { changePassword, forgotPassword } = PasswordController;

const router = express.Router();

router.post('/change-password', sanitize, changePassword);
router.post('/forgot-password', sanitize, forgotPassword);

export default router;
